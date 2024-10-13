import type { string_name } from '../../types/typeAliases';
import { Registration } from '../../utils/$Register';
import { $llmToolsMetadataRegister } from '../_common/register/$llmToolsMetadataRegister';
import { LlmToolsConfiguration } from '../_common/register/LlmToolsConfiguration';

/**
 * @@@ registration1 of default configuration for Open AI
 *
 * Note: [🏐] Configurations registrations are done in @@@ BUT constructor @@@
 *
 * @public exported from `@promptbook/core`
 * @public exported from `@promptbook/cli`
 */
export const _OpenAiMetadataRegistration: Registration = $llmToolsMetadataRegister.register({
    title: 'Open AI',
    packageName: '@promptbook/openai',
    className: 'OpenAiExecutionTools',

    getBoilerplateConfiguration(): LlmToolsConfiguration[number] {
        return {
            title: 'Open AI (boilerplate)',
            packageName: '@promptbook/openai',
            className: 'OpenAiExecutionTools',
            options: {
                apiKey: 'sk-',
            },
        };
    },

    createConfigurationFromEnv(env: Record<string_name, string>): LlmToolsConfiguration[number] | null {
        if (typeof env.OPENAI_API_KEY === 'string') {
            return {
                title: 'Open AI (from env)',
                packageName: '@promptbook/openai',
                className: 'OpenAiExecutionTools',
                options: {
                    apiKey: process.env.OPENAI_API_KEY!,
                },
            };
        }

        return null;
    },
});
