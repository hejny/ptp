import type { Promisable } from 'type-fest';
import { PipelineExecutionError } from '../errors/PipelineExecutionError';
import type { TaskProgress } from '../types/TaskProgress';
import type { ExecutionReportJson } from '../types/execution-report/ExecutionReportJson';
import type { Parameters } from '../types/typeAliases';
import type { PromptResultUsage } from './PromptResultUsage';

/**
 * Executor is a simple async function that takes INPUT  PARAMETERs and returns result parameters _(along with all intermediate parameters and INPUT  PARAMETERs = it extends input object)_.
 * Executor is made by combining execution tools and pipeline collection.
 *
 * It can be created with `createPipelineExecutor` function.
 *
 * @see https://github.com/webgptorg/promptbook#executor
 */
export type PipelineExecutor = {
    (inputParameters: Parameters, onProgress?: (taskProgress: TaskProgress) => Promisable<void>): Promise<{
        /**
         * Whether the execution was successful, details are aviable in `executionReport`
         */
        readonly isSuccessful: boolean;

        /**
         * Added usage of whole execution, detailed usage is aviable in `executionReport`
         */
        readonly usage: PromptResultUsage;

        /**
         * Errors that occured during the execution, details are aviable in `executionReport`
         */
        readonly errors: Array<PipelineExecutionError | Error>;

        /**
         * The report of the execution with all details
         */
        readonly executionReport: ExecutionReportJson;

        /**
         * Result parameters of the execution
         *
         * Note: If the execution was not successful, there are only some of the result parameters
         */
        readonly outputParameters: Parameters;
    }>;
};

/**
 * TODO: [🧠] Should this file be in /execution or /types folder?
 */
