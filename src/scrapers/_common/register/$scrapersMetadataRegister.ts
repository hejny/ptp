import { $Register } from '../../../utils/$Register';
import type { ScraperMetadata } from './ScraperMetadata';

/**
 * @@@
 *
 * Note: `$` is used to indicate that this interacts with the global scope
 * @singleton Only one instance of each register is created per build, but thare can be more @@@
 * @public exported from `@promptbook/core`
 */
export const $scrapersMetadataRegister = new $Register<ScraperMetadata>('scrapers_metadata');

/**
 * TODO: [®] DRY Register logic
 */
