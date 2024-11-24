import colors from 'colors';
import type { Command as Program /* <- Note: Using Program because Command is misleading name */ } from 'commander';
import { readFile, writeFile } from 'fs/promises';
import prompts from 'prompts';
import spaceTrim from 'spacetrim';
import { pipelineStringToJson } from '../../conversion/pipelineStringToJson';
import { validatePipeline } from '../../conversion/validation/validatePipeline';
import { ParseError } from '../../errors/ParseError';
import { $provideExecutablesForNode } from '../../executables/$provideExecutablesForNode';
import { createPipelineExecutor } from '../../execution/createPipelineExecutor/00-createPipelineExecutor';
import { executionReportJsonToString } from '../../execution/execution-report/executionReportJsonToString';
import type { ExecutionTools } from '../../execution/ExecutionTools';
import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import { usageToHuman } from '../../execution/utils/usageToHuman';
import { $provideLlmToolsForCli } from '../../llm-providers/_common/register/$provideLlmToolsForCli';
import type { PipelineJson } from '../../pipeline/PipelineJson/PipelineJson';
import type { PipelineString } from '../../pipeline/PipelineString';
import { $provideFilesystemForNode } from '../../scrapers/_common/register/$provideFilesystemForNode';
import { $provideScrapersForNode } from '../../scrapers/_common/register/$provideScrapersForNode';
import type { string_filename } from '../../types/typeAliases';
import type { string_parameter_name } from '../../types/typeAliases';
import type { string_parameter_value } from '../../types/typeAliases';
import { countLines } from '../../utils/expectation-counters/countLines';
import { countWords } from '../../utils/expectation-counters/countWords';
import { isFileExisting } from '../../utils/files/isFileExisting';
import type { TODO_any } from '../../utils/organization/TODO_any';

/**
 * Initializes `run` command for Promptbook CLI utilities
 *
 * @private internal function of `promptbookCli`
 */
export function initializeRunCommand(program: Program) {
    const runCommand = program.command('run', { isDefault: true });
    runCommand.description(
        spaceTrim(`
            Runs a pipeline
      `),
    );

    // TODO: [🧅] DRY command arguments

    runCommand.argument(
        '<path>',
        // <- Note: [🧟‍♂️] This is NOT promptbook collection directory BUT direct path to .book.md file
        'Path to book file',
    );
    runCommand.option('-r, --reload', `Call LLM models even if same prompt with result is in the cache`, false);
    runCommand.option('-v, --verbose', `Is output verbose`, false);
    runCommand.option(
        '--no-interactive',
        `Input is not interactive, if true you need to pass all the input parameters through --json`,
    );
    runCommand.option(
        '-j, --json <json>',
        `Pass all or some input parameters as JSON record, if used the output is also returned as JSON`,
    );
    runCommand.option('-s, --save-report <path>', `Save report to file`);

    runCommand.action(async (filePathRaw, options) => {
        const { reload: isCacheReloaded, interactive: isInteractive, json, verbose: isVerbose, saveReport } = options;

        if (saveReport && !saveReport.endsWith('.json') && !saveReport.endsWith('.md')) {
            console.error(colors.red(`Report file must be .json or .md`));
            return process.exit(1);
        }

        let inputParameters: Record<string_parameter_name, string_parameter_value> = {};

        if (json) {
            inputParameters = JSON.parse(json);
            //                <- TODO: Maybe check shape of passed JSON and if its valid parameters Record
        }

        // TODO: DRY [◽]
        const prepareAndScrapeOptions = {
            isVerbose,
            isCacheReloaded,
        }; /* <- TODO: ` satisfies PrepareAndScrapeOptions` */

        if (isVerbose) {
            console.info(colors.gray('--- Preparing tools ---'));
        }

        const fs = $provideFilesystemForNode(prepareAndScrapeOptions);

        let filePath: string_filename | null = null;
        let filePathCandidates = [filePathRaw, `${filePathRaw}.md`, `${filePathRaw}.book.md`, `${filePathRaw}.book.md`];
        filePathCandidates = [...filePathCandidates, ...filePathCandidates.map((path) => path.split('\\').join('/'))];
        //                       <- Note: This line is to work with Windows paths
        //                                File "C:Usersmeworkaihello-worldbookshello.book.md" does not exist
        //                                @see https://collboard.fra1.cdn.digitaloceanspaces.com/usercontent/education/image/png/1/2/ad/image.png

        for (const filePathCandidate of filePathCandidates) {
            if (
                await isFileExisting(filePathCandidate, fs)
                // <- TODO: Also test that among the candidates the file is book not just any file
            ) {
                filePath = filePathCandidate;
                break;
            }
        }

        if (filePath === null) {
            console.error(colors.red(`File "${filePathRaw}" does not exist`));
            return process.exit(1);
        }

        let llm: LlmExecutionTools;

        try {
            llm = $provideLlmToolsForCli(prepareAndScrapeOptions);
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }
            if (!error.message.includes('No LLM tools')) {
                throw error;
            }

            console.error(
                colors.red(
                    spaceTrim(`
                        You need to configure LLM tools first

                        1) Create .env file
                        2) Add OPENAI_API_KEY=...
                        3) *(and/or)* Add ANTHROPIC_CLAUDE_API_KEY=...
                    `),
                    // <- TODO: List configuration keys dynamically
                ),
            );
            return process.exit(1);
        }

        const executables = await $provideExecutablesForNode(prepareAndScrapeOptions);
        const tools = {
            llm,
            fs,
            scrapers: await $provideScrapersForNode({ fs, llm, executables }, prepareAndScrapeOptions),
            script: [
                /*new JavascriptExecutionTools(options)*/
            ],
        } satisfies ExecutionTools;

        if (isVerbose) {
            console.info(colors.gray('--- Reading file ---'));
        }

        const pipelineString = (await readFile(filePath, 'utf-8')) as PipelineString;

        if (isVerbose) {
            console.info(colors.gray('--- Preparing pipeline ---'));
        }

        let pipeline: PipelineJson;
        try {
            pipeline = await pipelineStringToJson(pipelineString, tools);
        } catch (error) {
            if (!(error instanceof ParseError)) {
                throw error;
            }

            console.error(
                colors.red(
                    spaceTrim(
                        (block) => `
                            ${block((error as ParseError).message)}

                            in ${filePath}
                        `,
                    ),
                ),
            );
            return process.exit(1);
        }

        if (isVerbose) {
            console.info(colors.gray('--- Validating pipeline ---'));
        }

        // TODO: Same try-catch for LogicError
        validatePipeline(pipeline);

        if (isVerbose) {
            console.info(colors.gray('--- Creating executor ---'));
        }

        const pipelineExecutor = createPipelineExecutor({
            pipeline,
            tools,
            isNotPreparedWarningSupressed: true,
            maxExecutionAttempts: 3, // <- TODO: Pass via CLI argument
            //                          <- TODO: Why "LLM execution failed undefinedx"
            maxParallelCount: 1, // <- TODO: Pass CLI argument
        });

        if (isVerbose) {
            console.info(colors.gray('--- Getting input parameters ---'));
        }

        const questions = pipeline.parameters
            .filter(({ isInput }) => isInput)
            .filter(({ name }) => typeof inputParameters[name] !== 'string')
            .map(({ name, exampleValues }) => {
                let message = name;
                let initial = '';

                if (exampleValues && exampleValues.length > 0) {
                    const exampleValuesFiltered = exampleValues.filter((exampleValue) => countLines(exampleValue) <= 1);

                    if (exampleValuesFiltered.length !== 0) {
                        message += ` (e.g. ${exampleValuesFiltered.join(', ')})`;
                    }

                    initial = exampleValues[0] || '';
                }

                return {
                    type: 'text',
                    name,
                    message,
                    initial,
                    // TODO: Maybe use> validate: value => value < 18 ? `Forbidden` : true
                };
            });

        if (isInteractive === false && questions.length !== 0) {
            console.error(
                colors.red(
                    spaceTrim(
                        (block) => `
                              When using --no-interactive you need to pass all the input parameters through --json

                              You are missing:
                              ${block(
                                  pipeline.parameters
                                      .filter(({ isInput }) => isInput)
                                      .filter(
                                          ({ name: parameterName }) =>
                                              !questions.some(
                                                  ({ name: questionName }) => questionName === parameterName,
                                              ),
                                      )
                                      .map(({ name, description }) => `- **${name}** ${description}`)
                                      .join('\n'),
                              )}

                              Example:
                              --json '${JSON.stringify(
                                  Object.fromEntries(
                                      pipeline.parameters
                                          .filter(({ isInput }) => isInput)
                                          .map(({ name, exampleValues }) => [
                                              name,
                                              inputParameters[name] || (exampleValues || [])[0] || '...',
                                          ]),
                                  ),
                              )
                                  .split("'")
                                  .join("\\'")}'
                        `,
                    ),
                ),
            );
            return process.exit(1);
        }

        const response = await prompts(questions as TODO_any);
        //                     <- TODO: [🧠] Change behavior according to the formfactor
        inputParameters = { ...inputParameters, ...response };

        // TODO: Maybe do some validation of the response (and --json argument which is passed)

        if (isVerbose) {
            console.info(colors.gray('--- Executing ---'));
        }

        const result = await pipelineExecutor(inputParameters, (taskProgress) => {
            if (isVerbose) {
                console.info(colors.gray('--- Progress ---'));
                console.info(
                    taskProgress,
                    // <- TODO: Pretty print taskProgress
                );
            }
        });

        // assertsExecutionSuccessful(result);

        const { isSuccessful, errors, warnings, outputParameters, executionReport } = result;

        if (isVerbose) {
            console.info(colors.gray('--- Detailed Result ---'));

            console.info(
                { isSuccessful, errors, warnings, outputParameters, executionReport },
                // <- TODO: Pretty print taskProgress
            );
        }

        if (saveReport && saveReport.endsWith('.json')) {
            await writeFile(saveReport, JSON.stringify(executionReport, null, 4) + '\n', 'utf-8');
        } else if (saveReport && saveReport.endsWith('.md')) {
            const executionReportString = executionReportJsonToString(executionReport);
            await writeFile(saveReport, executionReportString, 'utf-8');
        }

        if (saveReport && isVerbose) {
            console.info(colors.green(`Report saved to ${saveReport}`));
        }

        if (isVerbose) {
            console.info(colors.gray('--- Usage ---'));
            console.info(colors.cyan(usageToHuman(result.usage)));
        }

        if (json === undefined || isVerbose === true) {
            console.info(colors.gray('--- Result ---'));
        }

        // TODO: [🧠] Should be errors or warnings shown first

        for (const error of errors || []) {
            console.error(colors.red(colors.bold(error.name) + ': ' + error.message));
        }

        for (const warning of warnings || []) {
            console.error(colors.red(colors.bold(warning.name) + ': ' + warning.message));
        }

        if (json === undefined) {
            for (const key of Object.keys(outputParameters)) {
                const value = outputParameters[key] || colors.grey(colors.italic('(nothing)'));
                const separator = countLines(value) > 1 || countWords(value) > 100 ? ':\n' : ': ';
                console.info(colors.green(colors.bold(key) + separator + value));
            }
        } else {
            console.info(
                JSON.stringify(
                    outputParameters,
                    null,
                    4,
                    // <- TODO: Allow to set --pretty
                ),
            );
        }

        return process.exit(0);
    });
}

/**
 * TODO: !!!!! Catch and wrap all errors from CLI
 * TODO: [🧠] Pass `maxExecutionAttempts`, `csvSettings`
 * TODO: [🥃][main] !!! Allow `ptbk run` without configuring any llm tools
 * Note: [💞] Ignore a discrepancy between file name and entity name
 * Note: [🟡] Code in this file should never be published outside of `@promptbook/cli`
 * TODO: [🖇] What about symlinks? Maybe flag --follow-symlinks
 */
