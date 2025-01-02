// ⚠️ WARNING: This code has been generated so that any manual changes will be overwritten
// `@promptbook/utils`

import { BOOK_LANGUAGE_VERSION, PROMPTBOOK_ENGINE_VERSION } from '../version';
import { VALUE_STRINGS } from '../config';
import { SMALL_NUMBER } from '../config';
import { renderPromptbookMermaid } from '../conversion/prettify/renderPipelineMermaidOptions';
import { extractVariablesFromScript } from '../conversion/utils/extractVariablesFromScript';
import { deserializeError } from '../errors/utils/deserializeError';
import { serializeError } from '../errors/utils/serializeError';
import { forEachAsync } from '../execution/utils/forEachAsync';
import { isValidJsonString } from '../formats/json/utils/isValidJsonString';
import { $getCurrentDate } from '../utils/$getCurrentDate';
import { $isRunningInBrowser } from '../utils/environment/$isRunningInBrowser';
import { $isRunningInJest } from '../utils/environment/$isRunningInJest';
import { $isRunningInNode } from '../utils/environment/$isRunningInNode';
import { $isRunningInWebWorker } from '../utils/environment/$isRunningInWebWorker';
import { CHARACTERS_PER_STANDARD_LINE } from '../utils/expectation-counters/constants';
import { LINES_PER_STANDARD_PAGE } from '../utils/expectation-counters/constants';
import { countCharacters } from '../utils/expectation-counters/countCharacters';
import { countLines } from '../utils/expectation-counters/countLines';
import { countPages } from '../utils/expectation-counters/countPages';
import { countParagraphs } from '../utils/expectation-counters/countParagraphs';
import { splitIntoSentences } from '../utils/expectation-counters/countSentences';
import { countSentences } from '../utils/expectation-counters/countSentences';
import { countWords } from '../utils/expectation-counters/countWords';
import { CountUtils } from '../utils/expectation-counters/index';
import { capitalize } from '../utils/normalization/capitalize';
import { decapitalize } from '../utils/normalization/decapitalize';
import { DIACRITIC_VARIANTS_LETTERS } from '../utils/normalization/DIACRITIC_VARIANTS_LETTERS';
import type { string_keyword } from '../utils/normalization/IKeywords';
import type { Keywords } from '../utils/normalization/IKeywords';
import { isValidKeyword } from '../utils/normalization/isValidKeyword';
import { nameToUriPart } from '../utils/normalization/nameToUriPart';
import { nameToUriParts } from '../utils/normalization/nameToUriParts';
import type { string_kebab_case } from '../utils/normalization/normalize-to-kebab-case';
import { normalizeToKebabCase } from '../utils/normalization/normalize-to-kebab-case';
import type { string_camelCase } from '../utils/normalization/normalizeTo_camelCase';
import { normalizeTo_camelCase } from '../utils/normalization/normalizeTo_camelCase';
import type { string_PascalCase } from '../utils/normalization/normalizeTo_PascalCase';
import { normalizeTo_PascalCase } from '../utils/normalization/normalizeTo_PascalCase';
import type { string_SCREAMING_CASE } from '../utils/normalization/normalizeTo_SCREAMING_CASE';
import { normalizeTo_SCREAMING_CASE } from '../utils/normalization/normalizeTo_SCREAMING_CASE';
import { normalizeTo_snake_case } from '../utils/normalization/normalizeTo_snake_case';
import { normalizeWhitespaces } from '../utils/normalization/normalizeWhitespaces';
import { orderJson } from '../utils/normalization/orderJson';
import { parseKeywords } from '../utils/normalization/parseKeywords';
import { parseKeywordsFromString } from '../utils/normalization/parseKeywordsFromString';
import { removeDiacritics } from '../utils/normalization/removeDiacritics';
import { searchKeywords } from '../utils/normalization/searchKeywords';
import { titleToName } from '../utils/normalization/titleToName';
import { spaceTrim } from '../utils/organization/spaceTrim';
import { extractParameterNames } from '../utils/parameters/extractParameterNames';
import { numberToString } from '../utils/parameters/numberToString';
import { templateParameters } from '../utils/parameters/templateParameters';
import { valueToString } from '../utils/parameters/valueToString';
import { parseNumber } from '../utils/parseNumber';
import { $randomSeed } from '../utils/random/$randomSeed';
import { removeEmojis } from '../utils/removeEmojis';
import { removeQuotes } from '../utils/removeQuotes';
import { $deepFreeze } from '../utils/serialization/$deepFreeze';
import { checkSerializableAsJson } from '../utils/serialization/checkSerializableAsJson';
import { clonePipeline } from '../utils/serialization/clonePipeline';
import { deepClone } from '../utils/serialization/deepClone';
import { exportJson } from '../utils/serialization/exportJson';
import { isSerializableAsJson } from '../utils/serialization/isSerializableAsJson';
import { difference } from '../utils/sets/difference';
import { intersection } from '../utils/sets/intersection';
import { union } from '../utils/sets/union';
import { trimCodeBlock } from '../utils/trimCodeBlock';
import { trimEndOfCodeBlock } from '../utils/trimEndOfCodeBlock';
import { unwrapResult } from '../utils/unwrapResult';
import { isValidEmail } from '../utils/validators/email/isValidEmail';
import { isValidFilePath } from '../utils/validators/filePath/isValidFilePath';
import { isValidJavascriptName } from '../utils/validators/javascriptName/isValidJavascriptName';
import { isValidPromptbookVersion } from '../utils/validators/semanticVersion/isValidPromptbookVersion';
import { isValidSemanticVersion } from '../utils/validators/semanticVersion/isValidSemanticVersion';
import { isHostnameOnPrivateNetwork } from '../utils/validators/url/isHostnameOnPrivateNetwork';
import { isUrlOnPrivateNetwork } from '../utils/validators/url/isUrlOnPrivateNetwork';
import { isValidPipelineUrl } from '../utils/validators/url/isValidPipelineUrl';
import { isValidUrl } from '../utils/validators/url/isValidUrl';
import { isValidUuid } from '../utils/validators/uuid/isValidUuid';


// Note: Exporting version from each package
export { BOOK_LANGUAGE_VERSION, PROMPTBOOK_ENGINE_VERSION };


// Note: Entities of the `@promptbook/utils`
export { VALUE_STRINGS };
export { SMALL_NUMBER };
export { renderPromptbookMermaid };
export { extractVariablesFromScript };
export { deserializeError };
export { serializeError };
export { forEachAsync };
export { isValidJsonString };
export { $getCurrentDate };
export { $isRunningInBrowser };
export { $isRunningInJest };
export { $isRunningInNode };
export { $isRunningInWebWorker };
export { CHARACTERS_PER_STANDARD_LINE };
export { LINES_PER_STANDARD_PAGE };
export { countCharacters };
export { countLines };
export { countPages };
export { countParagraphs };
export { splitIntoSentences };
export { countSentences };
export { countWords };
export { CountUtils };
export { capitalize };
export { decapitalize };
export { DIACRITIC_VARIANTS_LETTERS };
export type { string_keyword };
export type { Keywords };
export { isValidKeyword };
export { nameToUriPart };
export { nameToUriParts };
export type { string_kebab_case };
export { normalizeToKebabCase };
export type { string_camelCase };
export { normalizeTo_camelCase };
export type { string_PascalCase };
export { normalizeTo_PascalCase };
export type { string_SCREAMING_CASE };
export { normalizeTo_SCREAMING_CASE };
export { normalizeTo_snake_case };
export { normalizeWhitespaces };
export { orderJson };
export { parseKeywords };
export { parseKeywordsFromString };
export { removeDiacritics };
export { searchKeywords };
export { titleToName };
export { spaceTrim };
export { extractParameterNames };
export { numberToString };
export { templateParameters };
export { valueToString };
export { parseNumber };
export { $randomSeed };
export { removeEmojis };
export { removeQuotes };
export { $deepFreeze };
export { checkSerializableAsJson };
export { clonePipeline };
export { deepClone };
export { exportJson };
export { isSerializableAsJson };
export { difference };
export { intersection };
export { union };
export { trimCodeBlock };
export { trimEndOfCodeBlock };
export { unwrapResult };
export { isValidEmail };
export { isValidFilePath };
export { isValidJavascriptName };
export { isValidPromptbookVersion };
export { isValidSemanticVersion };
export { isHostnameOnPrivateNetwork };
export { isUrlOnPrivateNetwork };
export { isValidPipelineUrl };
export { isValidUrl };
export { isValidUuid };
