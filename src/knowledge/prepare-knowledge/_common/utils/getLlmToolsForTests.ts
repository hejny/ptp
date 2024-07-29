import { MockedEchoLlmExecutionTools } from '../../../../llm-providers/mocked/MockedEchoLlmExecutionTools';
import type { LlmExecutionTools } from '../../../../execution/LlmExecutionTools';

/**
 * Returns LLM tools for testing purposes
 *
 * @private within the package - JUST FOR TESTS
 */
export function getLlmToolsForTests(): LlmExecutionTools {
    return new MockedEchoLlmExecutionTools(/* TODO: [🧠][🕵️‍♀️] Testing with real LLM with seed and (commited) caching */);
}
