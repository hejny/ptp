import { Registration } from '../../utils/$Register';
import { $llmToolsRegister } from '../_common/register/$llmToolsRegister';
import { createAzureOpenAiExecutionTools } from './createAzureOpenAiExecutionTools';

/**
 * @@@ registration2
 *
 * Note: [🏐] Configurations registrations are done in @@@ BUT constructor @@@
 *
 * @public exported from `@promptbook/azure-openai`
 * @public exported from `@promptbook/cli`
 */
export const _AzureOpenAiRegistration: Registration = $llmToolsRegister.register(createAzureOpenAiExecutionTools);

/**
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */
