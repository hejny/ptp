import type { KnowledgePiecePreparedJson } from '../../_packages/types.index';
import { PrepareAndScrapeOptions } from '../../_packages/types.index';
import type { AbstractScraper, ScraperSourceOptions } from '../_common/AbstractScraper';
// TODO: [🏳‍🌈] Finally take pick of .json vs .ts
// import PipelineCollection from '../../../promptbook-collection/promptbook-collection';
import { mkdir, readFile, rm } from 'fs/promises';
import { basename, dirname, join } from 'path';
import { execCommand } from '../../../scripts/utils/execCommand/execCommand';
import { $isRunningInNode } from '../../_packages/utils.index';
import { IS_VERBOSE, SCRAPE_CACHE_DIRNAME } from '../../config';
import { KnowledgeScrapeError } from '../../errors/KnowledgeScrapeError';
import { UnexpectedError } from '../../errors/UnexpectedError';
import { markdownScraper } from '../markdown/markdownScraper';

/**
 * Scraper for .docx files
 *
 * @see `documentationUrl` for more details
 * @public exported from `@promptbook/core`
 */
export const legacyDocumentScraper = {
    /**
     * Mime types that this scraper can handle
     */
    mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],

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
        const {
            externalProgramsPaths = {},
            cacheDirname = SCRAPE_CACHE_DIRNAME,
            isCacheCleaned = false,
            isVerbose = IS_VERBOSE,
        } = options;

        if (!$isRunningInNode()) {
            throw new KnowledgeScrapeError('Scraping .docx files is only supported in Node environment');
        }

        if (!externalProgramsPaths.pandocPath) {
            throw new KnowledgeScrapeError('Pandoc is required for scraping .docx files');
        }

        if (source.filePath === null) {
            // TODO: [🧠] Maybe save file as temporary
            throw new KnowledgeScrapeError('When parsing .docx file, it must be real file in the file system');
        }

        const markdownSourceFilePath =
            // TODO: [🦧] Maybe use here FilesystemTools
            // TODO: [🦧] Do here same subfolder paths /a/b/... like executions-cache
            join(process.cwd(), cacheDirname, basename(source.filePath)).split('\\').join('/') + '.md';

        // TODO: [🦧] Maybe use here FilesystemTools
        await mkdir(dirname(markdownSourceFilePath), { recursive: true });

        if (isVerbose) {
            console.info('legacyDocumentScraper: Converting .docx -> .md');
        }

        // TODO: !!!!!! [🕊] Make execCommand standard (?node-)util of the promptbook
        await execCommand(
            `"${externalProgramsPaths.pandocPath}" -f docx -t markdown "${source.filePath}" -o "${markdownSourceFilePath}"`,
        );

        const markdownSource = {
            source: source.source,
            filePath: markdownSourceFilePath,
            mimeType: 'text/markdown',
            async asText() {
                // TODO: [🦧] Maybe use here FilesystemTools
                return await readFile(markdownSourceFilePath, 'utf-8');
            },
            async asJson() {
                throw new UnexpectedError(
                    'Did not expect that `markdownScraper` would need to get the content `asJson`',
                );
            },
            async asBlob() {
                throw new UnexpectedError(
                    'Did not expect that `markdownScraper` would need to get the content `asBlob`',
                );
            },
        } satisfies ScraperSourceOptions;

        const knowledge = markdownScraper.scrape(markdownSource, options);

        if (isCacheCleaned) {
            if (isVerbose) {
                console.info('legacyDocumentScraper: Clening cache');
            }
            await rm(markdownSourceFilePath);
        }

        return knowledge;
    },
} /* TODO: [🦷] as const */ satisfies AbstractScraper;

/**
 * TODO: !!!!!!  Same pattern for commands> as const satisfies AbstractScraper
 * TODO: [🦖] Make some system for putting scrapers to separete packages
 * TODO: [🪂] Do it in parallel 11:11
 * TODO: [🦷] Ideally use `as const satisfies AbstractScraper` BUT this combination throws errors
 * Note: No need to aggregate usage here, it is done by intercepting the llmTools
 */
