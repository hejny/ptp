import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { pipelineStringToJson } from '../../conversion/pipelineStringToJson';
import type { PipelineString } from '../../types/PipelineString';
import { just } from '../../utils/just';
import { createCollectionFromDirectory } from './createCollectionFromDirectory';

describe('createCollectionFromDirectory', () => {
    const promptbook = spaceTrim(`
          # ✨ Sample prompt with URL

          Show how to use a simple prompt with no parameters.

          -   PIPELINE URL https://promptbook.example.com/samples/simple.ptbk.md
          -   PROMPTBOOK VERSION 1.0.0
          -   OUTPUT PARAMETER \`{greeting}\`


          ## 💬 Prompt

          \`\`\`text
          Hello
          \`\`\`

          -> {greeting}


    `) as PipelineString;

    it('should get promptbook by url from collection', async () => {
        expect.assertions(1);
        const collection = await createCollectionFromDirectory('./samples/templates', {
            isVerbose: true,
            isRecursive: false,
            isLazyLoaded: false,
        });
        const promptbookFromLibrary = await collection.getPipelineByUrl(
            'https://promptbook.example.com/samples/simple.ptbk.md',
        );

        expect(promptbookFromLibrary).toEqual(await pipelineStringToJson(promptbook));
    });

    it('should get lazy-loaded promptbook by url from collection', async () => {
        expect.assertions(1);

        const collection = await createCollectionFromDirectory('./samples/templates', {
            isVerbose: true,
            isRecursive: false,
            isLazyLoaded: true,
        });
        const promptbookFromLibrary = await collection.getPipelineByUrl(
            'https://promptbook.example.com/samples/simple.ptbk.md',
        );

        expect(promptbookFromLibrary).toEqual(await pipelineStringToJson(promptbook));
    });

    it('should get different promptbook by url from collection', async () => {
        expect.assertions(1);

        const collection = await createCollectionFromDirectory('./samples/templates', {
            isVerbose: true,
            isRecursive: false,
        });
        const promptbookFromLibrary = await collection.getPipelineByUrl(
            'https://promptbook.example.com/samples/jokers.ptbk.md',
        );

        expect(promptbookFromLibrary).not.toEqual(await pipelineStringToJson(promptbook));
    });

    it('should NOT crash when include error promptbooks but lazy-loaded', () =>
        expect(
            (async () => {
                const collection = await createCollectionFromDirectory('./samples/templates', {
                    isVerbose: true,
                    isRecursive: true /* <- Note: Include Errors */,
                    isLazyLoaded: true,
                });
                just(collection);
            })(),
        ).resolves.not.toThrow());

    it('should crash when include error promptbooks', () =>
        expect(
            (async () => {
                const collection = await createCollectionFromDirectory('./samples/templates', {
                    isVerbose: true,
                    isRecursive: true /* <- Note: Include Errors */,
                    isLazyLoaded: false,
                });
                just(collection);
            })(),
        ).rejects.toThrowError(/Error during loading promptbook/i));

    /*
    TODO: Make separate folder for errors and enable this test
    it('should find promptbook in subdirectory', () =>
        expect(
            (async () => {
              const collection = await   createCollectionFromDirectory('./samples/templates', {
                    isVerbose: true,
                    isRecursive: false,
                });
                const promptbookFromLibrary = await collection.getPipelineByUrl(
                    'https://promptbook.studio/webgpt/write-website-content.ptbk.md',
                );
                return promptbookFromLibrary.title;
            })(),
        ).resolves.toBe('🌍 Create website content'));
    */
});
