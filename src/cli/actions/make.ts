import colors from 'colors';
import type { Command } from 'commander';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import spaceTrim from 'spacetrim';
import { collectionToJson } from '../../collection/collectionToJson';
import { createCollectionFromDirectory } from '../../collection/constructors/createCollectionFromDirectory';
import { PIPELINE_COLLECTION_BASE_FILENAME } from '../../config';
import { validatePipeline } from '../../conversion/validation/validatePipeline';
import type { string_file_extension } from '../../types/typeAliases';

/**
 * Initializes `make` command for Promptbook CLI utilities
 *
 * @private part of `promptbookCli`
 */
export function initializeMake(program: Command) {
    const helloCommand = program.command('make');
    helloCommand.description(
        spaceTrim(`
            Makes a new pipeline collection in given folder
      `),
    );

    helloCommand.argument('<path>', 'Path to promptbook directory');
    helloCommand.option('--project-name', `Name of the project for whom collection is`, 'Project');
    helloCommand.option(
        '-f, --format <format>',
        spaceTrim(`
            Output format of builded collection "javascript", "typescript" or "json"

            Note: You can use multiple formats separated by comma
        `),
        'javascript' /* <- Note: [🏳‍🌈] */,
    );
    helloCommand.option('--no-validation', `Do not validate logic of pipelines in collection`, true);
    helloCommand.option(
        '--validation',
        `Types of validations separated by comma (options "logic","imports")`,
        'logic,imports',
    );

    helloCommand.option('--verbose', `Is verbose`, false);
    helloCommand.option(
        '-o, --out-file <path>',
        spaceTrim(`
            Where to save the builded collection

            Note: If you keep it "${PIPELINE_COLLECTION_BASE_FILENAME}" it will be saved in the root of the promptbook directory
                  If you set it to a path, it will be saved in that path
                  BUT you can use only one format and set correct extension
        `),
        PIPELINE_COLLECTION_BASE_FILENAME,
    );

    // TODO: !!! Auto-detect AI api keys + explicit api keys as argv

    helloCommand.action(async (path, { projectName, format, validation, verbose, outFile }) => {
        console.info('!!!', { projectName, path, format, validation, verbose, outFile });

        const formats = ((format as string | false) || '')
            .split(',')
            .map((_) => _.trim())
            .filter((_) => _ !== '');
        const validations = ((validation as string | false) || '')
            .split(',')
            .map((_) => _.trim())
            .filter((_) => _ !== '');

        if (outFile !== PIPELINE_COLLECTION_BASE_FILENAME && formats.length !== 1) {
            console.error(colors.red(`You can use only one format when saving to a file`));
            process.exit(1);
        }

        const collection = await createCollectionFromDirectory(path, {
            isVerbose: verbose,
            isRecursive: true,
        });

        for (const validation of validations) {
            for (const pipelineUrl of await collection.listPipelines()) {
                const pipeline = await collection.getPipelineByUrl(pipelineUrl);

                if (validation === 'logic') {
                    validatePipeline(pipeline);

                    if (verbose) {
                        console.info(colors.cyan(`Validated logic of ${pipeline.pipelineUrl}`));
                    }
                }

                // TODO: Imports validation
            }
        }

        const collectionJson = await collectionToJson(collection);
        const collectionJsonString = JSON.stringify(collectionJson);

        const saveFile = async (extension: string_file_extension, content: string) => {
            const filePath =
                outFile !== PIPELINE_COLLECTION_BASE_FILENAME
                    ? outFile
                    : join(path, `${PIPELINE_COLLECTION_BASE_FILENAME}.${extension}`);

            if (!outFile.endsWith(`.${extension}`)) {
                console.warn(colors.yellow(`Warning: Extension of output file should be "${extension}"`));
            }

            await mkdir(dirname(filePath), { recursive: true });
            await writeFile(filePath, content, 'utf-8');

            // Note: Log despite of verbose mode
            console.info(colors.green(`Maked ${filePath.split('\\').join('/')}`));
        };

        if (formats.includes('json')) {
            await saveFile('json', collectionJsonString + '\n');
        }

        if (formats.includes('javascript')) {
            await saveFile(
                'js',
                spaceTrim(
                    `
                        import { createCollectionFromJson } from '@promptbook/core';

                        /**
                         * Pipeline collection for ${projectName}
                         *
                         * @private internal cache for \`getPipelineCollection\`
                         */
                        let pipelineCollection = null;


                        /**
                         *  Get pipeline collection for ${projectName}
                         *
                         *  @returns {PipelineCollection} Library of promptbooks for ${projectName}
                         *  @generated by \`@promptbook/cli\`
                         */
                        export function getPipelineCollection(){
                            if(pipelineCollection===null){
                                pipelineCollection = createCollectionFromJson(${collectionJsonString.substring(
                                    1,
                                    collectionJsonString.length - 1,
                                )});
                            }

                            return pipelineCollection;
                        }
                    ` + '\n',
                ),
                // <- TODO: DRY Javascript and typescript
                // <- TODO: Prettify
                // <- TODO: Convert inlined \n to spaceTrim
            );
        }

        if (formats.includes('typescript')) {
            await saveFile(
                'ts',
                spaceTrim(
                    `
                        import { createCollectionFromJson } from '@promptbook/core';
                        import type { PipelineCollection } from '@promptbook/types';

                        /**
                         * Pipeline collection for ${projectName}
                         *
                         * @private internal cache for \`getPipelineCollection\`
                         */
                        let pipelineCollection: null | PipelineCollection = null;


                        /**
                         *  Get pipeline collection for ${projectName}
                         *
                         *  @returns {PipelineCollection} Library of promptbooks for ${projectName}
                         *  @generated by \`@promptbook/cli\`
                         */
                        export function getPipelineCollection(): PipelineCollection{
                            if(pipelineCollection===null){
                                pipelineCollection = createCollectionFromJson(${collectionJsonString.substring(
                                    1,
                                    collectionJsonString.length - 1,
                                )});
                            }

                            return pipelineCollection as PipelineCollection;
                        }
                    ` + '\n',
                ),
                // <- TODO: DRY Javascript and typescript
                // <- TODO: Prettify
                // <- TODO: Convert inlined \n to spaceTrim
            );
        }

        process.exit(0);
    });
}
