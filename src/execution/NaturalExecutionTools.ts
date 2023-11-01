import { Promisable } from 'type-fest';
import { Prompt } from '../types/Prompt';
import { TaskProgress } from '../types/TaskProgress';
import { PromptChatResult, PromptCompletionResult } from './PromptResult';

/**
 * Vontainer for all the tools needed to execute prompts to large language models like GPT-4
 * On its interface it exposes common methods for prompt execution.
 * Inside (in constructor) it calls OpenAI, Azure, GPU, proxy, cache, logging,...
 *
 * @see https://github.com/webgptorg/promptbook#natural-execution-tools
 */
export interface NaturalExecutionTools {
    /**
     * Use a chat model
     */
    gptChat(prompt: Prompt, onProgress?: (taskProgress: TaskProgress) => Promisable<void>): Promise<PromptChatResult>;

    /**
     * Use a completion model
     */
    gptComplete(
        prompt: Prompt,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<PromptCompletionResult>;
}

/**
 * TODO: [🧠] Should or should not there be a word "GPT" in both gptComplete and gptChat
 */
