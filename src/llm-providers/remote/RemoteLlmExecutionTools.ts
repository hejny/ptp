import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { PipelineExecutionError } from '../../errors/PipelineExecutionError';
import type { AvailableModel } from '../../execution/AvailableModel';
import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import type {
    ChatPromptResult,
    CompletionPromptResult,
    EmbeddingPromptResult,
    PromptResult,
} from '../../execution/PromptResult';
import type { ChatPrompt, CompletionPrompt, EmbeddingPrompt, Prompt } from '../../types/Prompt';
import type { string_markdown, string_markdown_text, string_title } from '../../types/typeAliases';
import type { PromptbookServer_Error } from './interfaces/PromptbookServer_Error';
import type { PromptbookServer_ListModels_Request } from './interfaces/PromptbookServer_ListModels_Request';
import type { PromptbookServer_ListModels_Response } from './interfaces/PromptbookServer_ListModels_Response';
import type { PromptbookServer_Prompt_Request } from './interfaces/PromptbookServer_Prompt_Request';
import type { PromptbookServer_Prompt_Response } from './interfaces/PromptbookServer_Prompt_Response';
import type { RemoteLlmExecutionToolsOptions } from './interfaces/RemoteLlmExecutionToolsOptions';

/**
 * Remote server is a proxy server that uses its execution tools internally and exposes the executor interface externally.
 *
 * You can simply use `RemoteExecutionTools` on client-side javascript and connect to your remote server.
 * This is useful to make all logic on browser side but not expose your API keys or no need to use customer's GPU.
 *
 * @see https://github.com/webgptorg/promptbook#remote-server
 * @public exported from `@promptbook/remote-client`
 */
export class RemoteLlmExecutionTools implements LlmExecutionTools {
    public constructor(private readonly options: RemoteLlmExecutionToolsOptions) {}

    public get title(): string_title & string_markdown_text {
        // TODO: [🧠] Maybe fetch title+description from the remote server (as well as if model methods are defined)
        return 'Remote server';
    }

    public get description(): string_markdown {
        return 'Use all models by your remote server';
    }

    /**
     * Check the configuration of all execution tools
     */
    public async checkConfiguration(): Promise<void> {
        const socket = await this.makeConnection();
        socket.disconnect();

        // TODO: !!! Check version of the remote server and compatibility
        // TODO: [🎍] Send checkConfiguration
    }

    /**
     * List all available models that can be used
     */
    public async listModels(): Promise<Array<AvailableModel>> {
        // TODO: [👒] Listing models (and checking configuration) probbably should go through REST API not Socket.io
        const socket = await this.makeConnection();

        if (this.options.isAnonymous) {
            socket.emit('listModels-request', {
                isAnonymous: true,
                llmToolsConfiguration: this.options.llmToolsConfiguration,
            } satisfies PromptbookServer_ListModels_Request);
        } else {
            socket.emit('listModels-request', {
                isAnonymous: false,
                clientId: this.options.clientId,
            } satisfies PromptbookServer_ListModels_Request);
        }

        const promptResult = await new Promise<Array<AvailableModel>>((resolve, reject) => {
            socket.on('listModels-response', (response: PromptbookServer_ListModels_Response) => {
                resolve(response.models);
                socket.disconnect();
            });
            socket.on('error', (error: PromptbookServer_Error) => {
                reject(new Error(error.errorMessage));
                socket.disconnect();
            });
        });

        socket.disconnect();

        return promptResult;
    }

    /**
     * Creates a connection to the remote proxy server.
     */
    private makeConnection(): Promise<Socket> {
        return new Promise(
            //            <- TODO: [🧱] Implement in a functional (not new Class) way
            (resolve, reject) => {
                const socket = io(this.options.remoteUrl, {
                    path: this.options.path,
                    // path: `${this.remoteUrl.pathname}/socket.io`,
                    transports: [/*'websocket', <- TODO: [🌬] Make websocket transport work */ 'polling'],
                });

                // console.log('Connecting to', this.options.remoteUrl.href, { socket });

                socket.on('connect', () => {
                    resolve(socket);
                });

                // TODO: !!!! Better timeout handling

                setTimeout(() => {
                    reject(new Error(`Timeout while connecting to ${this.options.remoteUrl}`));
                }, 1000 /* <- TODO: Timeout to config */);
            },
        );
    }

    /**
     * Calls remote proxy server to use a chat model
     */
    public callChatModel(prompt: ChatPrompt): Promise<ChatPromptResult> {
        if (this.options.isVerbose) {
            console.info(`🖋 Remote callChatModel call`);
        }
        return /* not await */ this.callCommonModel(prompt) as Promise<ChatPromptResult>;
    }

    /**
     * Calls remote proxy server to use a completion model
     */
    public callCompletionModel(prompt: CompletionPrompt): Promise<CompletionPromptResult> {
        if (this.options.isVerbose) {
            console.info(`💬 Remote callCompletionModel call`);
        }
        return /* not await */ this.callCommonModel(prompt) as Promise<CompletionPromptResult>;
    }

    /**
     * Calls remote proxy server to use a embedding model
     */
    public callEmbeddingModel(prompt: EmbeddingPrompt): Promise<EmbeddingPromptResult> {
        if (this.options.isVerbose) {
            console.info(`💬 Remote callEmbeddingModel call`);
        }
        return /* not await */ this.callCommonModel(prompt) as Promise<EmbeddingPromptResult>;
    }

    // <- Note: [🤖] callXxxModel

    /**
     * Calls remote proxy server to use both completion or chat model
     */
    private async callCommonModel(prompt: Prompt): Promise<PromptResult> {
        const socket = await this.makeConnection();

        if (this.options.isAnonymous) {
            socket.emit('prompt-request', {
                isAnonymous: true,
                llmToolsConfiguration: this.options.llmToolsConfiguration,
                prompt,
                // <- TODO: [🛫] `prompt` is NOT fully [🚉] serializable as JSON, it contains functions which are not serializable
            } satisfies PromptbookServer_Prompt_Request);
        } else {
            socket.emit('prompt-request', {
                isAnonymous: false,
                clientId: this.options.clientId,
                prompt,
                // <- TODO: [🛫] `prompt` is NOT fully [🚉] serializable as JSON, it contains functions which are not serializable
            } satisfies PromptbookServer_Prompt_Request);
        }

        const promptResult = await new Promise<PromptResult>((resolve, reject) => {
            socket.on('prompt-response', (response: PromptbookServer_Prompt_Response) => {
                resolve(response.promptResult);
                socket.disconnect();
            });
            socket.on('error', (error: PromptbookServer_Error) => {
                reject(new PipelineExecutionError(error.errorMessage));
                socket.disconnect();
            });
        });

        socket.disconnect();

        return promptResult;
    }
}

/**
 * TODO: [🧠][🛍] Maybe not `isAnonymous: boolean` BUT `mode: 'ANONYMOUS'|'COLLECTION'`
 * TODO: [🍓] Allow to list compatible models with each variant
 * TODO: [🗯] RemoteLlmExecutionTools should extend Destroyable and implement IDestroyable
 * TODO: [🧠][🌰] Allow to pass `title` for tracking purposes
 * TODO: [🧠] Maybe remove `@promptbook/remote-client` and just use `@promptbook/core`
 */
