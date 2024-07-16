import type { LlmExecutionTools } from '../../execution/LlmExecutionTools';
import type { string_markdown, string_markdown_text, string_title } from '../../types/typeAliases';
import { OpenAiExecutionTools } from '../openai/OpenAiExecutionTools';

/**
 * Execution Tools for calling OpenAI API.
 */
export class LangtailExecutionTools extends OpenAiExecutionTools implements LlmExecutionTools {
    // TODO: [🦻] Implement

    public get title(): string_title & string_markdown_text {
        return 'Langtail';
    }

    public get description(): string_markdown {
        return 'Use Langtail API';
    }
}
