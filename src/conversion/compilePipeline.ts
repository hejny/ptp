import type { ExecutionTools } from '../execution/ExecutionTools';
import type { PipelineJson } from '../pipeline/PipelineJson/PipelineJson';
import type { PipelineString } from '../pipeline/PipelineString';
import type { PrepareAndScrapeOptions } from '../prepare/PrepareAndScrapeOptions';
import { preparePipeline } from '../prepare/preparePipeline';
import { precompilePipeline } from './precompilePipeline';

/**
 * Compile pipeline from string (markdown) format to JSON format
 *
 * Note: There are 3 similar functions:
 * - `compilePipeline` **(preferred)** - which propperly compiles the promptbook and use embedding for external knowledge
 * - `precompilePipeline` - use only if you need to compile promptbook synchronously and it contains NO external knowledge
 * - `preparePipeline` - just one step in the compilation process
 *
 * Note: This function does not validate logic of the pipeline only the parsing
 * Note: This function acts as compilation process
 *
 * @param pipelineString {Promptbook} in string markdown format (.book.md)
 * @param tools - Tools for the preparation and scraping - if not provided together with `llm`, the preparation will be skipped
 * @param options - Options and tools for the compilation
 * @returns {Promptbook} compiled in JSON format (.book.json)
 * @throws {ParseError} if the promptbook string is not valid
 * @public exported from `@promptbook/core`
 */
export async function compilePipeline(
    pipelineString: PipelineString,
    tools?: Pick<ExecutionTools, 'llm' | 'fs' | 'scrapers'>,
    options?: PrepareAndScrapeOptions,
): Promise<PipelineJson> {
    let pipelineJson = precompilePipeline(pipelineString);

    if (tools !== undefined && tools.llm !== undefined) {
        pipelineJson = await preparePipeline(
            pipelineJson,
            tools,
            options || {
                rootDirname: null,
            },
        );
    }

    // Note: No need to use `$exportJson` because `precompilePipeline` and `preparePipeline` already do that
    return pipelineJson;
}

/**
 * TODO: [🏏] Leverage the batch API and build queues @see https://platform.openai.com/docs/guides/batch
 * TODO: [🛠] Actions, instruments (and maybe knowledge) => Functions and tools
 * TODO: [🧠] Should be in generated JSON file GENERATOR_WARNING
 */
