import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { getLlmToolsForTestingAndScriptsAndPlayground } from '../knowledge/prepare-knowledge/_common/utils/getLlmToolsForTestingAndScriptsAndPlayground';
import { preparePersona } from './preparePersona';

describe('how preparePersona works', () => {
    it('should work with simple persona description', () =>
        expect(
            preparePersona(`Copywriter`, {
                llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
            }),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕] Allow to specify more model names or more general like gpt-4-*, 1234 context window etc.
        }));

    it('should work with advanced structured persona description', () =>
        expect(
            preparePersona(
                spaceTrim(`
                    Skilled Copywriter with 5 years of experience in the field.

                    - Experience with SEO and SEM
                    - Experience with social media
                    - Experience with email marketing

                `),
                {
                    llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
                },
            ),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕]
        }));

    it('should work with creative persona', () =>
        expect(
            preparePersona(`Poem writer with unconventional style of writing in his own language and style`, {
                llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
            }),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕]
        }));

    it('should work with non-creative persona', () =>
        expect(
            preparePersona(
                `Technical writer with 5 years of experience in the field. Experience with writing technical documentation, user manuals, and API documentation.`,
                {
                    llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
                },
            ),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕]
        }));

    it('should work French native speaker', () =>
        expect(
            preparePersona(
                `Locuteur natif français, j'aime écrire et je suis passionné par la langue et la culture française.`,
                {
                    llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
                },
            ),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕]
        }));

    it('should work with weird persona description', () =>
        expect(
            preparePersona(`Xyzzy with 5 years of experience in the field. Experience with foo and bar.`, {
                llmTools: getLlmToolsForTestingAndScriptsAndPlayground(),
            }),
        ).resolves.toEqual({
            modelVariant: 'CHAT',
            modelName: 'gpt-4', // <- TODO: [💕]
        }));

    /*
    Note: Probbably no failure cases needed
        > it('should NOT work with bar', () =>
        >     expect(
        >         preparePersona({...}),
        >     ).rejects.toThrowError(/---/));
    */
});
