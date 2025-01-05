import { Promisable } from 'type-fest';
import { $isRunningInNode } from '../_packages/utils.index';
import { createCollectionFromDirectory } from '../collection/constructors/createCollectionFromDirectory';
import { EnvironmentMismatchError } from '../errors/EnvironmentMismatchError';
import { assertsExecutionSuccessful } from '../execution/assertsExecutionSuccessful';
import { createPipelineExecutor } from '../execution/createPipelineExecutor/00-createPipelineExecutor';
import type { PipelineExecutorResult } from '../execution/PipelineExecutorResult';
import { $provideExecutionToolsForNode } from '../execution/utils/$provideExecutionToolsForNode';
import type { TaskProgress } from '../types/TaskProgress';
import type { InputParameters, string_pipeline_url } from '../types/typeAliases';

/**
 * @@@
 *
 * @public exported from `@promptbook/wizzard`
 */
export const wizzard = {
    /**
     * @@@!!!!!!
     */
    async execute(
        book: string_pipeline_url,
        inputParameters: InputParameters,
        onProgress?: (taskProgress: TaskProgress) => Promisable<void>,
    ): Promise<PipelineExecutorResult> {
        if (!$isRunningInNode()) {
            throw new EnvironmentMismatchError('Wizzard works only in Node.js environment');
        }

        // ▶ Prepare tools
        const tools = await $provideExecutionToolsForNode();

        // ▶ Create whole pipeline collection
        const collection = await createCollectionFromDirectory('./books', tools);
        // <- TODO: !!!!!! Search recursively in the directory + allow to pass relative path or book string template or just string

        // ▶ Get single Pipeline
        const pipeline = await collection.getPipelineByUrl(book);

        // ▶ Create executor - the function that will execute the Pipeline
        const pipelineExecutor = createPipelineExecutor({ pipeline, tools });

        // 🚀▶ Execute the Pipeline
        const result = await pipelineExecutor(inputParameters, onProgress);

        // ▶ Fail if the execution was not successful
        assertsExecutionSuccessful(result);

        // ▶ Return the result
        return result;
    },
};

/**
 * TODO: !!!!!! Add to readmes - one markdown here imported in all packages
 * Note: [🟢] Code in this file should never be never released in packages that could be imported into browser environment
 */
