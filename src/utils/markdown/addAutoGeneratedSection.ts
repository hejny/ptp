import { spaceTrim } from 'spacetrim';
import type { string_markdown } from '../../types/typeAliases';
import type { string_name } from '../../types/typeAliases';
import { removeContentComments } from './removeContentComments';

/**
 * Add or modify an auto-generated section in a markdown file
 *
 * @private within the package
 */

export function addAutoGeneratedSection(
    content: string_markdown,
    options: {
        readonly sectionName: string_name;
        readonly sectionContent: string_markdown;
    },
): string_markdown {
    const { sectionName, sectionContent } = options;

    const warningLine: string_markdown = `<!-- ⚠️ WARNING: This section was auto-generated -->`;
    const sectionRegex = new RegExp(`<!--${sectionName}-->([\\s\\S]*?)<!--/${sectionName}-->`, 'g');

    const sectionMatch = content.match(sectionRegex);

    if (sectionMatch) {
        return content.replace(
            sectionRegex,
            spaceTrim(
                (block) => `
                    <!--${sectionName}-->
                    ${block(warningLine)}
                    ${block(sectionContent)}
                    <!--/${sectionName}-->
                `,
            ),
        );
    }

    const placeForSection = removeContentComments(content).match(/^##.*$/im);

    if (!placeForSection) {
        throw new Error(`No place where to put the section <!--${sectionName}-->`);
    }

    const [heading] = placeForSection;

    return content.replace(
        heading,
        `<!--${sectionName}-->\n${warningLine}\n${sectionContent}\n<!--/${sectionName}-->\n\n${heading}`,
    );
}
