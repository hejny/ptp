import type { PromptResult } from '../../execution/PromptResult';
import type { Prompt } from '../Prompt';
import type { string_markdown_text, string_pipeline_url, string_semantic_version } from '../typeAliases';

/**
 * ExecutionReport is result of executing one promptbook
 * It is kind of a variant of the promptbook usefull for debugging, logging and transparency for users.
 *
 * It can have 2 formats:
 * -   **.md file** created from the **JSON** format
 * -   _(this)_ **JSON** format
 *
 * Note: [🚉] This is fully serializable as JSON
 *
 * @see https://github.com/webgptorg/promptbook#execution-report
 */
export type ExecutionReportJson = {
    /*
    TODO: [💼]
    > readonly type: 'REPORT';

    + make type test for this
    */

    /**
     * Unique identifier of the pipeline from promptbook which was executed
     */
    readonly pipelineUrl?: string_pipeline_url;

    /**
     * Title of from promptbook which was executed
     */
    readonly title?: string;

    /**
     * Version from promptbook which was executed
     */
    readonly promptbookUsedVersion: string_semantic_version;

    /**
     * Version from promptbook which was requested by promptbook
     */
    readonly promptbookRequestedVersion?: string_semantic_version;

    /**
     * Description of the promptbook which was executed
     */
    readonly description?: string_markdown_text;

    /**
     * !!!!!!! Separate type
     * Sequence of prompt templates in order which were executed
     */
    readonly promptExecutions: Array<{
        /**
         * The prompt wich was executed
         *
         * Note: !!!!!! [🚉] This is fully serializable as JSON
         */
        readonly prompt: Omit<Prompt, 'pipelineUrl'>;

        /**
         * Result of the prompt execution (if not failed during LLM execution)
         */
        readonly result?: PromptResult;

        /**
         * The error which occured during LLM execution or during postprocessing or expectation checking
         *
         * Note: It makes sense to have both error and result defined, for example when the result not pass expectations
         */
        readonly error?: {
            readonly message: string; // <- !!!!!!!
        };
    }>;
};
