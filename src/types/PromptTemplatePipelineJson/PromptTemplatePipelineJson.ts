import { string_ptp_url, string_version } from '../.././types/typeAliases';
import { PromptTemplateJson } from './PromptTemplateJson';
import { PromptTemplateParameterJson } from './PromptTemplateParameterJson';

/**
 * Prompt template pipeline is the **core concept of this library**.
 * It represents a series of prompt templates chained together to form a pipeline / one big prompt template with input and result parameters.
 *
 * It can have 3 formats:
 * -   **.ptp.md file** in custom markdown format described above
 * -   _(this)_ **JSON** format, parsed from the .ptp.md file
 * -   **Object** which is created from JSON format and bound with tools around (but not the execution logic)
 *
 * @see https://github.com/webgptorg/ptp#prompt-template-pipeline
 */
export interface PromptTemplatePipelineJson {
    /**
     * Unique identifier of the prompt template pipeline
     *
     * Note: It must be unique across all prompt template pipelines
     * Note: It must use HTTPs URL
     * Tip: You can do versioning in the URL
     *      For example: https://ptp.webgpt.com/cs/write-wallpaper-content.ptp.md@1.0.0
     * Warning: Do not hash part of the URL, hash part is used for identification of the prompt template in the pipeline
     */
    readonly ptpUrl?: string_ptp_url;

    /**
     * Title of the prompt template pipeline
     * -It can use simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
     */
    readonly title: string;

    /**
     * Version of the .ptp.json file
     */
    readonly ptpVersion: string_version;

    /**
     * Description of the prompt template pipeline
     * It can use multiple paragraphs of simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
     */
    readonly description?: string;

    /**
     * Set of variables that are used across the pipeline
     */
    readonly parameters: Array<PromptTemplateParameterJson>;

    /**
     * Sequence of prompt templates that are chained together to form a pipeline
     */
    readonly promptTemplates: Array<PromptTemplateJson>;
}

/**
 * TODO: [🧠] Best format of this code?
 *             There must be possible to make
 *             - Branching
 *             - Loops
 *             - Paralelization
 *             - ...and more
 */
