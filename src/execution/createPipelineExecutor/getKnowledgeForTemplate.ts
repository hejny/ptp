import type { ReadonlyDeep } from 'type-fest';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TemplateJson } from '../../types/PipelineJson/TemplateJson';
import type { string_markdown, string_parameter_value } from '../../types/typeAliases';
import { TODO_USE } from '../../utils/organization/TODO_USE';

/**
 * @@@
 *
 * @private @@@
 */
type GetKnowledgeForTemplateOptions = {
    preparedPipeline: ReadonlyDeep<PipelineJson>;
    template: ReadonlyDeep<TemplateJson>;
};

/**
 * @@@
 *
 * @private @@@
 */
export async function getKnowledgeForTemplate(
    options: GetKnowledgeForTemplateOptions,
): Promise<string_parameter_value & string_markdown> {
    const { preparedPipeline, template } = options;

    // TODO: [♨] Implement Better - use real index and keyword search from `template` and {samples}

    TODO_USE(template);
    return preparedPipeline.knowledgePieces.map(({ content }) => `- ${content}`).join('\n');
    //                                                      <- TODO: [🧠] Some smart aggregation of knowledge pieces, single-line vs multi-line vs mixed
}
