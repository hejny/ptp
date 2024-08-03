import type { KnowledgeSourcePreparedJson } from '../types/PipelineJson/KnowledgeSourceJson';
import type { PersonaPreparedJson } from '../types/PipelineJson/PersonaJson';
import type { PipelineJson } from '../types/PipelineJson/PipelineJson';

/**
 * Determine if the pipeline is fully prepared
 */
export function isPipelinePrepared(pipeline: PipelineJson): boolean {
    // Note: Ignoring `pipeline.preparations` @@@
    // Note: Ignoring `pipeline.knowledgePieces` @@@

    if (!pipeline.personas.every((persona) => (persona as PersonaPreparedJson).modelRequirements !== undefined)) {
        return false;
    }

    if (
        !pipeline.knowledgeSources.every(
            (knowledgeSource) => (knowledgeSource as KnowledgeSourcePreparedJson).preparationIds !== undefined,
        )
    ) {
        return false;
    }

    // TODO: !!!!! Is context in each template
    // TODO: !!!!! Are samples prepared
    // TODO: !!!!! Are templates prepared

    return true;
}

/**
 * TODO: [🔼] Export via core or utils
 * TODO: [🧊] Pipeline can be partially prepared, this should return true ONLY if fully prepared
 */
