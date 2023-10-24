import {
    string_javascript,
    string_markdown,
    string_name,
    string_prompt,
    string_template,
} from '../.././types/typeAliases';
import { ExecutionType } from '../ExecutionTypes';
import { ModelRequirements } from '../ModelRequirements';
import { ScriptLanguage } from '../ScriptLanguage';

/**
 * Describes one prompt template in the prompt template pipeline
 */
export type PromptTemplateJson = NaturalTemplateJson | SimpleTemplateJson | ScriptTemplateJson | PromptDialogJson;

/**
 * Template for prompt to LLM
 */
interface NaturalTemplateJson extends PromptTemplateJsonCommon {
    readonly executionType: 'PROMPT_TEMPLATE';

    /**
     * Requirements for the model
     * - This is required only for executionType PROMPT_TEMPLATE
     */
    readonly modelRequirements?: ModelRequirements;
}

/**
 * Template for simple concatenation of strings
 */
interface SimpleTemplateJson extends PromptTemplateJsonCommon {
    readonly executionType: 'SIMPLE_TEMPLATE';
}

/**
 * Template for script execution
 */
interface ScriptTemplateJson extends PromptTemplateJsonCommon {
    readonly executionType: 'SCRIPT';

    /**
     * Language of the script
     * - This is required only for executionType SCRIPT
     *
     */
    readonly contentLanguage?: ScriptLanguage;
}

/**
 * Template for prompt to user
 */
interface PromptDialogJson extends PromptTemplateJsonCommon {
    readonly executionType: 'PROMPT_DIALOG';
}

/**
 * Common properties of all prompt templates
 */
interface PromptTemplateJsonCommon {
    /**
     * Name of the template
     * - It must be unique across the pipeline
     * - It should start uppercase and contain letters and numbers
     * - The ptpUrl together with hash and name are used to identify the prompt template in the pipeline
     */
    readonly name: string_name;

    /**
     * Title of the prompt template
     * It can use simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
     */
    readonly title: string;

    /**
     * Description of the prompt template
     * It can use multiple paragraphs of simple markdown formatting like **bold**, *italic*, [link](https://example.com), ... BUT not code blocks and structure
     */
    readonly description?: string;

    /**
     * Type of the execution
     * This determines if the prompt template is send to LLM, user or some scripting evaluation
     */
    readonly executionType: ExecutionType;

    /**
     * Content of the template with {placeholders} for parameters
     */
    readonly content: (string_prompt | string_javascript | string_markdown) & string_template;

    /**
     * Name of the parameter that is the result of the prompt template
     */
    readonly resultingParameterName: string;
}

/**
 * TODO: use one helper type> (string_prompt | string_javascript | string_markdown) & string_template
 */
