import type { ExecutionTools } from '../../execution/ExecutionTools';
import type { PrepareAndScrapeOptions } from '../../prepare/PrepareAndScrapeOptions';
import { DocumentScraper } from './DocumentScraper';
import { documentScraperMetadata } from './register-metadata';
// <- TODO: !!!!!!! Are theese changed to import type { ... } from ... correctly

/**
 * @@@
 *
 * @public exported from `@promptbook/documents`
 */
export const createDocumentScraper = Object.assign(
    (tools: Pick<ExecutionTools, 'llm'>, options: PrepareAndScrapeOptions): DocumentScraper => {
        return new DocumentScraper(tools, options);
    },
    documentScraperMetadata,
) satisfies ScraperConstructor;

/**
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
