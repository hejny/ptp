import colors from 'colors';
import type { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { validatePromptbook } from '../../conversion/validation/validatePromptbook';
import { createLibraryFromDirectory } from '../../library/constructors/createLibraryFromDirectory';
import { libraryToJson } from '../../library/libraryToJson';
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
            Makes a new promptbook library in given folder
      `),
    );

    helloCommand.argument('<path>', 'Path to promptbook directory');
    helloCommand.option('--project-name', `Name of the project for whom library is`, 'Project');
    helloCommand.option(
        '-f, --format <format>',
        spaceTrim(`
            Output format of builded library "javascript", "typescript" or "json"

            Note: You can use multiple formats separated by comma
        `),
        'javascript' /* <- Note: [🏳‍🌈] */,
    );
    helloCommand.option('--no-validation', `Do not validate logic of promptbooks in library`, true);
    helloCommand.option(
        '--validation',
        `Types of validations separated by comma (options "logic","imports")`,
        'logic,imports',
    );

    helloCommand.option('--verbose', `Is verbose`, false);

    // TODO: !!! Auto-detect AI api keys + explicit api keys as argv

    helloCommand.action(async (path, { projectName, format, validation, verbose }) => {
        console.info('!!!', { projectName, path, format, validation, verbose });

        const formats = ((format as string | false) || '')
            .split(',')
            .map((_) => _.trim())
            .filter((_) => _ !== '');
        const validations = ((validation as string | false) || '')
            .split(',')
            .map((_) => _.trim())
            .filter((_) => _ !== '');

        const library = await createLibraryFromDirectory(path, {
            isVerbose: verbose,
            isRecursive: true,
        });

        for (const validation of validations) {
            for (const promptbookUrl of await library.listPromptbooks()) {
                const promptbook = await library.getPromptbookByUrl(promptbookUrl);

                if (validation === 'logic') {
                    validatePromptbook(promptbook);

                    if (verbose) {
                        console.info(colors.cyan(`Validated logic of ${promptbook.promptbookUrl}`));
                    }
                }

                // TODO: Imports validation
            }
        }

        const libraryJson = await libraryToJson(library);
        const libraryJsonString = JSON.stringify(libraryJson);

        const saveFile = async (extension: string_file_extension, content: string) => {
            const filePath = join(path, `promptbook-library.${extension}`);
            await writeFile(filePath, content, 'utf-8');

            // Note: Log despite of verbose mode
            console.info(colors.green(`Maked ${filePath.split('\\').join('/')}`));
        };

        if (formats.includes('json')) {
            await saveFile('json', libraryJsonString + '\n');
        }

        if (formats.includes('javascript')) {
            await saveFile(
                'js',
                spaceTrim(
                    `
                        import { createLibraryFromJson } from '@promptbook/core';

                        /**
                         * Promptbook library for ${projectName}
                         *
                         * @private internal cache for \`getPromptbookLibrary\`
                         */
                        let promptbookLibrary = null;


                        /**
                         *  Get promptbook library for ${projectName}
                         *
                         *  @returns {PromptbookLibrary} Library of promptbooks for ${projectName}
                         *  @generated by \`@promptbook/cli\`
                         */
                        export function getPromptbookLibrary(){
                            if(promptbookLibrary===null){
                                promptbookLibrary = createLibraryFromJson(${libraryJsonString.substring(
                                    1,
                                    libraryJsonString.length - 1,
                                )});
                            }

                            return promptbookLibrary;
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
                        import { createLibraryFromJson } from '@promptbook/core';
                        import type { PromptbookLibrary } from '@promptbook/types';

                        /**
                         * Promptbook library for ${projectName}
                         *
                         * @private internal cache for \`getPromptbookLibrary\`
                         */
                        let promptbookLibrary: null | PromptbookLibrary = null;


                        /**
                         *  Get promptbook library for ${projectName}
                         *
                         *  @returns {PromptbookLibrary} Library of promptbooks for ${projectName}
                         *  @generated by \`@promptbook/cli\`
                         */
                        export function getPromptbookLibrary(): PromptbookLibrary{
                            if(promptbookLibrary===null){
                                promptbookLibrary = createLibraryFromJson(${libraryJsonString.substring(
                                    1,
                                    libraryJsonString.length - 1,
                                )});
                            }

                            return promptbookLibrary;
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
