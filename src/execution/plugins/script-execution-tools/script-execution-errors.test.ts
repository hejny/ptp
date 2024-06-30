import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { promptbookStringToJson } from '../../../conversion/promptbookStringToJson';
import { CallbackInterfaceTools } from '../../../knowledge/dialogs/callback/CallbackInterfaceTools';
import { MockedEchoLlmExecutionTools } from '../../../llm-providers/mocked/MockedEchoLlmExecutionTools';
import { JavascriptExecutionTools } from '../../../scripting/javascript/JavascriptExecutionTools';
import type { PromptbookString } from '../../../types/PromptbookString';
import { assertsExecutionSuccessful } from '../../assertsExecutionSuccessful';
import { createPromptbookExecutor } from '../../createPromptbookExecutor';

describe('createPromptbookExecutor + executing scripts in promptbook', () => {
    const promptbook = promptbookStringToJson(
        spaceTrim(`
            # Sample prompt

            Show how to execute a script

            -   PROMPTBOOK VERSION 1.0.0
            -   INPUT  PARAMETER {thing} Any thing to buy
            -   OUTPUT PARAMETER {bhing}

            ## Execution

            -   EXECUTE SCRIPT

            \`\`\`javascript
            if(/Apple/i.test(thing)){
                throw new Error('I do not like Apples!');
            }
            return thing.split('a').join('b')
            \`\`\`

            -> {bhing}
         `) as PromptbookString,
    );
    const promptbookExecutor = createPromptbookExecutor({
        promptbook,
        tools: {
            llm: new MockedEchoLlmExecutionTools({ isVerbose: true }),
            script: [
                new JavascriptExecutionTools({
                    isVerbose: true,
                    // Note: [🕎] Custom functions are tested elsewhere
                }),
            ],
            userInterface: new CallbackInterfaceTools({
                isVerbose: true,
                async callback() {
                    return 'Hello';
                },
            }),
        },
        settings: {
            maxExecutionAttempts: 3,
        },
    });

    it('should work when every INPUT  PARAMETER is allowed', () => {
        expect(promptbookExecutor({ thing: 'a cup of coffee' }, () => {})).resolves.toMatchObject({
            isSuccessful: true,
            errors: [],
            outputParameters: {
                bhing: 'b cup of coffee',
            },
        });
        expect(promptbookExecutor({ thing: 'arrow' }, () => {})).resolves.toMatchObject({
            isSuccessful: true,
            errors: [],
            outputParameters: {
                bhing: 'brrow',
            },
        });
        expect(promptbookExecutor({ thing: 'aaa' }, () => {})).resolves.toMatchObject({
            isSuccessful: true,
            errors: [],
            outputParameters: {
                bhing: 'bbb',
            },
        });
    });

    it('should fail when INPUT  PARAMETER is NOT allowed', () => {
        for (const thing of ['apple', 'apples', 'an apple', 'Apple', 'The Apple', '🍏 Apple', 'Apple 🍎']) {
            expect(promptbookExecutor({ thing }, () => {})).resolves.toMatchObject({
                isSuccessful: false,
                errors: [new Error(`I do not like Apples!`)],
            });

            expect(() => promptbookExecutor({ thing }, () => {}).then(assertsExecutionSuccessful)).rejects.toThrowError(
                /I do not like Apples!/,
            );
        }
    });
});
