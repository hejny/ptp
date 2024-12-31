import { spaceTrim } from 'spacetrim';
import type { PipelineString } from '../../pipeline/PipelineString';
import { addAutoGeneratedSection } from '../../utils/markdown/addAutoGeneratedSection';
import { prettifyMarkdown } from '../../utils/markdown/prettifyMarkdown';
import { compilePipeline } from '../compilePipeline';
import type { PrettifyOptions } from './PrettifyOptions';
import { renderPromptbookMermaid } from './renderPipelineMermaidOptions';

/**
 * Prettyfies Promptbook string and adds Mermaid graph
 *
 * @public exported from `@promptbook/core`
 */
export async function prettifyPipelineString(
    pipelineString: PipelineString,
    options: PrettifyOptions,
): Promise<PipelineString> {
    const { isGraphAdded, isPrettifyed } = options;

    if (isGraphAdded) {
        const pipelineJson = await compilePipeline(pipelineString);

        const promptbookMermaid = renderPromptbookMermaid(pipelineJson, {
            linkTask(task) {
                return { href: `#${task.name}`, title: task.title };
            },
        });

        const promptbookMermaidBlock = spaceTrim(
            (block) => `
                \`\`\`mermaid
                ${block(promptbookMermaid)}
                \`\`\`
            `,
        );

        pipelineString = addAutoGeneratedSection(pipelineString, {
            sectionName: 'Graph',
            sectionContent: promptbookMermaidBlock,
        }) as PipelineString;
    }

    if (isPrettifyed) {
        pipelineString = prettifyMarkdown(pipelineString) as PipelineString;
    }

    return pipelineString;
}

/**
 * TODO: Maybe use some Mermaid package instead of string templating
 * TODO: [🕌] When more than 2 functionalities, split into separate functions
 */
