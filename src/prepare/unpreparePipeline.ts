import type { PipelineJson } from '../pipeline/PipelineJson/PipelineJson';
import { extractParameterNames } from '../utils/parameters/extractParameterNames';
import { $asDeeplyFrozenSerializableJson } from '../utils/serialization/$asDeeplyFrozenSerializableJson';

/**
 * Unprepare just strips the preparation data of the pipeline
 *
 * @public exported from `@promptbook/core`
 */
export function unpreparePipeline(pipeline: PipelineJson): PipelineJson {
    let { personas, knowledgeSources, tasks } = pipeline;

    personas = personas.map((persona) => ({ ...persona, modelRequirements: undefined, preparationIds: undefined }));
    knowledgeSources = knowledgeSources.map((knowledgeSource) => ({ ...knowledgeSource, preparationIds: undefined }));
    tasks = tasks.map((template) => {
        let { dependentParameterNames } = template;

        const parameterNames = extractParameterNames(template.preparedContent || '');

        dependentParameterNames = dependentParameterNames.filter(
            (dependentParameterName) => !parameterNames.has(dependentParameterName),
            // <- [🏷] This is the reverse process to remove {knowledge} from `dependentParameterNames`
        );

        const templateUnprepared = { ...template, dependentParameterNames };
        delete templateUnprepared.preparedContent;

        return templateUnprepared;
    });

    return $asDeeplyFrozenSerializableJson('Unprepared PipelineJson', {
        ...pipeline,
        tasks,
        knowledgeSources,
        knowledgePieces: [],
        personas,
        preparations: [],
    });
}

/**
 * TODO: [🧿] Maybe do same process with same granularity and subfinctions as `preparePipeline`
 * TODO: Write tests for `preparePipeline`
 * TODO: [🍙] Make some standard order of json properties
 */
