import colors from 'colors';
import { readFile, writeFile } from 'fs';
import glob from 'glob-promise';
import JSON5 from 'json5';
import { join } from 'path';
import { spaceTrim } from 'spacetrim';
import { promisify } from 'util';
import { PipelineExecutionError } from '../../../errors/PipelineExecutionError';
import type { AutomaticTranslator } from './automatic-translators/AutomaticTranslator';
import type { TranslatorOptions } from './automatic-translators/TranslatorOptions';

/**
 * @private still in development [🏳]
 */
export async function translateMessages({
    automaticTranslator,
    from,
    to,
}: { automaticTranslator: AutomaticTranslator } & TranslatorOptions) {
    for (const filePath of await glob(join(__dirname, '../../translations/', from || 'en', '/**/*.json5'))) {
        const fileData = JSON5.parse(await promisify(readFile)(filePath, 'utf-8'));

        for (const row of fileData) {
            if (row.language !== from) {
                throw new PipelineExecutionError(
                    spaceTrim(`
                          Language ${row.language} is not ${from}
                          Check the file:
                          ${filePath}
                    `),
                );
            }

            const source = spaceTrim(row.message);
            const translated = spaceTrim(await automaticTranslator.translate(row.message));
            console.info(colors.gray(`${source} ▶️   ${translated}`));
            row.message = translated;
            row.language = to;
            row.isAutomaticTranslation = true;
        }

        // TODO: [🏳] Use here `FileCacheStorage`
        await promisify(writeFile)(
            filePath.split(`/${from}/`).join(`/${to}/`),
            JSON5.stringify(fileData, null, 4) + '\n',
            'utf-8',
        );
    }
}
