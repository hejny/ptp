import type { string_mime_type } from '../../types/typeAliases';
import type { string_name } from '../../types/typeAliases';

/**
 * A format definition is a set of functions that define how to validate, heal and convert response from LLM
 *
 * @see https://github.com/webgptorg/promptbook/discussions/36
 */
export type FormatDefinition<TValue extends TPartialValue, TPartialValue extends string, TSchema extends object> = {
    /**
     * The name of the format used in .ptbk.md files
     *
     * @sample "JSON"
     */
    readonly name: string_name;

    /**
     * The mime type of the format (if any)
     *
     * @sample "application/json"
     */
    readonly mimeType?: string_mime_type;

    /**
     * Check if a value is fully valid
     *
     * @param value The value to check, for example "{\"foo\": true}"
     * @param schema Optional schema to do extra validation
     */
    isValid(value: string, schema?: TSchema): value is TValue;

    /**
     * Check if a first part of a value is valid
     *
     * @see https://github.com/webgptorg/promptbook/discussions/37
     *
     * @param partialValue Partial value to check, for example "{\"foo\": t"
     * @param schema Optional schema to do extra validation
     */
    canBeValid(partialValue: string, schema?: TSchema): partialValue is TPartialValue;

    /**
     * Heal a value to make it valid if possible
     *
     * Note: This make sense in context of LLMs that often returns slightly invalid values
     * @see https://github.com/webgptorg/promptbook/discussions/31
     *
     * @param value The value to heal, for example "{foo: true}"
     * @param scheme
     * @throws {Error} If the value cannot be healed
     */
    heal(value: string, scheme?: TSchema): TValue;
};

/**
 * TODO: [👨‍⚖️] Compute TPartialValue dynamically - PartialString<TValue>
 * TODO: [🧠] Should execution tools be aviable to heal, canBeValid and isValid?
 * TODO: [🧠] llm Provider Bindings
 */
