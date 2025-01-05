// ⚠️ WARNING: This code has been generated so that any manual changes will be overwritten
// `@promptbook/cli`

import { _CLI } from '../cli/main';
import { _AnthropicClaudeMetadataRegistration } from '../llm-providers/anthropic-claude/register-configuration';
import { _AnthropicClaudeRegistration } from '../llm-providers/anthropic-claude/register-constructor';
import { _AzureOpenAiMetadataRegistration } from '../llm-providers/azure-openai/register-configuration';
import { _AzureOpenAiRegistration } from '../llm-providers/azure-openai/register-constructor';
import { _GoogleMetadataRegistration } from '../llm-providers/google/register-configuration';
import { _GoogleRegistration } from '../llm-providers/google/register-constructor';
import {
    _OpenAiAssistantMetadataRegistration,
    _OpenAiMetadataRegistration,
} from '../llm-providers/openai/register-configuration';
import { _OpenAiAssistantRegistration, _OpenAiRegistration } from '../llm-providers/openai/register-constructor';
import { _LegacyDocumentScraperRegistration } from '../scrapers/document-legacy/register-constructor';
import { _LegacyDocumentScraperMetadataRegistration } from '../scrapers/document-legacy/register-metadata';
import { _DocumentScraperRegistration } from '../scrapers/document/register-constructor';
import { _DocumentScraperMetadataRegistration } from '../scrapers/document/register-metadata';
import { _MarkdownScraperRegistration } from '../scrapers/markdown/register-constructor';
import { _MarkdownScraperMetadataRegistration } from '../scrapers/markdown/register-metadata';
import { _PdfScraperRegistration } from '../scrapers/pdf/register-constructor';
import { _PdfScraperMetadataRegistration } from '../scrapers/pdf/register-metadata';
import { _WebsiteScraperRegistration } from '../scrapers/website/register-constructor';
import { _WebsiteScraperMetadataRegistration } from '../scrapers/website/register-metadata';
import { BOOK_LANGUAGE_VERSION, PROMPTBOOK_ENGINE_VERSION } from '../version';

// Note: Exporting version from each package
export { BOOK_LANGUAGE_VERSION, PROMPTBOOK_ENGINE_VERSION };

// Note: Entities of the `@promptbook/cli`
export {
    _AnthropicClaudeMetadataRegistration,
    _AnthropicClaudeRegistration,
    _AzureOpenAiMetadataRegistration,
    _AzureOpenAiRegistration,
    _CLI,
    _DocumentScraperMetadataRegistration,
    _DocumentScraperRegistration,
    _GoogleMetadataRegistration,
    _GoogleRegistration,
    _LegacyDocumentScraperMetadataRegistration,
    _LegacyDocumentScraperRegistration,
    _MarkdownScraperMetadataRegistration,
    _MarkdownScraperRegistration,
    _OpenAiAssistantMetadataRegistration,
    _OpenAiAssistantRegistration,
    _OpenAiMetadataRegistration,
    _OpenAiRegistration,
    _PdfScraperMetadataRegistration,
    _PdfScraperRegistration,
    _WebsiteScraperMetadataRegistration,
    _WebsiteScraperRegistration,
};
