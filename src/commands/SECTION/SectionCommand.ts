import type { SectionType } from './SectionType';

/**
 * Parsed SECTION command
 *
 * @see ./sectionCommandParser.ts for more details
 * @private within the commands folder
 */
export type SectionCommand = {
    readonly type: 'SECTION';
    readonly taskType: SectionType;
};
