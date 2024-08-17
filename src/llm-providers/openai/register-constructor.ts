import { $llmToolsRegister } from '../_common/$llmToolsRegister';
import { createOpenAiExecutionTools } from './createOpenAiExecutionTools';

/**
 * @@@ registration2
 *
 * Note: [🏐] Configurations registrations are done in @@@ BUT constructor @@@
 *
 * @public exported from `@promptbook/openai`
 */
export const _OpenAiRegistration = $llmToolsRegister.register(createOpenAiExecutionTools);


/**
 * TODO: [🎶] Naming "constructor" vs "creator" vs "factory"
 */