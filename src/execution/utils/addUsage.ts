import type { WritableDeep } from 'type-fest';
import type { PromptResultUsage } from '../PromptResult';

/**
 * Function `addUsage` will add multiple usages into one
 *
 * Note: If you provide 0 values, it returns void usage
 */

export function addUsage(...usageItems: Array<PromptResultUsage>): PromptResultUsage {
    const initialStructure: WritableDeep<PromptResultUsage> = {
        price: { value: 0 },
        input: {
            tokensCount: { value: 0 },
            charactersCount: { value: 0 },
            wordsCount: { value: 0 },
            sentencesCount: { value: 0 },
            linesCount: { value: 0 },
            paragraphsCount: { value: 0 },
            pagesCount: { value: 0 },
        },
        output: {
            tokensCount: { value: 0 },
            charactersCount: { value: 0 },
            wordsCount: { value: 0 },
            sentencesCount: { value: 0 },
            linesCount: { value: 0 },
            paragraphsCount: { value: 0 },
            pagesCount: { value: 0 },
        },
    };

    return usageItems.reduce((acc: WritableDeep<PromptResultUsage>, item) => {
        acc.price.value += item.price?.value || 0;

        for (const key of Object.keys(acc.input)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (item.input[key]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                acc.input[key].value += item.input[key].value || 0;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if (item.input[key].isUncertain) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    acc.input[key].isUncertain = true;
                }
            }
        }

        for (const key of Object.keys(acc.output)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (item.output[key]) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                acc.output[key].value += item.output[key].value || 0;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                if (item.output[key].isUncertain) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    acc.output[key].isUncertain = true;
                }
            }
        }

        return acc;
    }, initialStructure);
}
