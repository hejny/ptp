import { describe, expect, it } from '@jest/globals';
import { getLlmToolsForTestingAndScriptsAndPlayground } from '../../../llm-providers/_common/getLlmToolsForTestingAndScriptsAndPlayground';
import { prepareKnowledgePieces } from './prepareKnowledgePieces';

describe('how prepareKnowledge works', () => {
    it('should work with empty knowledge', () =>
        expect(
            prepareKnowledgePieces([], {
                llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
            }),
        ).resolves.toEqual([]));

    // TODO: [🐝][main] !!! Test markdown, file and website here, rest in their own preparers
});
