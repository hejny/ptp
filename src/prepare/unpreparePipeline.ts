import type { PipelineJson } from '../types/PipelineJson/PipelineJson';
import { extractParameters } from '../utils/extractParameters';

/**
 * Unprepare just strips the preparation data of the pipeline
 */
export function unpreparePipeline(pipeline: PipelineJson): PipelineJson {
    let { personas, knowledgeSources, promptTemplates } = pipeline;

    personas = personas.map((persona) => ({ ...persona, modelRequirements: undefined, preparationIds: undefined }));
    knowledgeSources = knowledgeSources.map((knowledgeSource) => ({ ...knowledgeSource, preparationIds: undefined }));
    promptTemplates = promptTemplates.map((promptTemplate) => {
        let { dependentParameterNames } = promptTemplate;

        const parameterNames = extractParameters(promptTemplate.preparedContent || '');

        dependentParameterNames = dependentParameterNames.filter(
            (dependentParameterName) => !parameterNames.has(dependentParameterName),
            // <- [🏷] This is the reverse process to remove {knowledge} from `dependentParameterNames`
        );

        const promptTemplateUnprepared = { ...promptTemplate, dependentParameterNames };
        delete promptTemplateUnprepared.preparedContent;

        return promptTemplateUnprepared;
    });

    return {
        ...pipeline,
        promptTemplates,
        knowledgeSources,
        knowledgePieces: [],
        personas,
        preparations: [],
    };
}

/**
 * TODO: [🔼] !!! Export via `@promptbook/core`
 * TODO: [🧿] Maybe do same process with same granularity and subfinctions as `preparePipeline`
 * TODO: Write tests for `preparePipeline`
 * TODO: [🍙] Make some standart order of json properties
 */
