import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { promptTemplatePipelineStringToJson } from '../../../conversion/promptTemplatePipelineStringToJson';
import { PromptTemplatePipelineString } from '../../../types/PromptTemplatePipelineString';
import { assertsExecutionSuccessful } from '../../assertsExecutionSuccessful';
import { createPtpExecutor } from '../../createPtpExecutor';
import { MockedEchoNaturalExecutionTools } from '../natural-execution-tools/mocked/MockedEchoNaturalExecutionTools';
import { CallbackInterfaceTools } from '../user-interface-execution-tools/callback/CallbackInterfaceTools';

describe('createPtpExecutor + executing user interface prompts in ptp', () => {
    const ptp = promptTemplatePipelineStringToJson(
        spaceTrim(`
            # Sample prompt

            Show how to use prompt dialog

            -   PTBK VERSION 1.0.0
            -   INPUT  PARAMETER {thing} Any thing to buy

            ## Thing

            -   PROMPT DIALOG

            What is your favorite {thing} to buy?

            \`\`\`text
            {thing}
            \`\`\`

            -> {favoriteThing}
         `) as PromptTemplatePipelineString,
    );
    const ptpExecutor = createPtpExecutor({
        ptp,
        tools: {
            natural: new MockedEchoNaturalExecutionTools({ isVerbose: true }),
            script: [],
            userInterface: new CallbackInterfaceTools({
                isVerbose: true,
                async callback({ promptTitle, promptMessage, defaultValue }) {
                    return `Answer to question "${promptTitle}: ${promptMessage}" is not ${defaultValue} but Pear.`;
                },
            }),
        },
        settings: {
            maxExecutionAttempts: 3,
        },
    });

    it('should work when every INPUT  PARAMETER defined', () => {
        expect(ptpExecutor({ thing: 'apple' }, () => {})).resolves.toMatchObject({
            outputParameters: {
                favoriteThing: 'Answer to question "Thing: What is your favorite apple to buy?" is not apple but Pear.',
            },
        });
        expect(ptpExecutor({ thing: 'a cup of coffee' }, () => {})).resolves.toMatchObject({
            outputParameters: {
                favoriteThing:
                    'Answer to question "Thing: What is your favorite a cup of coffee to buy?" is not a cup of coffee but Pear.',
            },
        });
    });

    it('should fail when some INPUT  PARAMETER is missing', () => {
        expect(ptpExecutor({}, () => {})).resolves.toMatchObject({
            isSuccessful: false,
        });

        expect(ptpExecutor({}, () => {}).then(({ errors }) => errors[0]?.message)).resolves.toMatch(
            /Parameter \{thing\} is not string but undefined/,
        );

        expect(() => ptpExecutor({}, () => {}).then(assertsExecutionSuccessful)).rejects.toThrowError(
            /Parameter \{thing\} is not string but undefined/,
        );
    });
});
