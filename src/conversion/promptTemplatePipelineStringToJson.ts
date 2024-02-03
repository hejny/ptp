import { capitalize, normalizeTo_camelCase, normalizeTo_PascalCase } from 'n12';
import spaceTrim from 'spacetrim';
import { Writable, WritableDeep } from 'type-fest';
import { DEFAULT_MODEL_REQUIREMENTS, PTBK_VERSION } from '../config';
import { ParameterCommand, PostprocessCommand } from '../types/Command';
import { ExecutionType } from '../types/ExecutionTypes';
import { ModelRequirements } from '../types/ModelRequirements';
import { ExpectationUnit, NaturalTemplateJson } from '../types/PromptTemplatePipelineJson/PromptTemplateJson';
import { PromptTemplateParameterJson } from '../types/PromptTemplatePipelineJson/PromptTemplateParameterJson';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { ScriptLanguage, SUPPORTED_SCRIPT_LANGUAGES } from '../types/ScriptLanguage';
import { countMarkdownStructureDeepness } from '../utils/markdown-json/countMarkdownStructureDeepness';
import { markdownToMarkdownStructure } from '../utils/markdown-json/markdownToMarkdownStructure';
import { extractAllListItemsFromMarkdown } from '../utils/markdown/extractAllListItemsFromMarkdown';
import { extractOneBlockFromMarkdown } from '../utils/markdown/extractOneBlockFromMarkdown';
import { removeContentComments } from '../utils/markdown/removeContentComments';
import { parseCommand } from './parseCommand';

/**
 * Parse prompt template pipeline from string format to JSON format
 *
 * Note: This function does not validate logic of the pipeline only the syntax
 */
export function promptTemplatePipelineStringToJson(
    promptTemplatePipelineString: PromptTemplatePipelineString,
): PromptTemplatePipelineJson {
    const ptbJson: WritableDeep<PromptTemplatePipelineJson> = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        title: undefined as any /* <- Note: Putting here placeholder to keep `title` on top at final JSON */,
        ptbkUrl: undefined /* <- Note: Putting here placeholder to keep `ptbkUrl` on top at final JSON */,
        ptbkVersion: PTBK_VERSION,
        description: undefined /* <- Note: Putting here placeholder to keep `description` on top at final JSON */,
        parameters: [],
        promptTemplates: [],
    };

    // =============================================================
    // Note: 1️⃣ Normalization of the PTP string
    promptTemplatePipelineString = removeContentComments(promptTemplatePipelineString);
    promptTemplatePipelineString = promptTemplatePipelineString.replaceAll(
        /`\{(?<paramName>[a-z0-9_]+)\}`/gi,
        '{$<paramName>}',
    ) as PromptTemplatePipelineString;
    promptTemplatePipelineString = promptTemplatePipelineString.replaceAll(
        /`->\s+\{(?<paramName>[a-z0-9_]+)\}`/gi,
        '-> {$<paramName>}',
    ) as PromptTemplatePipelineString;

    // =============================================================
    ///Note: 2️⃣ Function for adding parameters
    const addParam = (parameterCommand: Omit<ParameterCommand, 'type'>) => {
        const { parameterName, parameterDescription, isInputParameter } = parameterCommand;

        const existingParameter = ptbJson.parameters.find(
            (parameter: PromptTemplateParameterJson) => parameter.name === parameterName,
        );
        if (
            existingParameter &&
            existingParameter.description &&
            existingParameter.description !== parameterDescription &&
            parameterDescription
        ) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Parameter {${parameterName}} is defined multiple times with different description.

                        First definition:
                        ${block(existingParameter.description || '[undefined]')}

                        Second definition:
                        ${block(parameterDescription || '[undefined]')}
                    `,
                ),
            );
        }

        if (existingParameter) {
            if (parameterDescription) {
                existingParameter.description = parameterDescription;
            }
        } else {
            ptbJson.parameters.push({
                name: parameterName,
                description: parameterDescription || undefined,
                isInput: isInputParameter,
            });
        }
    };

    // =============================================================
    // Note: 3️⃣ Parse the dynamic part - the template pipeline
    const markdownStructure = markdownToMarkdownStructure(promptTemplatePipelineString);
    const markdownStructureDeepness = countMarkdownStructureDeepness(markdownStructure);

    if (markdownStructureDeepness !== 2) {
        throw new Error(
            spaceTrim(`
                Invalid markdown structure.
                The markdown must have exactly 2 levels of headings (one top-level section and one section for each template).
                Now it has ${markdownStructureDeepness} levels of headings.
            `),
        );
    }

    ptbJson.title = markdownStructure.title;

    // TODO: [1] DRY description
    let description: string | undefined = markdownStructure.content;

    // Note: Remove codeblocks
    description = description.split(/^```.*^```/gms).join('');
    //Note: Remove lists and return statement
    description = description.split(/^(?:(?:-)|(?:\d\))|(?:`?->))\s+.*$/gm).join('');
    description = spaceTrim(description);
    if (description === '') {
        description = undefined;
    }
    ptbJson.description = description;

    const defaultModelRequirements: Writable<ModelRequirements> = { ...DEFAULT_MODEL_REQUIREMENTS };
    const listItems = extractAllListItemsFromMarkdown(markdownStructure.content);
    for (const listItem of listItems) {
        const command = parseCommand(listItem);

        switch (command.type) {
            case 'PTBK_URL':
                ptbJson.ptbkUrl = command.ptbkUrl.href;
                break;

            case 'PTBK_VERSION':
                ptbJson.ptbkVersion = command.ptbkVersion;
                break;

            case 'MODEL':
                // @ts-expect-error [🤸‍♂️] No idea why this occurs after adding maxTokens into modelRequirements
                defaultModelRequirements[command.key] = command.value;
                break;

            case 'PARAMETER':
                addParam(command);
                break;

            default:
                throw new Error(
                    `Command ${command.type} is not allowed in the head of the prompt template pipeline ONLY at the prompt template block`,
                );
        }
    }

    for (const section of markdownStructure.sections) {
        // TODO: Parse prompt template description (the content out of the codeblock and lists)

        const templateModelRequirements: Writable<ModelRequirements> = { ...defaultModelRequirements };
        const postprocessingCommands: Array<PostprocessCommand> = [];
        const listItems = extractAllListItemsFromMarkdown(section.content);
        let executionType: ExecutionType = 'PROMPT_TEMPLATE';
        let expectAmount: NaturalTemplateJson['expectAmount'] = {};
        let expectFormat: NaturalTemplateJson['expectFormat'] | undefined = undefined;
        let isExecutionTypeChanged = false;

        for (const listItem of listItems) {
            const command = parseCommand(listItem);
            switch (command.type) {
                case 'EXECUTE':
                    if (isExecutionTypeChanged) {
                        throw new Error(
                            'Execution type is already defined in the prompt template. It can be defined only once.',
                        );
                    }
                    executionType = command.executionType;
                    isExecutionTypeChanged = true;
                    break;

                case 'MODEL':
                    // @ts-expect-error [🤸‍♂️] No idea why this occurs after adding maxTokens into modelRequirements
                    templateModelRequirements[command.key] = command.value;
                    break;

                case 'PARAMETER':
                    addParam(command);
                    break;

                case 'POSTPROCESS':
                    postprocessingCommands.push(command);
                    break;

                case 'EXPECT_AMOUNT':
                    // eslint-disable-next-line no-case-declarations
                    const unit = command.unit.toLowerCase() as Lowercase<ExpectationUnit>;

                    expectAmount[unit] = expectAmount[unit] || {};

                    if (command.sign === 'MINIMUM' || command.sign === 'EXACTLY') {
                        if (expectAmount[unit]!.min !== undefined) {
                            throw new Error(
                                `Already defined minumum ${
                                    expectAmount[unit]!.min
                                } ${command.unit.toLowerCase()}, now trying to redefine it to ${command.amount}`,
                            );
                        }
                        expectAmount[unit]!.min = command.amount;
                    } /* not else */
                    if (command.sign === 'MAXIMUM' || command.sign === 'EXACTLY') {
                        if (expectAmount[unit]!.max !== undefined) {
                            throw new Error(
                                `Already defined maximum ${
                                    expectAmount[unit]!.max
                                } ${command.unit.toLowerCase()}, now trying to redefine it to ${command.amount}`,
                            );
                        }
                        expectAmount[unit]!.max = command.amount;
                    }
                    break;

                case 'EXPECT_FORMAT':
                    if (expectFormat !== undefined && command.format !== expectFormat) {
                        throw new Error(
                            `Expect format is already defined to "${expectFormat}". Now you try to redefine it by "${command.format}".`,
                        );
                    }
                    expectFormat = command.format;

                    break;

                default:
                    throw new Error(
                        `Command ${command.type} is not allowed in the block of the prompt template ONLY at the head of the prompt template pipeline`,
                    );
            }
        }

        const { language, content } = extractOneBlockFromMarkdown(section.content);

        if (executionType === 'SCRIPT') {
            if (!language) {
                throw new Error('You must specify the language of the script in the prompt template');
            } else if (!SUPPORTED_SCRIPT_LANGUAGES.includes(language as ScriptLanguage)) {
                throw new Error(
                    spaceTrim(
                        (block) => `
                            Script language ${language} is not supported.

                            Supported languages are:
                            ${block(SUPPORTED_SCRIPT_LANGUAGES.join(', '))}

                        `,
                    ),
                );
            }
        }

        const lastLine = section.content.split('\n').pop()!;
        const match = /^->\s*\{(?<resultingParamName>[a-z0-9_]+)\}/im.exec(lastLine);
        if (!match || match.groups === undefined || match.groups.resultingParamName === undefined) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Invalid template - each section must end with "-> {...}"

                        Invalid section:
                        ${block(
                            // TODO: Show code of invalid sections each time + DRY
                            section.content
                                .split('\n')
                                .map((line) => `> ${line}`)
                                .join('\n'),
                        )}
                        `,
                ),
            );
        }
        const resultingParameterName = match.groups.resultingParamName;

        // TODO: [1] DRY description
        let description: string | undefined = section.content;

        // Note: Remove codeblocks
        description = description.split(/^```.*^```/gms).join('');
        //Note: Remove lists and return statement
        description = description.split(/^(?:(?:-)|(?:\d\))|(?:`?->))\s+.*$/gm).join('');
        description = spaceTrim(description);
        if (description === '') {
            description = undefined;
        }

        const getParameterName = (i: number) => {
            const parameterName =
                postprocessingCommands.length <= i
                    ? resultingParameterName
                    : normalizeTo_camelCase(
                          `${resultingParameterName} before ${postprocessingCommands[i]!.functionName}`,
                          // <- TODO: Make this work even if using multiple same postprocessing functions
                      );

            const isParameterDefined = ptbJson.parameters.some((parameter) => parameter.name === parameterName);

            if (!isParameterDefined) {
                const parameterDescription = `*(${capitalize(section.title)} postprocessing ${i + 1}/${
                    postprocessingCommands.length
                })* {${resultingParameterName}} before \`${postprocessingCommands[i]!.functionName}\``;

                addParam({
                    parameterName,
                    parameterDescription,
                    isInputParameter: false,
                    // TODO:> isPrivate: true,
                });
            }

            return parameterName;
        };

        if (Object.keys(expectAmount).length === 0) {
            expectAmount = undefined;
        }

        ptbJson.promptTemplates.push({
            name: normalizeTo_PascalCase(section.title),
            title: section.title,
            description,
            executionType,
            expectAmount,
            expectFormat,
            modelRequirements: templateModelRequirements,
            contentLanguage: executionType === 'SCRIPT' ? (language as ScriptLanguage) : undefined,
            content,
            resultingParameterName: getParameterName(0),
        });

        for (const [functionName, i] of postprocessingCommands.map(
            ({ functionName }, i) => [functionName, i] as const,
        )) {
            ptbJson.promptTemplates.push({
                name: normalizeTo_PascalCase(section.title + ' Postprocessing ' + i),
                title: `(${i + 1}/${postprocessingCommands.length}) ${section.title} postprocessing`,
                description: `Postprocessing of section ${section.title} finally with resulting parameter {${resultingParameterName}}`,
                executionType: 'SCRIPT',
                contentLanguage: 'javascript',
                content: `${functionName}(${getParameterName(i)})`,
                resultingParameterName: getParameterName(i + 1),
            });
        }
    }

    // =============================================================
    return ptbJson;
}

/**
 * TODO: Report here line/column of error
 * TODO: Use spaceTrim more effectively
 * TODO: [🧠] Parameter flags - isInput, isOutput, isInternal
 */
