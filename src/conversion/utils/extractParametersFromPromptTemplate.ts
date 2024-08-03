import type { PromptTemplateJson } from '../../types/PipelineJson/PromptTemplateJson';
import type { string_parameter_name } from '../../types/typeAliases';
import { extractParameters } from '../../utils/extractParameters';
import { extractVariables } from './extractVariables';

/**
 * Parses the prompt template and returns the set of all used parameters
 *
 * @param promptTemplate the template with used parameters
 * @returns the set of parameter names
 * @throws {ParsingError} if the script is invalid
 */
export function extractParametersFromPromptTemplate(
    promptTemplate: Pick<PromptTemplateJson, 'title' | 'description' | 'blockType' | 'content'>,
    // <- TODO: [🧠][🥜]
): Set<string_parameter_name> {
    const parameterNames = new Set<string_parameter_name>();

    for (const parameterName of [
        ...extractParameters(promptTemplate.title),
        ...extractParameters(promptTemplate.description || ''),
        ...extractParameters(promptTemplate.content),
    ]) {
        parameterNames.add(parameterName);
    }

    if (promptTemplate.blockType === 'SCRIPT') {
        for (const parameterName of extractVariables(promptTemplate.content)) {
            parameterNames.add(parameterName);
        }
    }

    return parameterNames;
}

/**
 * TODO: [🔣] If script require contentLanguage
 */
