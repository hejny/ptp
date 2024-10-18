#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import colors from 'colors';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { stringifyPipelineJson } from '../../../conversion/utils/stringifyPipelineJson';
import { usageToHuman } from '../../../execution/utils/usageToHuman';
import { $provideLlmToolsForTestingAndScriptsAndPlayground } from '../../../llm-providers/_common/register/$provideLlmToolsForTestingAndScriptsAndPlayground';
import { $provideFilesystemForNode } from '../../_common/register/$provideFilesystemForNode';
import { makeKnowledgeSourceHandler } from '../../_common/utils/makeKnowledgeSourceHandler';
import { LegacyDocumentScraper } from '../LegacyDocumentScraper';

playground()
    .catch((error) => {
        console.error(colors.bgRed(error.name || 'NamelessError'));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function playground() {
    console.info(`🧸  Scrape knowledge from Markdown (playground)`);

    // Do here stuff you want to test
    //========================================>

    //const sample = '10-simple.doc';
    const sample = '10-simple.rtf';
    //               <- TODO: [👩🏿‍🤝‍👩🏼] Read here the samples directory and itterate through all of them

    const llmTools = $provideLlmToolsForTestingAndScriptsAndPlayground({ isCacheReloaded: true });
    const rootDirname = join(__dirname, '..', 'samples');

    const legacyDocumentScraper = new LegacyDocumentScraper(
        { llm: $provideLlmToolsForTestingAndScriptsAndPlayground() },
        {
            rootDirname,
            externalProgramsPaths: {
                // TODO: !!!!!! use `locate-app` library here
                pandocPath: 'C:/Users/me/AppData/Local/Pandoc/pandoc.exe',
                libreOfficePath: 'C:/Program Files/LibreOffice/program/swriter.exe',
            },
        },
    );

    const knowledge = await legacyDocumentScraper.scrape(
        await makeKnowledgeSourceHandler(
            { sourceContent: sample },
            { fs: $provideFilesystemForNode() },
            { rootDirname },
        ),
    );

    console.info(colors.cyan(usageToHuman(llmTools.getTotalUsage())));
    console.info(colors.bgGreen(' Knowledge: '));
    console.info(knowledge);

    await writeFile(
        join(
            __dirname,
            `../samples/${sample}.knowledge.json` /* <- TODO: [👩🏿‍🤝‍👩🏼] Read here the samples directory and itterate through all of them */,
        ),
        stringifyPipelineJson(knowledge),
        'utf-8',
    );
    /**/

    //========================================/
}

/**
 * Note: [⚫] Code in this file should never be published in any package
 */
