import type { string_SCREAMING_CASE } from '../../../utils/normalization/normalizeTo_SCREAMING_CASE';
import type { string_markdown_text } from '../../../types/typeAliases';
import type { string_name } from '../../../types/typeAliases';

export type CommandParser<TCommand extends { type: string_name & string_SCREAMING_CASE }> = {
    name: string_name & string_SCREAMING_CASE;

    aliases?: Array<string_name & string_SCREAMING_CASE>;

    description: string_markdown_text;

    examples: Array<string_markdown_text>;

    /**
     * @throws {SyntaxError} if the parsing fails
     */
    parse(input: CommandParserInput): TCommand;
};

export type CommandParserInput = {
    raw: string_markdown_text;

    normalized: string_name & string_SCREAMING_CASE;

    args: Array<string_name & string_SCREAMING_CASE>;
};

/**
 * TODO: !!!! Annotate
 * TODO: [🧠] Maybe put flag if it is for whole `.ptbk.md` file of just one section
 */
