import type { CommonExecutionToolsOptions } from '../../../execution/CommonExecutionToolsOptions';
import type { AvailableModel } from '../../../execution/LlmExecutionTools';
import type { client_id } from '../../../types/typeAliases';
import type { string_base_url } from '../../../types/typeAliases';
import type { string_uri } from '../../../types/typeAliases';
import type { LlmToolsConfiguration } from '../../_common/LlmToolsConfiguration';

/**
 * Options for `RemoteLlmExecutionTools`
 *
 * @public exported from `@promptbook/remote-client`
 */
export type RemoteLlmExecutionToolsOptions = CommonExecutionToolsOptions & {
    /**
     * URL of the remote PROMPTBOOK server
     * On this server will be connected to the socket.io server
     */
    readonly remoteUrl: string_base_url;

    /**
     * Path for the Socket.io server to listen
     *
     * @default '/socket.io'
     * @example '/promptbook/socket.io'
     */
    readonly path: string_uri;

    /**
     * If set, only these models will be listed as available
     *
     * TODO: [🧠] !!!! Figure out better solution
     */
    readonly models?: Array<AvailableModel>;

    /**
     * Mode of the server to connect to
     */
    isAnonymous: boolean;
} & (
        | {
              /**
               * Use anonymous server with anonymous mode
               */
              isAnonymous: true;

              /**
               * Configuration for the LLM tools
               */
              readonly llmToolsConfiguration: LlmToolsConfiguration;
          }
        | {
              /**
               * Use anonymous server with client identification and fixed collection
               */
              isAnonymous: false;

              /**
               * Your client ID
               */
              readonly clientId: client_id;
          }
    );

/**
 * TODO: [🍜] !!!!!! Default remote remoteUrl and path for anonymous server
 */
