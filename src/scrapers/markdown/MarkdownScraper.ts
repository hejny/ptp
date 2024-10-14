import spaceTrim from 'spacetrim';
import type { KnowledgePiecePreparedJson } from '../../types/PipelineJson/KnowledgePieceJson';
import { TODO_USE } from '../../utils/organization/TODO_USE';
import type { Scraper, ScraperSourceHandler } from '../_common/Scraper';
// TODO: [🏳‍🌈] Finally take pick of .json vs .ts
import PipelineCollection from '../../../promptbook-collection/index.json';
// import PipelineCollection from '../../../promptbook-collection/promptbook-collection';
import { createCollectionFromJson } from '../../collection/constructors/createCollectionFromJson';
import { IS_VERBOSE, MAX_PARALLEL_COUNT } from '../../config';
import { titleToName } from '../../conversion/utils/titleToName';
import { MissingToolsError } from '../../errors/MissingToolsError';
import { PipelineExecutionError } from '../../errors/PipelineExecutionError';
import { assertsExecutionSuccessful } from '../../execution/assertsExecutionSuccessful';
import { createPipelineExecutor } from '../../execution/createPipelineExecutor/00-createPipelineExecutor';
import type { PipelineJson } from '../../types/PipelineJson/PipelineJson';
import type { TODO_any } from '../../utils/organization/TODO_any';
import { MarkdownScraperOptions } from './MarkdownScraperOptions';

/**
 * Scraper for markdown files
 *
 * @see `documentationUrl` for more details
 * @public exported from `@promptbook/markdown-utils`
 */
export class MarkdownScraper implements Scraper {
    /**
     * Mime types that this scraper can handle
     */
    public readonly mimeTypes = ['text/markdown', 'text/plain'];

    /**
     * Link to documentation
     */
    public readonly documentationUrl = 'https://github.com/webgptorg/promptbook/discussions/@@';

    public constructor(private readonly options: MarkdownScraperOptions) {}

    /**
     * Scrapes the markdown file and returns the knowledge pieces or `null` if it can't scrape it
     */
    public async scrape(
        source: ScraperSourceHandler,
    ): Promise<Array<Omit<KnowledgePiecePreparedJson, 'sources' | 'preparationIds'>> | null> {
        const { llmTools, maxParallelCount = MAX_PARALLEL_COUNT, isVerbose = IS_VERBOSE } = this.options;

        if (llmTools === undefined) {
            throw new MissingToolsError('LLM tools are required for scraping external files');
            // <- Note: This scraper is used in all other scrapers, so saying "external files" not "markdown files"
        }

        TODO_USE(maxParallelCount); // <- [🪂]

        // TODO: [🌼] In future use `ptbk make` and maked getPipelineCollection
        const collection = createCollectionFromJson(...(PipelineCollection as TODO_any as Array<PipelineJson>));

        const prepareKnowledgeFromMarkdownExecutor = createPipelineExecutor({
            pipeline: await collection.getPipelineByUrl(
                'https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.ptbk.md',
            ),
            tools: {
                llm: llmTools,
            },
        });

        const prepareTitleExecutor = createPipelineExecutor({
            pipeline: await collection.getPipelineByUrl(
                'https://promptbook.studio/promptbook/prepare-knowledge-title.ptbk.md',
            ),
            tools: {
                llm: llmTools,
            },
        });

        const prepareKeywordsExecutor = createPipelineExecutor({
            pipeline: await collection.getPipelineByUrl(
                'https://promptbook.studio/promptbook/prepare-knowledge-keywords.ptbk.md',
            ),
            tools: {
                llm: llmTools,
            },
        });

        const knowledgeContent = await source.asText();

        const result = await prepareKnowledgeFromMarkdownExecutor({ knowledgeContent });

        assertsExecutionSuccessful(result);

        const { outputParameters } = result;
        const { knowledgePieces: knowledgePiecesRaw } = outputParameters;

        const knowledgeTextPieces = (knowledgePiecesRaw || '').split('\n---\n');
        //                                                               <- TODO: [main] !!!!! Smarter split and filter out empty pieces

        if (isVerbose) {
            console.info('knowledgeTextPieces:', knowledgeTextPieces);
        }

        // const usage = ;

        const knowledge = await Promise.all(
            // TODO: [🪂] !! Do not send all at once but in chunks
            knowledgeTextPieces.map(async (knowledgeTextPiece, i) => {
                // Note: Theese are just default values, they will be overwritten by the actual values:
                let name: KnowledgePiecePreparedJson['name'] = `piece-${i}`;
                let title: KnowledgePiecePreparedJson['title'] = spaceTrim(knowledgeTextPiece.substring(0, 100));
                const knowledgePieceContent: KnowledgePiecePreparedJson['content'] = spaceTrim(knowledgeTextPiece);
                let keywords: KnowledgePiecePreparedJson['keywords'] = [];
                const index: KnowledgePiecePreparedJson['index'] = [];

                /*
              TODO: [☀] Track line and column of the source
              const sources: KnowledgePiecePreparedJson['sources'] = [
              ];
              */

                try {
                    const titleResult = await prepareTitleExecutor({ knowledgePieceContent });
                    const { title: titleRaw = 'Untitled' } = titleResult.outputParameters;
                    title = spaceTrim(titleRaw) /* <- TODO: Maybe do in pipeline */;
                    name = titleToName(title);

                    // --- Keywords
                    const keywordsResult = await prepareKeywordsExecutor({ knowledgePieceContent });
                    const { keywords: keywordsRaw = '' } = keywordsResult.outputParameters;
                    keywords = (keywordsRaw || '')
                        .split(',')
                        .map((keyword) => keyword.trim())
                        .filter((keyword) => keyword !== '');
                    if (isVerbose) {
                        console.info(`Keywords for "${title}":`, keywords);
                    }
                    // ---

                    if (!llmTools.callEmbeddingModel) {
                        // TODO: [🟥] Detect browser / node and make it colorfull
                        console.error('No callEmbeddingModel function provided');
                    } else {
                        // TODO: [🧠][🎛] Embedding via multiple models

                        const embeddingResult = await llmTools.callEmbeddingModel({
                            title: `Embedding for ${title}` /* <- Note: No impact on embedding result itself, just for logging */,
                            parameters: {},
                            content: knowledgePieceContent,
                            modelRequirements: {
                                modelVariant: 'EMBEDDING',
                            },
                        });

                        index.push({
                            modelName: embeddingResult.modelName,
                            position: embeddingResult.content,
                        });
                    }
                } catch (error) {
                    // Note: Here is expected error:
                    //     > PipelineExecutionError: You have not provided any `LlmExecutionTools` that support model variant "EMBEDDING
                    if (!(error instanceof PipelineExecutionError)) {
                        throw error;
                    }

                    // TODO: [🟥] Detect browser / node and make it colorfull
                    console.error(
                        error,
                        "<- Note: This error is not critical to prepare the pipeline, just knowledge pieces won't have embeddings",
                    );
                }

                return {
                    name,
                    title,
                    content: knowledgePieceContent,
                    keywords,
                    index,
                    // <- TODO: [☀] sources,
                };
            }),
        );

        return knowledge;
    }
}

/**
 * TODO: [🪂] Do it in parallel 11:11
 * Note: No need to aggregate usage here, it is done by intercepting the llmTools
 */
