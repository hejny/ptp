import { describe, expect, it } from '@jest/globals';
import '../../../_packages/core.index'; // <- Note: Really importing @@@5
import { getLlmToolsForTestingAndScriptsAndPlayground } from '../../../llm-providers/_common/getLlmToolsForTestingAndScriptsAndPlayground';
import { prepareKnowledgePieces } from './prepareKnowledgePieces';

describe('how prepareKnowledge works', () => {
    it('should work with empty knowledge', () =>
        expect(
            prepareKnowledgePieces([], {
                llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
            }),
        ).resolves.toEqual([]));

    // TODO: [🐝] !!! Test markdown, file and website here, rest in their own preparers
});
