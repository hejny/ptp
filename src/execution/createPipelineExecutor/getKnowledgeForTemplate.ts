import type { ReadonlyDeep } from 'type-fest';
import type { PipelineJson } from '../../pipeline/PipelineJson/PipelineJson';
import type { TaskJson } from '../../pipeline/PipelineJson/TaskJson';
import type { string_markdown, string_parameter_value } from '../../types/typeAliases';
import { TODO_USE } from '../../utils/organization/TODO_USE';

/**
 * @@@
 *
 * @private internal type of `getKnowledgeForTemplate`
 */
type GetKnowledgeForTemplateOptions = {
    /**
     * @@@
     */
    readonly preparedPipeline: ReadonlyDeep<PipelineJson>;

    /**
     * @@@
     */
    readonly template: ReadonlyDeep<TaskJson>;
};

/**
 * @@@
 *
 * @private internal utility of `createPipelineExecutor`
 */
export async function getKnowledgeForTemplate(
    options: GetKnowledgeForTemplateOptions,
): Promise<string_parameter_value & string_markdown> {
    const { preparedPipeline, template } = options;

    // TODO: [♨] Implement Better - use real index and keyword search from `template` and {examples}

    TODO_USE(template);
    return preparedPipeline.knowledgePieces.map(({ content }) => `- ${content}`).join('\n');
    //                                                      <- TODO: [🧠] Some smart aggregation of knowledge pieces, single-line vs multi-line vs mixed
}
