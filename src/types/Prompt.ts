import { string_name, string_prompt, string_ptp_url_with_hashtemplate } from '.././types/typeAliases';
import { ModelRequirements } from './ModelRequirements';

/**
 * Prompt in a text along with model requirements, but without any execution or templating logic.
 *
 * @see https://github.com/webgptorg/ptp#prompt
 */
export interface Prompt {
    /**
     * The text of the prompt
     *
     * Note: This is not a template, this is exactly the text that will be sent to the model
     * @example "What is the capital of France?"
     */
    readonly content: string_prompt;

    /**
     * Requirements for the model
     */
    readonly modelRequirements: ModelRequirements;

    /**
     * Unique identifier of the prompt template pipeline with specific template name as hash
     *
     * @example https://ptp.webgpt.com/cs/write-wallpaper-content.ptp.md@v2.4.15#keywords
     */
    readonly ptpUrl: string_ptp_url_with_hashtemplate;

    /**
     * Parameters used in the prompt
     *
     * Note: This is redundant (same information is in ptpUrl+content) but useful for logging and debugging
     */
    readonly parameters: Record<string_name, string>;
}

/**
 * TODO: [✔] Check ModelRequirements in runtime
 */
