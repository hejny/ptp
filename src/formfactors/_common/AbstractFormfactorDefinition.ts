import type { PipelineInterface } from '../../pipeline/pipeline-interface/PipelineInterface';
import type { string_markdown_text } from '../../types/typeAliases';
import type { string_name } from '../../types/typeAliases';
import type { string_promptbook_documentation_url } from '../../types/typeAliases';
import type { string_SCREAMING_CASE } from '../../utils/normalization/normalizeTo_SCREAMING_CASE';

/**
 * @@@
 */
export type AbstractFormfactorDefinition = {
    /**
     * @@@
     */
    readonly name: string_name & string_SCREAMING_CASE;

    /**
     * @@@
     */
    readonly aliasNames?: ReadonlyArray<string_name & string_SCREAMING_CASE>;

    /**
     * @@@
     */
    readonly deprecatedNames?: ReadonlyArray<string_name & string_SCREAMING_CASE>;

    /**
     * @@@
     */
    readonly description: string_markdown_text;

    /**
     * @@@
     */
    readonly documentationUrl: string_promptbook_documentation_url;

    /**
     * @@@
     */
    readonly pipelineInterface: PipelineInterface;

    // <- TODO: !!!!!! Add here CLI interactive behavior definition
};
