import type { ScriptLanguage } from '../ScriptLanguage';
import type { TemplateJsonCommon } from './TemplateJsonCommon';

/**
 * Template for script execution
 *
 * Note: [🚉] This is fully serializable as JSON
 * @see https://github.com/webgptorg/promptbook/discussions/77
 */
export type ScriptTemplateJson = TemplateJsonCommon & {
    readonly blockType: 'SCRIPT_TEMPLATE';

    /**
     * Language of the script
     * - This is required only for blockType SCRIPT
     *
     */
    readonly contentLanguage?: ScriptLanguage;
};

/**
 * TODO: [🍙] Make some standard order of json properties
 */
