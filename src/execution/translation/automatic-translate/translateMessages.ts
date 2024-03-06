import chalk from 'chalk';
import { readFile, writeFile } from 'fs';
import glob from 'glob-promise';
import JSON5 from 'json5';
import { join } from 'path';
import { spaceTrim } from 'spacetrim';
import { promisify } from 'util';
import { IAutomaticTranslator } from './automatic-translators/IAutomaticTranslator';
import { ITranslatorOptions } from './automatic-translators/ITranslatorOptions';

export async function translateMessages({
    automaticTranslator,
    from,
    to,
}: { automaticTranslator: IAutomaticTranslator } & ITranslatorOptions) {
    for (const filePath of await glob(join(__dirname, '../../translations/', from, '/**/*.json5'))) {
        const fileData = JSON5.parse(await promisify(readFile)(filePath, 'utf8'));

        for (const row of fileData) {
            if (row.language !== from) {
                throw new Error(
                    spaceTrim(`
                  Language ${row.language} is not ${from}
                  Check the file:
                  ${filePath}
            `),
                );
            }

            const source = spaceTrim(row.message);
            const translated = spaceTrim(await automaticTranslator.translate(row.message));
            console.info(chalk.gray(`${source} ▶️   ${translated}`));
            row.message = translated;
            row.language = to;
            row.isAutomaticTranslation = true;
        }

        // TODO: Probbably also make the folder
        await promisify(writeFile)(
            filePath.split(`/${from}/`).join(`/${to}/`),
            JSON5.stringify(fileData, null, 4) + '\n',
            'utf8',
        );
    }
}
