import chalk from 'chalk';
import OpenAI from 'openai';
import { Promisable } from 'type-fest';
import { Prompt } from '../../../../types/Prompt';
import { TaskProgress } from '../../../../types/TaskProgress';
import { NaturalExecutionTools } from '../../../NaturalExecutionTools';
import { PromptChatResult, PromptCompletionResult } from '../../../PromptResult';
import { OpenAiExecutionToolsOptions } from './OpenAiExecutionToolsOptions';

/**
 * Execution Tools for calling OpenAI API.
 */
export class OpenAiExecutionTools implements NaturalExecutionTools {
    /**
     * OpenAI API client.
     */
    private readonly openai: OpenAI;

    public constructor(private readonly options: OpenAiExecutionToolsOptions) {
        this.openai = new OpenAI({
            apiKey: this.options.openAiApiKey,
        });
    }

    /**
     * Calls OpenAI API to use a chat model.
     */
    public async gptChat(
        prompt: Prompt,
        onProgress: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<PromptChatResult> {
        if (this.options.isVerbose) {
            console.info('💬 OpenAI gptChat call');
        }

        const { content, modelRequirements } = prompt;

        // TODO: [☂] Use here more modelRequirements
        if (modelRequirements.modelVariant !== 'CHAT') {
            throw new Error('Use gptChat only for CHAT variant');
        }

        const model = modelRequirements.modelName;
        const modelSettings = {
            model,
            max_tokens: modelRequirements.maxTokens,
            //                                      <- TODO: Make some global max cap for maxTokens
        };
        const rawRequest: OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming = {
            ...modelSettings,
            messages: [
                {
                    role: 'user',
                    content,
                },
            ],
            stream: true,
            user: this.options.user,
        };
        const start: string_date_iso8601 = getCurrentIsoDate();
        let complete: string_date_iso8601;

        if (this.options.isVerbose) {
            console.error(chalk.bgGray('rawRequest'), JSON.stringify(rawRequest, null, 4));
        }
        const rawResponse = await this.openai.chat.completions.create(rawRequest);
        if (this.options.isVerbose) {
            console.error(chalk.bgGray('rawResponse'), JSON.stringify(rawResponse, null, 4));
        }

        if (!rawResponse.choices[0]) {
            throw new Error('No choises from OpenAI');
        }

        if (rawResponse.choices.length > 1) {
            // TODO: This should be maybe only warning
            throw new Error('More than one choise from OpenAI');
        }

        const resultContent = rawResponse.choices[0].message.content;
        // eslint-disable-next-line prefer-const
        complete = getCurrentIsoDate();
        const usage = computeOpenaiUsage(rawResponse);

        if (!resultContent) {
            throw new Error('No response message from OpenAI');
        }

        return {
            content: resultContent,
            model,
            timing: {
                start,
                complete,
            },
            usage,
            rawResponse,
            // <- [🤹‍♂️]
        };
    }

    /**
     * Calls OpenAI API to use a complete model.
     */
    public async gptComplete(
        prompt: Prompt,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<PromptCompletionResult> {
        if (this.options.isVerbose) {
            console.info('🖋 OpenAI gptComplete call');
        }

        const { content, modelRequirements } = prompt;

        if (onProgress) {
            onProgress({
                name: 'progress',
                title: 'OpenAI gptComplete call !!!!',
                isDone: false,
            });
        }

        // TODO: [☂] Use here more modelRequirements
        if (modelRequirements.modelVariant !== 'COMPLETION') {
            throw new Error('Use gptComplete only for COMPLETION variant');
        }

        const model = modelRequirements.modelName;
        const modelSettings = {
            model,
            max_tokens: modelRequirements.maxTokens || 2000, // <- Note: 2000 is for lagacy reasons
            //                                                  <- TODO: Make some global max cap for maxTokens
        };

        const rawRequest: OpenAI.Completions.CompletionCreateParamsNonStreaming = {
            ...modelSettings,
            prompt: content,
            user: this.options.user,
        };
        const start: string_date_iso8601 = getCurrentIsoDate();
        let complete: string_date_iso8601;

        if (this.options.isVerbose) {
            console.error(chalk.bgGray('rawRequest'), JSON.stringify(rawRequest, null, 4));
        }
        const rawResponse = await this.openai.completions.create(rawRequest);
        if (this.options.isVerbose) {
            console.error(chalk.bgGray('rawResponse'), JSON.stringify(rawResponse, null, 4));
        }

        if (!rawResponse.choices[0]) {
            throw new Error('No choises from OpenAI');
        }

        if (rawResponse.choices.length > 1) {
            // TODO: This should be maybe only warning
            throw new Error('More than one choise from OpenAI');
        }

        const resultContent = rawResponse.choices[0].text;
        // eslint-disable-next-line prefer-const
        complete = getCurrentIsoDate();
        const usage = computeOpenaiUsage(rawResponse);

        if (!resultContent) {
            throw new Error('No response message from OpenAI');
        }

        return {
            content: resultContent,
            model,
            timing: {
                start,
                complete,
            },
            usage,
            rawResponse,
            // <- [🤹‍♂️]
        };
    }
}

/**

 * TODO: Maybe Create some common util for gptChat and gptComplete
 * TODO: Maybe make custom OpenaiError
 */
