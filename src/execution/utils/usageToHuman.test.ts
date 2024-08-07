import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { ZERO_USAGE } from './addUsage';
import { usageToHuman } from './usageToHuman';

describe('how usageToHuman works', () => {
    it('no use should return a meaningful report', () =>
        expect(usageToHuman(ZERO_USAGE)).toEqual(
            spaceTrim(`
                Usage:

            `),
        ));

    it('should make report', () =>
        expect(
            usageToHuman({
                price: { value: 1 },
                input: {
                    tokensCount: { value: 0 },
                    charactersCount: { value: 1 },
                    wordsCount: { value: 20 },
                    sentencesCount: { value: 3 },
                    linesCount: { value: 4 },
                    paragraphsCount: { value: 5 },
                    pagesCount: { value: 6 },
                },
                output: {
                    tokensCount: { value: 3000 },
                    charactersCount: { value: 1 },
                    wordsCount: { value: 20 },
                    sentencesCount: { value: 3 },
                    linesCount: { value: 4 },
                    paragraphsCount: { value: 5 },
                    pagesCount: { value: 6 },
                },
            }),
        ).toEqual(
            spaceTrim(`
                Usage:
          
            `),
        ));

    it('should make report from uncertain usage', () =>
        expect(
            usageToHuman({
                price: { value: 1, isUncertain: true },
                input: {
                    tokensCount: { value: 0, isUncertain: true },
                    charactersCount: { value: 1, isUncertain: true },
                    wordsCount: { value: 3000, isUncertain: true },
                    sentencesCount: { value: 3, isUncertain: true },
                    linesCount: { value: 4, isUncertain: true },
                    paragraphsCount: { value: 5, isUncertain: true },
                    pagesCount: { value: 6, isUncertain: true },
                },
                output: {
                    tokensCount: { value: 300, isUncertain: true },
                    charactersCount: { value: 1, isUncertain: true },
                    wordsCount: { value: 80000, isUncertain: true },
                    sentencesCount: { value: 3, isUncertain: true },
                    linesCount: { value: 4, isUncertain: true },
                    paragraphsCount: { value: 5, isUncertain: true },
                    pagesCount: { value: 6, isUncertain: true },
                },
            }),
        ).toEqual(
            spaceTrim(`
                Usage:
          
            `),
        ));
});
