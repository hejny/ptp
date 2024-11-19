import type { WritableDeep } from 'type-fest';
import { $deepFreeze } from '../../utils/serialization/$deepFreeze';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { PipelineInterface } from './PipelineInterface';

/**
 * @@@
 *
 * @public exported from `@promptbook/core`
 */
export function getPipelineInterface(
    pipeline: PipelineJson,
    // <- TODO: ...pipelines: Array<PipelineJson>
): PipelineInterface {
    const pipelineInterface: WritableDeep<PipelineInterface> = {
        inputParameterNames: [],
        outputParameterNames: [],
    };

    for (const parameter of pipeline.parameters) {
        const { name, isInput, isOutput } = parameter;

        if (isInput) {
            pipelineInterface.inputParameterNames.push(name);
        }

        if (isOutput) {
            pipelineInterface.outputParameterNames.push(name);
        }
    }

    for (const key of ['inputParameterNames', 'outputParameterNames'] as Array<keyof PipelineInterface>) {
        pipelineInterface[key].sort((a, b) => a.localeCompare(b));
    }

    return $deepFreeze(pipelineInterface);
}

/**
 * TODO: !!!!!! Write unit test
 */
