#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'colors';
import { LangtailExecutionTools } from '../LangtailExecutionTools';

playground()
    .catch((error) => {
        console.error(chalk.bgRed(error.name || 'NamelessError'));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function playground() {
    console.info(`🧸  Langtail Playground`);

    // Do here stuff you want to test
    //========================================>

    const langtailExecutionTools = new LangtailExecutionTools({
        isVerbose: true,
        apiKey: process.env.LANGTAIL_API_KEY!,
    });

    /**/
    //TODO: [🦻] This should work
    const models = await langtailExecutionTools.listModels();
    console.info({ models });
    /**/

    /*/
    // TODO: [🦻] This should work
    const prompt = {
        content: `Hello, my name is Alice.`,
        modelRequirements: {
            modelVariant: 'COMPLETION',
        },
    } as const;
    const promptResult = await langtailExecutionTools.callCompletionModel(prompt);
    console.info({ promptResult });
    console.info(chalk.green(prompt.content + promptResult.content));
    /**/

    /*/
    // TODO: [🦻] This should work
    const prompt = {
        content: `Hello, my name is Alice.`,
        modelRequirements: {
            modelVariant: 'CHAT',
        },
    } as const;
    const promptResult = await langtailExecutionTools.callChatModel(prompt);
    console.info({ promptResult });
    console.info(chalk.bgBlue(' User: ') + chalk.blue(prompt.content));
    console.info(chalk.bgGreen(' Completion: ') + chalk.green(promptResult.content));
    /**/

    /*/
    // <- Note: [🤖] Test here new model variant if needed 
    /**/

    //========================================/
}
