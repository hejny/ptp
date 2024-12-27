import { spaceTrim } from 'spacetrim';
import { really_any } from '../../_packages/types.index';
import { RESERVED_PARAMETER_NAMES } from '../../config';
import { UnexpectedError } from '../../errors/UnexpectedError';
import type { PipelineJson } from '../../pipeline/PipelineJson/PipelineJson';
import type { TaskJson } from '../../pipeline/PipelineJson/TaskJson';
import type { string_href } from '../../types/typeAliases';
import type { string_name } from '../../types/typeAliases';
import { normalizeTo_camelCase } from '../../utils/normalization/normalizeTo_camelCase';
import { titleToName } from '../../utils/normalization/titleToName';

/**
 * Addtional options for rendering Mermaid graph
 */
export type renderPipelineMermaidOptions = {
    /**
     * Callback for creating from task graph node
     */
    linkTask?(task: TaskJson): { href: string_href; title: string } | null;
};

/**
 * Creates a Mermaid graph based on the promptbook
 *
 * Note: The result is not wrapped in a Markdown code block
 *
 * @public exported from `@promptbook/utils`
 */
export function renderPromptbookMermaid(pipelineJson: PipelineJson, options?: renderPipelineMermaidOptions): string {
    const { linkTask = () => null } = options || {};
    let isReservedParameterUsed = false;

    const parameterNameToTaskName = (parameterName: string_name) => {
        const isReservedParameter = RESERVED_PARAMETER_NAMES.includes(parameterName as really_any);

        if (isReservedParameter) {
            isReservedParameterUsed = true;
            return 'knowledge';
        }

        const parameter = pipelineJson.parameters.find((parameter) => parameter.name === parameterName);

        if (!parameter) {
            throw new UnexpectedError(`Could not find {${parameterName}}`);
            // <- TODO: !!!!!! This causes problems when {knowledge} and other reserved parameters are used
        }

        if (parameter.isInput) {
            return 'input';
        }

        const task = pipelineJson.tasks.find((task) => task.resultingParameterName === parameterName);

        if (!task) {
            throw new Error(`Could not find task for {${parameterName}}`);
        }

        return task.name || normalizeTo_camelCase('task-' + titleToName(task.title));
    };

    const tasksAndConnectionsMermaid = pipelineJson.tasks
        .flatMap(({ title, dependentParameterNames, resultingParameterName }) => [
            `${parameterNameToTaskName(resultingParameterName)}("${title}")`,
            ...dependentParameterNames.map(
                (dependentParameterName) =>
                    `${parameterNameToTaskName(
                        dependentParameterName,
                    )}--"{${dependentParameterName}}"-->${parameterNameToTaskName(resultingParameterName)}`,
            ),
        ])
        .join('\n');

    const parametersMermaid = pipelineJson.parameters
        .filter(({ isOutput }) => isOutput)
        .map(({ name }) => `${parameterNameToTaskName(name)}--"{${name}}"-->output`)
        .join('\n');

    const tasksLinksMermaid = pipelineJson.tasks
        .map((task) => {
            const link = linkTask(task);

            if (link === null) {
                return '';
            }

            const { href, title } = link;

            const taskName = parameterNameToTaskName(task.resultingParameterName);

            return `click ${taskName} href "${href}" "${title}";`;
        })
        .filter((line) => line !== '')
        .join('\n');

    const promptbookMermaid = spaceTrim(
        (block) => `

            %% 🔮 Tip: Open this on GitHub or in the VSCode website to see the Mermaid graph visually

            flowchart LR
              subgraph "${pipelineJson.title}"

                  direction TB

                  input((Input)):::input${!isReservedParameterUsed ? '' : `\nreserved((Knowledge)):::reserved`}
                  ${block(tasksAndConnectionsMermaid)}

                  ${block(parametersMermaid)}
                  output((Output)):::output

                  ${block(tasksLinksMermaid)}

                  classDef input color: grey;
                  classDef output color: grey;

              end;

        `,
    );

    return promptbookMermaid;
}

/**
 * TODO: [🧠] !! FOREACH in mermaid graph
 * TODO: [🧠] !! Knowledge in mermaid graph
 * TODO: [🧠] !! Personas in mermaid graph
 * TODO: Maybe use some Mermaid package instead of string templating
 * TODO: [🕌] When more than 2 functionalities, split into separate functions
 */
