import type { Observable } from 'rxjs';
import { BehaviorSubject, concat, from } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { string_SCREAMING_CASE } from '../_packages/utils.index';
import type { task_id } from '../types/typeAliases';
import { TODO_USE } from '../utils/organization/TODO_USE';
import { $randomToken } from '../utils/random/$randomToken';
import type { PipelineExecutorResult } from './PipelineExecutorResult';

/**
 * Options for creating a new task
 */
type CreateTaskOptions<TTaskResult> = {
    /**
     * The type of task to create
     */
    readonly taskType: AbstractTask<TTaskResult>['taskType'];

    /**
     * Callback that processes the task and updates the ongoing result
     * @param ongoingResult The partial result of the task processing
     * @returns The final task result
     */
    taskProcessCallback(
        updateOngoingResult: (newOngoingResult: PartialDeep<TTaskResult>) => void,
    ): Promise<TTaskResult>;
};

/**
 * Helper to create a new task
 *
 * @private internal helper function
 */
export function createTask<TTaskResult>(options: CreateTaskOptions<TTaskResult>): AbstractTask<TTaskResult> {
    const { taskType, taskProcessCallback } = options;

    const taskId = `${taskType.toLowerCase()}-${$randomToken(256 /* <- TODO: !!! To global config */)}`;

    const resultSubject = new BehaviorSubject<PartialDeep<TTaskResult>>({} as PartialDeep<TTaskResult>);

    const finalResult = /* not await */ taskProcessCallback((newOngoingResult: PartialDeep<TTaskResult>) => {
        resultSubject.next(newOngoingResult);
    });

    return {
        taskType,
        taskId,
        asPromise(options) {
            const { isCrashedOnError = true } = options || {};

            TODO_USE(isCrashedOnError);

            return /* not await */ finalResult;
        },
        asObservable() {
            return concat(resultSubject.asObservable(), from(finalResult));
        },
    } as AbstractTask<TTaskResult>;
}

/**
 * Represents a task that executes a pipeline
 */
export type ExecutionTask = AbstractTask<PipelineExecutorResult> & {
    readonly taskType: 'EXECUTION';
    readonly taskId: `execution-${task_id}`;
};

/**
 * Represents a task that prepares a pipeline
 * @deprecated TODO: [🐚] Currently unused - use
 */
export type PreparationTask = AbstractTask<PipelineExecutorResult> & {
    readonly taskType: 'PREPARATION';
    readonly taskId: `preparation-${task_id}`;
};

/**
 * Base interface for all task types
 */
export type AbstractTask<TTaskResult> = {
    /**
     * Type of the task
     */
    readonly taskType: string_SCREAMING_CASE;

    /**
     * Unique identifier for the task
     */
    readonly taskId: task_id;

    /**
     * Gets a promise that resolves with the task result
     */
    asPromise(options?: { readonly isCrashedOnError?: boolean }): Promise<TTaskResult>;

    /**
     * Gets an observable stream of partial task results
     */
    asObservable(): Observable<PartialDeep<TTaskResult>>;

    // <- TODO: asMutableObject(): PartialDeep<TTaskResult>;
};

export type Task = ExecutionTask | PreparationTask;

/**
 * TODO: Maybe allow to terminate the task and add getter `isFinished` or `status`
 * TODO: [🐚] Split into more files and make `PrepareTask` & `RemoteTask` + split the function
 */
