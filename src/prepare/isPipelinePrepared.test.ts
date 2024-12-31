import { describe, expect, it } from '@jest/globals';
import { precompilePipeline } from '../conversion/precompilePipeline';
import { importPipelineJson, importPipelineWithoutPreparation } from '../conversion/validation/_importPipeline';
import { isPipelinePrepared } from './isPipelinePrepared';
import { unpreparePipeline } from './unpreparePipeline';

describe('how isPipelinePrepared works', () => {
    it('should tell that pipeline is prepared', () => {
        expect(isPipelinePrepared(importPipelineJson('25-simple-knowledge.book.json'))).toBe(true);
        expect(isPipelinePrepared(importPipelineJson('01-simple.book.json'))).toBe(true);
    });

    it('should tell that simple pipeline is always prepared', () => {
        expect(isPipelinePrepared(unpreparePipeline(importPipelineJson('01-simple.book.json')))).toBe(true);
        expect(isPipelinePrepared(precompilePipeline(importPipelineWithoutPreparation('01-simple.book.md')))).toBe(
            true,
        );
        // Note: [🍫]
    });

    it('should tell that pipeline is NOT prepared', () => {
        expect(isPipelinePrepared(unpreparePipeline(importPipelineJson('25-simple-knowledge.book.json')))).toBe(false);
        expect(
            isPipelinePrepared(precompilePipeline(importPipelineWithoutPreparation('25-simple-knowledge.book.md'))),
        ).toBe(false);
    });
});
