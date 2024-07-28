import { just } from '../../utils/organization/just';
import type { FormatDefinition } from '../_common/FormatDefinition';
import { isValidJsonString } from './utils/isValidJsonString';

/**
 * Definition for JSON format
 */
export const JsonFormatDefinition: FormatDefinition<string /* <-[0] */, string /* <-[👨‍⚖️] */, object /* <-[1] */> = {
    name: 'JSON',

    mimeType: 'application/json',

    isValid(value, schema): value is string /* <-[0] */ {
        just(schema /* <- TODO: Use schema here */);
        return isValidJsonString(value);
    },

    canBeValid(partialValue, schema): partialValue is string /* <-[0] */ {
        just(partialValue /* <- TODO: Use partialValue here */);
        just(schema /* <- TODO: Use schema here */);
        return true;
    },

    heal(value, schema) {
        just(value /* <- TODO: Use partialValue here */);
        just(schema /* <- TODO: Use schema here */);
        throw new Error('Not implemented');
    },

    extractValues(value, schema) {
        just(value /* <- TODO: Use value here */);
        just(schema /* <- TODO: Use schema here */);
        throw new Error('Not implemented');
    },
};

/**
 * TODO: [🧠] Maybe propper instance of object
 * TODO: [0] Make string_serialized_json
 * TODO: [1] Make type for JSON Schema
 * TODO: [🧠] What to use for validating JSONs - JSON Schema, ZoD, typescript types/interfaces,...?
 * TODO: [🍓] In `JsonFormatDefinition` implement simple `isValid`
 * TODO: [🍓] In `JsonFormatDefinition` implement partial `canBeValid`
 * TODO: [🍓] In `JsonFormatDefinition` implement `heal
 * TODO: [🍓] In `JsonFormatDefinition` implement `extractValues`
 */
