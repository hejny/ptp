import { describe, expect, it } from '@jest/globals';
import { parseCommand } from '../_common/parseCommand';
import { knowledgeCommandParser } from './knowledgeCommandParser';

describe('how KNOWLEDGE command in .ptbk.md files works', () => {
    it('should parse KNOWLEDGE command', () => {
        expect(parseCommand('KNOWLEDGE https://www.pavolhejny.com/')).toEqual({
            type: 'KNOWLEDGE',
            source: 'https://www.pavolhejny.com/',
        });
        expect(parseCommand('KNOWLEDGE ./hejny-cv.pdf')).toEqual({
            type: 'KNOWLEDGE',
            source: './hejny-cv.pdf',
        });
    });

    it('should fail parsing KNOWLEDGE command', () => {
        expect(() => parseCommand('KNOWLEDGE')).toThrowError(/Source is not defined/i);
        expect(() => parseCommand('KNOWLEDGE brr')).toThrowError(/Source not valid/i);
        expect(() => parseCommand('KNOWLEDGE http://www.pavolhejny.com/')).toThrowError(/Source is not secure/i);
        expect(() => parseCommand('KNOWLEDGE ../hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
        expect(() => parseCommand('KNOWLEDGE /hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
        expect(() => parseCommand('KNOWLEDGE /etc/system-folder/hejny-cv.pdf')).toThrowError(
            /Source cannot be outside .* folder/i,
        );
        expect(() => parseCommand('KNOWLEDGE C:/hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
        expect(() => parseCommand('KNOWLEDGE C://hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
        expect(() => parseCommand('KNOWLEDGE C:\\hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
        expect(() => parseCommand('KNOWLEDGE C:\\\\hejny-cv.pdf')).toThrowError(/Source cannot be outside .* folder/i);
    });

    it(`should work with all samples`, () => {
        // Note: This is tested also in the common test file parseCommand.test.ts
        for (const example of knowledgeCommandParser.examples) {
            expect(() => parseCommand(example)).not.toThrowError();
        }
    });
});
