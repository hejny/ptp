import { spaceTrim } from 'spacetrim';
import { LOOP_LIMIT } from '../../config';
import { PipelineLogicError } from '../../errors/PipelineLogicError';
import { SyntaxError } from '../../errors/SyntaxError';
import { UnexpectedError } from '../../errors/UnexpectedError';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { PromptTemplateJson } from '../../types/PipelineJson/PromptTemplateJson';
import type { string_name } from '../../types/typeAliases';
import { isValidUrl } from '../../utils/validators/url/isValidUrl';

/**
 * Validates PipelineJson if it is logically valid
 *
 * It checks:
 * -   if it has correct parameters dependency
 *
 * It does NOT check:
 * -   if it is valid json
 * -   if it is meaningful
 *
 * @param pipeline valid or invalid PipelineJson
 * @returns the same pipeline if it is logically valid
 * @throws {PipelineLogicError} on logical error in the pipeline
 */
export function validatePipeline(pipeline: PipelineJson): PipelineJson {
    // TODO: [🧠] Maybe test if promptbook is a promise and make specific error case for that

    if (pipeline.pipelineUrl !== undefined) {
        if (!isValidUrl(pipeline.pipelineUrl)) {
            // TODO: This should be maybe the syntax error detected during parsing
            throw new PipelineLogicError(`Invalid promptbook URL "${pipeline.pipelineUrl}"`);
        }
    }

    // TODO: [🧠] Maybe do here some propper JSON-schema / ZOD checking
    if (!Array.isArray(pipeline.parameters)) {
        // TODO: [🧠] what is the correct error tp throw - maybe PromptbookSchemaError
        throw new SyntaxError(
            spaceTrim(`
                Promptbook is valid JSON but with wrong structure

                promptbook.parameters expected to be an array, but got ${typeof pipeline.parameters}
            `),
        );
    }

    // TODO: [🧠] Maybe do here some propper JSON-schema / ZOD checking
    if (!Array.isArray(pipeline.promptTemplates)) {
        // TODO: [🧠] what is the correct error tp throw - maybe PromptbookSchemaError
        throw new SyntaxError(
            spaceTrim(`
              Promptbook is valid JSON but with wrong structure

              promptbook.promptTemplates expected to be an array, but got ${typeof pipeline.promptTemplates}
          `),
        );
    }

    // Note: Check each parameter individually
    for (const parameter of pipeline.parameters) {
        if (parameter.isInput && parameter.isOutput) {
            throw new PipelineLogicError(`Parameter {${parameter.name}} can not be both input and output`);
        }

        // Note: Testing that parameter is either intermediate or output BUT not created and unused
        if (
            !parameter.isInput &&
            !parameter.isOutput &&
            !pipeline.promptTemplates.some((template) => template.dependentParameterNames.includes(parameter.name))
        ) {
            throw new PipelineLogicError(
                spaceTrim(`
                    Parameter {${parameter.name}} is created but not used

                    You can declare {${parameter.name}} as output parameter by adding in the header:
                    - OUTPUT PARAMETER \`{${parameter.name}}\` ${parameter.description || ''}

                `),
            );
        }

        // Note: Testing that parameter is either input or result of some template
        if (
            !parameter.isInput &&
            !pipeline.promptTemplates.some((template) => template.resultingParameterName === parameter.name)
        ) {
            throw new PipelineLogicError(
                spaceTrim(`
                    Parameter {${parameter.name}} is declared but not defined

                    You can do one of these:
                    - Remove declaration of {${parameter.name}}
                    - Add prompt template that results in -> {${parameter.name}}

                `),
            );
        }
    }

    // Note: Check each template individually
    const definedParameters: Set<string> = new Set(
        pipeline.parameters.filter(({ isInput }) => isInput).map(({ name }) => name),
    );
    for (const template of pipeline.promptTemplates) {
        if (definedParameters.has(template.resultingParameterName)) {
            throw new PipelineLogicError(`Parameter {${template.resultingParameterName}} is defined multiple times`);
        }

        definedParameters.add(template.resultingParameterName);

        if (template.executionType === 'PROMPT_TEMPLATE' && template.modelRequirements.modelVariant === undefined) {
            throw new PipelineLogicError(
                spaceTrim(`

                  You must specify MODEL VARIANT in the prompt template "${template.title}"

                  For example:
                  - MODEL VARIANT Chat
                  - MODEL NAME \`gpt-4-1106-preview\`

              `),
            );
        }

        if (template.jokers && template.jokers.length > 0) {
            if (
                !template.expectFormat &&
                !template.expectations /* <- TODO: Require at least 1 -> min <- expectation to use jokers */
            ) {
                throw new PipelineLogicError(
                    `Joker parameters are used for {${template.resultingParameterName}} but no expectations are defined`,
                );
            }

            for (const joker of template.jokers) {
                if (!template.dependentParameterNames.includes(joker)) {
                    throw new PipelineLogicError(
                        `Parameter {${joker}} is used for {${template.resultingParameterName}} as joker but not in dependentParameterNames`,
                    );
                }
            }
        }

        if (template.expectations) {
            for (const [unit, { min, max }] of Object.entries(template.expectations)) {
                if (min !== undefined && max !== undefined && min > max) {
                    throw new PipelineLogicError(
                        `Min expectation (=${min}) of ${unit} is higher than max expectation (=${max})`,
                    );
                }

                if (min !== undefined && min < 0) {
                    throw new PipelineLogicError(`Min expectation of ${unit} must be zero or positive`);
                }

                if (max !== undefined && max <= 0) {
                    throw new PipelineLogicError(`Max expectation of ${unit} must be positive`);
                }
            }
        }
    }

    // Note: Detect circular dependencies
    let resovedParameters: Array<string_name> = pipeline.parameters
        .filter(({ isInput }) => isInput)
        .map(({ name }) => name);
    let unresovedTemplates: Array<PromptTemplateJson> = [...pipeline.promptTemplates];

    let loopLimit = LOOP_LIMIT;
    while (unresovedTemplates.length > 0) {
        if (loopLimit-- < 0) {
            throw new UnexpectedError(
                'Loop limit reached during detection of circular dependencies in `validatePipeline`',
            );
        }

        const currentlyResovedTemplates = unresovedTemplates.filter((template) =>
            template.dependentParameterNames.every((name) => resovedParameters.includes(name)),
        );

        if (currentlyResovedTemplates.length === 0) {
            throw new PipelineLogicError(
                spaceTrim(
                    (block) => `

                        Can not resolve some parameters
                        It may be circular dependencies

                        Can not resolve:
                        ${block(
                            unresovedTemplates
                                .map(
                                    ({ resultingParameterName, dependentParameterNames }) =>
                                        `- {${resultingParameterName}} depends on ${dependentParameterNames
                                            .map((dependentParameterName) => `{${dependentParameterName}}`)
                                            .join(', ')}`,
                                )
                                .join('\n'),
                        )}

                        Resolved:
                        ${block(resovedParameters.map((name) => `- {${name}}`).join('\n'))}
                    `,
                ),
            );
        }

        resovedParameters = [
            ...resovedParameters,
            ...currentlyResovedTemplates.map(({ resultingParameterName }) => resultingParameterName),
        ];

        unresovedTemplates = unresovedTemplates.filter((template) => !currentlyResovedTemplates.includes(template));
    }
    return pipeline;
}

/**
 * TODO: [🧠] Work with promptbookVersion
 * TODO: Use here some json-schema, Zod or something similar and change it to:
 *     > /**
 *     >  * Validates PipelineJson if it is logically valid.
 *     >  *
 *     >  * It checks:
 *     >  * -   it has a valid structure
 *     >  * -   ...
 *     >  ex port function validatePipeline(promptbook: unknown): asserts promptbook is PipelineJson {
 */
