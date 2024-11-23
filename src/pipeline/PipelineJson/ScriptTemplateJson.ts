import type { ScriptLanguage } from '../../types/ScriptLanguage';
import type { TaskJsonCommon } from './TaskJsonCommon';

/**
 * Template for script execution
 *
 * Note: [🚉] This is fully serializable as JSON
 * @see https://github.com/webgptorg/promptbook/discussions/77
 */
export type ScriptTaskJson = TaskJsonCommon & {
    readonly taskType: 'SCRIPT_TEMPLATE';

    /**
     * Language of the script
     * - This is required only for taskType SCRIPT
     *
     */
    readonly contentLanguage?: ScriptLanguage;
};

/**
 * TODO: [🍙] Make some standard order of json properties
 */
