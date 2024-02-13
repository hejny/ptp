import type { Promisable } from 'type-fest';
import type { string_name } from '.././types/typeAliases';
import type { TaskProgress } from '../types/TaskProgress';
import type { ExecutionReportJson } from '../types/execution-report/ExecutionReportJson';

/**
 * Executor is a simple async function that takes INPUT  PARAMETERs and returns result parameters _(along with all intermediate parameters and INPUT  PARAMETERs = it extends input object)_.
 * Executor is made by combining execution tools and prompt template pipeline library.
 *
 * It can be done in two ways:
 * -   From `PromptTemplatePipelineLibrary.getExecutor` method
 * -   `createPtpExecutor` utility function
 *
 * @see https://github.com/webgptorg/promptbook#executor
 */
export interface PtpExecutor {
    (
        inputParameters: Record<string_name, string | Array<string>>,
        onProgress: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<{
        /**
         * Whether the execution was successful
         *
         * TODO: !!!! [💕] Move to report
         */
        isSuccessful: boolean;

        /**
         * Errors that occured during the execution
         */
        errors: Array<Error>;

        /**
         * The report of the execution
         */
        executionReport: ExecutionReportJson;

        /**
         * Result parameters of the execution
         *
         * Note: If the execution was not successful, there are only some of the result parameters
         */
        outputParameters: Record<string_name, string | Array<string>>;
    }>;
}

/**
 * TODO: [🧠] Should this file be in /execution or /types folder?
 */
