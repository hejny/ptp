import type { KnowledgePiecePreparedJson } from '../../_packages/types.index';
import { PrepareAndScrapeOptions } from '../../_packages/types.index';
import type { AbstractScraper, ScraperSourceOptions } from '../_common/AbstractScraper';
// TODO: [🏳‍🌈] Finally take pick of .json vs .ts
// import PipelineCollection from '../../../promptbook-collection/promptbook-collection';
import { NotYetImplementedError } from '../../errors/NotYetImplementedError';
import { TODO_USE } from '../../utils/organization/TODO_USE';

/**
 * Scraper for .docx files
 *
 * @see `documentationUrl` for more details
 * @public exported from `@promptbook/core`
 */
export const pdfScraper = {
    /**
     * Mime types that this scraper can handle
     */
    mimeTypes: ['application/pdf'],

    /**
     * Link to documentation
     */
    documentationUrl: 'https://github.com/webgptorg/promptbook/discussions/@@',

    /**
     * Scrapes the docx file and returns the knowledge pieces or `null` if it can't scrape it
     */
    async scrape(
        source: ScraperSourceOptions,
        options: PrepareAndScrapeOptions,
    ): Promise<Array<Omit<KnowledgePiecePreparedJson, 'sources' | 'preparationIds'>> | null> {
        TODO_USE(source);
        TODO_USE(options);

        /*
        const {
            externalProgramsPaths = {},
            cacheDirname = SCRAPE_CACHE_DIRNAME,
            isCacheCleaned = false,
            isVerbose = IS_VERBOSE,
        } = options;
        */

        throw new NotYetImplementedError('PDF scraping not yet implemented');
    },
} /* TODO: [🦷] as const */ satisfies AbstractScraper;

/**
 * TODO: [👣] Converted documents can act as cached items - there is no need to run conversion each time
 * TODO: [🦖] Make some system for putting scrapers to separete packages
 * TODO: [🪂] Do it in parallel 11:11
 * TODO: [🦷] Ideally use `as const satisfies AbstractScraper` BUT this combination throws errors
 * Note: No need to aggregate usage here, it is done by intercepting the llmTools
 */
