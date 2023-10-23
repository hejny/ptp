import { TupleToUnion } from 'type-fest';

/**
 * Execution type describes the way how the block is executed
 *
 * @see https://github.com/webgptorg/ptp#execution-type
 */
export type ExecutionType = TupleToUnion<typeof ExecutionTypes>;

/**
 * Execution type describes the way how the block is executed
 *
 * @see https://github.com/webgptorg/ptp#execution-type
 */
export const ExecutionTypes = ['PROMPT_TEMPLATE', 'SIMPLE_TEMPLATE', 'SCRIPT', 'PROMPT_DIALOG'] as const;
