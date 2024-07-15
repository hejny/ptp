import type { string_url } from '../../types/typeAliases';
import type { PipelineCollection } from '../PipelineCollection';
import { createCollectionFromPromise } from './createCollectionFromPromise';

/**
 * Options for `createCollectionFromDirectory` function
 */
type CreatePipelineCollectionFromUrlyOptions = {
    /**
     * If true, the collection creation outputs information about each file it reads
     *
     * @default false
     */
    isVerbose?: boolean;

    /**
     * If true, directory will be scanned only when needed not during the construction
     *
     * @default false
     */
    isLazyLoaded?: boolean;
};

/**
 * Constructs Promptbook from remote Promptbase URL

 * @returns PipelineCollection
 */
export async function createCollectionFromUrl(
    url: string_url | URL,
    options: CreatePipelineCollectionFromUrlyOptions,
): Promise<PipelineCollection> {
    const { isVerbose = false, isLazyLoaded = false } = options || {};

    const collection = createCollectionFromPromise(async () => {
        if (isVerbose) {
            console.info(`Creating pipeline collection from url ${url.toString()}`);
        }

        throw new Error('Not implemented yet');
    });

    if (isLazyLoaded === false) {
        await collection.listPipelines();
    }

    return collection;

    // TODO: !!! [🏳‍🌈] Allow variant with .json .js and .ts files
    // TODO: [🧠][🏳‍🌈] .js and .ts files should create getter function for the collection
    // TODO: Look at WebGPT "📖 Make Promptbook collection" and https://webgpt.cz/_promptbook-collection.json
    // TODO: !! Implement via createCollectionFromPromise
}

/**
 * TODO: !!!! [🧠] Library precompilation and do not mix markdown and json promptbooks
 */
