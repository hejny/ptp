import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { PromptTemplatePipeline } from '../../../classes/PromptTemplatePipeline';
import { promptTemplatePipelineStringToJson } from '../../../conversion/promptTemplatePipelineStringToJson';
import { PromptTemplatePipelineString } from '../../../types/PromptTemplatePipelineString';
import { createPtpExecutor } from '../../createPtpExecutor';
import { MockedEchoNaturalExecutionTools } from '../natural-execution-tools/mocked/MockedEchoNaturalExecutionTools';
import { CallbackInterfaceTools } from '../user-interface-execution-tools/callback/CallbackInterfaceTools';

describe('createPtpExecutor + executing user interface prompts in ptp', () => {
    const ptpJson = promptTemplatePipelineStringToJson(
        spaceTrim(`
            # Sample prompt

            Show how to use a simple prompt with no parameters.
            
            -   PTP version 1.0.0
            -   Input parameter {thing} Any thing to buy
            
            ## Prompt

            -   Prompt dialog

            What is your favorite {thing} to buy?
            
            \`\`\`text
            {thing}
            \`\`\`
            
            -> {favoriteThing}
         `) as PromptTemplatePipelineString,
    );
    const ptp = PromptTemplatePipeline.fromJson(ptpJson);
    const ptpExecutor = createPtpExecutor({
        ptp,
        tools: {
            natural: new MockedEchoNaturalExecutionTools({ isVerbose: true }),
            script: [],
            userInterface: new CallbackInterfaceTools({
                isVerbose: true,
                async callback({ prompt, defaultValue }) {
                    return `Answer to question "${prompt}" is not ${defaultValue} but Pear.`;
                },
            }),
        },
    });

    it('should work when every input parameter defined', () => {
        expect(ptpExecutor({ thing: 'apple' }, () => {})).resolves.toMatchObject({
            favoriteThing: 'Answer to question "What is your favorite apple to buy?" is not apple but Pear.',
        });
        expect(ptpExecutor({ thing: 'a cup of coffee' }, () => {})).resolves.toMatchObject({
            favoriteThing:
                'Answer to question "What is your favorite a cup of coffee to buy?" is not a cup of coffee but Pear.',
        });
    });

    it('should fail when some input parameter is missing', () => {
        expect(ptpExecutor({}, () => {})).rejects.toThrowError(/Parameter \{thing\} is not defined/i);
    });
});
