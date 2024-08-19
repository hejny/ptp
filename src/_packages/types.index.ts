// ⚠️ WARNING: This code has been generated so that any manual changes will be overwritten
// `@promptbook/types`

import type { PipelineCollection } from '../collection/PipelineCollection';
import type { Command } from '../commands/_common/types/Command';
import type { CommandParser } from '../commands/_common/types/CommandParser';
import type { CommandParserInput } from '../commands/_common/types/CommandParser';
import type { ApplyToPipelineJsonSubjects } from '../commands/_common/types/CommandParser';
import type { CommandUsagePlace } from '../commands/_common/types/CommandUsagePlaces';
import type { BlockType } from '../commands/BLOCK/BlockTypes';
import type { ExpectAmountCommand } from '../commands/EXPECT/ExpectAmountCommand';
import type { ExpectFormatCommand } from '../commands/EXPECT/ExpectFormatCommand';
import type { PipelineStringToJsonOptions } from '../conversion/pipelineStringToJson';
import type { PrettifyOptions } from '../conversion/prettify/PrettifyOptions';
import type { renderPipelineMermaidOptions } from '../conversion/prettify/renderPipelineMermaidOptions';
import type { AvailableModel } from '../execution/AvailableModel';
import type { CommonExecutionToolsOptions } from '../execution/CommonExecutionToolsOptions';
import type { EmbeddingVector } from '../execution/EmbeddingVector';
import type { ExecutionTools } from '../execution/ExecutionTools';
import type { LlmExecutionTools } from '../execution/LlmExecutionTools';
import type { LlmExecutionToolsConstructor } from '../execution/LlmExecutionToolsConstructor';
import type { PipelineExecutor } from '../execution/PipelineExecutor';
import type { PipelineExecutorResult } from '../execution/PipelineExecutor';
import type { PromptResult } from '../execution/PromptResult';
import type { CompletionPromptResult } from '../execution/PromptResult';
import type { ChatPromptResult } from '../execution/PromptResult';
import type { EmbeddingPromptResult } from '../execution/PromptResult';
import type { CommonPromptResult } from '../execution/PromptResult';
import type { PromptResultUsage } from '../execution/PromptResultUsage';
import type { PromptResultUsageCounts } from '../execution/PromptResultUsage';
import type { ScriptExecutionTools } from '../execution/ScriptExecutionTools';
import type { ScriptExecutionToolsExecuteOptions } from '../execution/ScriptExecutionTools';
import type { UncertainNumber } from '../execution/UncertainNumber';
import type { UserInterfaceTools } from '../execution/UserInterfaceTools';
import type { UserInterfaceToolsPromptDialogOptions } from '../execution/UserInterfaceTools';
import type { CallbackInterfaceToolsOptions } from '../knowledge/dialogs/callback/CallbackInterfaceToolsOptions';
import type { LlmToolsConfiguration } from '../llm-providers/_common/LlmToolsConfiguration';
import type { LlmToolsMetadata } from '../llm-providers/_common/LlmToolsMetadata';
import type { LlmToolsOptions } from '../llm-providers/_common/LlmToolsOptions';
import type { CacheItem } from '../llm-providers/_common/utils/cache/CacheItem';
import type { CacheLlmToolsOptions } from '../llm-providers/_common/utils/cache/CacheLlmToolsOptions';
import type { LlmExecutionToolsWithTotalUsage } from '../llm-providers/_common/utils/count-total-usage/LlmExecutionToolsWithTotalUsage';
import type { AnthropicClaudeExecutionToolsOptions } from '../llm-providers/anthropic-claude/AnthropicClaudeExecutionToolsOptions';
import type { AnthropicClaudeExecutionToolsDirectOptions } from '../llm-providers/anthropic-claude/AnthropicClaudeExecutionToolsOptions';
import type { AnthropicClaudeExecutionToolsProxiedOptions } from '../llm-providers/anthropic-claude/AnthropicClaudeExecutionToolsOptions';
import type { AzureOpenAiExecutionToolsOptions } from '../llm-providers/azure-openai/AzureOpenAiExecutionToolsOptions';
import type { LangtailExecutionToolsOptions } from '../llm-providers/langtail/LangtailExecutionToolsOptions';
import type { MultipleLlmExecutionTools } from '../llm-providers/multiple/MultipleLlmExecutionTools';
import type { OpenAiExecutionToolsOptions } from '../llm-providers/openai/OpenAiExecutionToolsOptions';
import type { PromptbookServer_Error } from '../llm-providers/remote/interfaces/PromptbookServer_Error';
import type { PromptbookServer_ListModels_Request } from '../llm-providers/remote/interfaces/PromptbookServer_ListModels_Request';
import type { PromptbookServer_ListModels_CollectionRequest } from '../llm-providers/remote/interfaces/PromptbookServer_ListModels_Request';
import type { PromptbookServer_ListModels_AnonymousRequest } from '../llm-providers/remote/interfaces/PromptbookServer_ListModels_Request';
import type { PromptbookServer_ListModels_Response } from '../llm-providers/remote/interfaces/PromptbookServer_ListModels_Response';
import type { PromptbookServer_Prompt_Progress } from '../llm-providers/remote/interfaces/PromptbookServer_Prompt_Progress';
import type { PromptbookServer_Prompt_Request } from '../llm-providers/remote/interfaces/PromptbookServer_Prompt_Request';
import type { PromptbookServer_Prompt_CollectionRequest } from '../llm-providers/remote/interfaces/PromptbookServer_Prompt_Request';
import type { PromptbookServer_Prompt_AnonymousRequest } from '../llm-providers/remote/interfaces/PromptbookServer_Prompt_Request';
import type { PromptbookServer_Prompt_Response } from '../llm-providers/remote/interfaces/PromptbookServer_Prompt_Response';
import type { RemoteLlmExecutionToolsOptions } from '../llm-providers/remote/interfaces/RemoteLlmExecutionToolsOptions';
import type { RemoteServerOptions } from '../llm-providers/remote/interfaces/RemoteServerOptions';
import type { AnonymousRemoteServerOptions } from '../llm-providers/remote/interfaces/RemoteServerOptions';
import type { CollectionRemoteServerOptions } from '../llm-providers/remote/interfaces/RemoteServerOptions';
import type { PrepareOptions } from '../prepare/PrepareOptions';
import type { JavascriptExecutionToolsOptions } from '../scripting/javascript/JavascriptExecutionToolsOptions';
import type { PostprocessingFunction } from '../scripting/javascript/JavascriptExecutionToolsOptions';
import type { PromptbookStorage } from '../storage/_common/PromptbookStorage';
import type { FilesStorageOptions } from '../storage/files-storage/FilesStorageOptions';
import type { ExecutionReportJson } from '../types/execution-report/ExecutionReportJson';
import type { ExecutionReportString } from '../types/execution-report/ExecutionReportString';
import type { ExecutionReportStringOptions } from '../types/execution-report/ExecutionReportStringOptions';
import type { ModelRequirements } from '../types/ModelRequirements';
import type { CompletionModelRequirements } from '../types/ModelRequirements';
import type { ChatModelRequirements } from '../types/ModelRequirements';
import type { EmbeddingModelRequirements } from '../types/ModelRequirements';
import type { CommonModelRequirements } from '../types/ModelRequirements';
import type { ModelVariant } from '../types/ModelVariant';
import type { Expectations } from '../types/PipelineJson/Expectations';
import type { ExpectationUnit } from '../types/PipelineJson/Expectations';
import type { ExpectationAmount } from '../types/PipelineJson/Expectations';
import type { KnowledgePiecePreparedJson } from '../types/PipelineJson/KnowledgePieceJson';
import type { KnowledgeSourceJson } from '../types/PipelineJson/KnowledgeSourceJson';
import type { KnowledgeSourcePreparedJson } from '../types/PipelineJson/KnowledgeSourceJson';
import type { LlmTemplateJson } from '../types/PipelineJson/LlmTemplateJson';
import type { PersonaJson } from '../types/PipelineJson/PersonaJson';
import type { PersonaPreparedJson } from '../types/PipelineJson/PersonaJson';
import type { PipelineJson } from '../types/PipelineJson/PipelineJson';
import type { PreparationJson } from '../types/PipelineJson/PreparationJson';
import type { PromptDialogJson } from '../types/PipelineJson/PromptDialogJson';
import type { PromptTemplateJson } from '../types/PipelineJson/PromptTemplateJson';
import type { PromptTemplateJsonCommon } from '../types/PipelineJson/PromptTemplateJsonCommon';
import type { PromptTemplateParameterJson } from '../types/PipelineJson/PromptTemplateParameterJson';
import type { ScriptJson } from '../types/PipelineJson/ScriptJson';
import type { SimpleTemplateJson } from '../types/PipelineJson/SimpleTemplateJson';
import type { PipelineString } from '../types/PipelineString';
import type { Prompt } from '../types/Prompt';
import type { CompletionPrompt } from '../types/Prompt';
import type { ChatPrompt } from '../types/Prompt';
import type { EmbeddingPrompt } from '../types/Prompt';
import type { CommonPrompt } from '../types/Prompt';
import type { ScriptLanguage } from '../types/ScriptLanguage';
import type { TaskProgress } from '../types/TaskProgress';
import type { string_char_emoji } from '../types/typeAliasEmoji';
import type { string_business_category_name } from '../types/typeAliases';
import type { string_model_name } from '../types/typeAliases';
import type { string_prompt } from '../types/typeAliases';
import type { string_template } from '../types/typeAliases';
import type { string_text_prompt } from '../types/typeAliases';
import type { string_chat_prompt } from '../types/typeAliases';
import type { string_system_message } from '../types/typeAliases';
import type { string_completion_prompt } from '../types/typeAliases';
import type { string_page } from '../types/typeAliases';
import type { string_mime_type } from '../types/typeAliases';
import type { string_mime_type_with_wildcard } from '../types/typeAliases';
import type { string_char } from '../types/typeAliases';
import type { string_name } from '../types/typeAliases';
import type { string_parameter_name } from '../types/typeAliases';
import type { string_parameter_value } from '../types/typeAliases';
import type { Parameters } from '../types/typeAliases';
import type { string_reserved_parameter_name } from '../types/typeAliases';
import type { ReservedParameters } from '../types/typeAliases';
import type { string_title } from '../types/typeAliases';
import type { string_persona_description } from '../types/typeAliases';
import type { string_knowledge_source_content } from '../types/typeAliases';
import type { string_knowledge_source_link } from '../types/typeAliases';
import type { string_html } from '../types/typeAliases';
import type { string_xml } from '../types/typeAliases';
import type { string_markdown } from '../types/typeAliases';
import type { string_markdown_section } from '../types/typeAliases';
import type { string_markdown_section_content } from '../types/typeAliases';
import type { string_markdown_text } from '../types/typeAliases';
import type { string_promptbook_documentation_url } from '../types/typeAliases';
import type { string_domain } from '../types/typeAliases';
import type { string_tdl } from '../types/typeAliases';
import type { string_css } from '../types/typeAliases';
import type { string_svg } from '../types/typeAliases';
import type { string_script } from '../types/typeAliases';
import type { string_javascript } from '../types/typeAliases';
import type { string_json } from '../types/typeAliases';
import type { string_css_class } from '../types/typeAliases';
import type { string_css_property } from '../types/typeAliases';
import type { string_css_value } from '../types/typeAliases';
import type { string_css_selector } from '../types/typeAliases';
import type { string_url } from '../types/typeAliases';
import type { string_base_url } from '../types/typeAliases';
import type { string_pipeline_url } from '../types/typeAliases';
import type { string_pipeline_url_with_hashtemplate } from '../types/typeAliases';
import type { string_data_url } from '../types/typeAliases';
import type { string_base64 } from '../types/typeAliases';
import type { string_href } from '../types/typeAliases';
import type { string_url_image } from '../types/typeAliases';
import type { string_uri } from '../types/typeAliases';
import type { string_uri_part } from '../types/typeAliases';
import type { string_uriid } from '../types/typeAliases';
import type { string_hostname } from '../types/typeAliases';
import type { string_host } from '../types/typeAliases';
import type { string_protocol } from '../types/typeAliases';
import type { string_email } from '../types/typeAliases';
import type { string_emails } from '../types/typeAliases';
import type { string_uuid } from '../types/typeAliases';
import type { client_id } from '../types/typeAliases';
import type { string_sha256 } from '../types/typeAliases';
import type { string_semantic_version } from '../types/typeAliases';
import type { string_version_dependency } from '../types/typeAliases';
import type { string_file_extension } from '../types/typeAliases';
import type { string_file_absolute_path } from '../types/typeAliases';
import type { string_file_relative_path } from '../types/typeAliases';
import type { string_file_path } from '../types/typeAliases';
import type { string_folder_absolute_path } from '../types/typeAliases';
import type { string_folder_relative_path } from '../types/typeAliases';
import type { string_folder_path } from '../types/typeAliases';
import type { string_filename } from '../types/typeAliases';
import type { string_person_fullname } from '../types/typeAliases';
import type { string_person_profile } from '../types/typeAliases';
import type { string_license } from '../types/typeAliases';
import type { string_attribute } from '../types/typeAliases';
import type { string_attribute_value_scope } from '../types/typeAliases';
import type { string_color } from '../types/typeAliases';
import type { string_translate_name } from '../types/typeAliases';
import type { string_translate_name_not_normalized } from '../types/typeAliases';
import type { string_translate_language } from '../types/typeAliases';
import type { string_javascript_name } from '../types/typeAliases';
import type { string_token } from '../types/typeAliases';
import type { string_license_token } from '../types/typeAliases';
import type { string_password } from '../types/typeAliases';
import type { string_ssh_key } from '../types/typeAliases';
import type { string_pgp_key } from '../types/typeAliases';
import type { string_date_iso8601 } from '../types/typeAliases';
import type { number_usd } from '../types/typeAliases';
import type { number_id } from '../types/typeAliases';
import type { number_linecol_number } from '../types/typeAliases';
import type { number_tokens } from '../types/typeAliases';
import type { number_positive } from '../types/typeAliases';
import type { number_negative } from '../types/typeAliases';
import type { number_integer } from '../types/typeAliases';
import type { number_percent } from '../types/typeAliases';
import type { number_model_temperature } from '../types/typeAliases';
import type { number_seed } from '../types/typeAliases';
import type { number_likeness } from '../types/typeAliases';
import type { number_miliseconds } from '../types/typeAliases';
import type { number_seconds } from '../types/typeAliases';
import type { number_minutes } from '../types/typeAliases';
import type { number_hours } from '../types/typeAliases';
import type { number_days } from '../types/typeAliases';
import type { number_weeks } from '../types/typeAliases';
import type { number_months } from '../types/typeAliases';
import type { number_years } from '../types/typeAliases';
import type { number_bytes } from '../types/typeAliases';
import type { number_kilobytes } from '../types/typeAliases';
import type { number_megabytes } from '../types/typeAliases';
import type { number_gigabytes } from '../types/typeAliases';
import type { number_terabytes } from '../types/typeAliases';
import type { Registered } from '../utils/$Register';
import type { FromtoItems } from '../utils/FromtoItems';
import type { CodeBlock } from '../utils/markdown/extractAllBlocksFromMarkdown';
import type { MarkdownSection } from '../utils/markdown/parseMarkdownSection';
import type { string_keyword } from '../utils/normalization/IKeywords';
import type { IKeywords } from '../utils/normalization/IKeywords';
import type { string_kebab_case } from '../utils/normalization/normalize-to-kebab-case';
import type { string_camelCase } from '../utils/normalization/normalizeTo_camelCase';
import type { string_PascalCase } from '../utils/normalization/normalizeTo_PascalCase';
import type { string_SCREAMING_CASE } from '../utils/normalization/normalizeTo_SCREAMING_CASE';
import type { string_snake_case } from '../utils/normalization/normalizeTo_snake_case';
import type { really_any } from '../utils/organization/really_any';
import type { TODO_any } from '../utils/organization/TODO_any';
import type { string_promptbook_version } from '../version';

// Note: Entities of the `@promptbook/types`
export type { PipelineCollection };
export type { Command };
export type { CommandParser };
export type { CommandParserInput };
export type { ApplyToPipelineJsonSubjects };
export type { CommandUsagePlace };
export type { BlockType };
export type { ExpectAmountCommand };
export type { ExpectFormatCommand };
export type { PipelineStringToJsonOptions };
export type { PrettifyOptions };
export type { renderPipelineMermaidOptions };
export type { AvailableModel };
export type { CommonExecutionToolsOptions };
export type { EmbeddingVector };
export type { ExecutionTools };
export type { LlmExecutionTools };
export type { LlmExecutionToolsConstructor };
export type { PipelineExecutor };
export type { PipelineExecutorResult };
export type { PromptResult };
export type { CompletionPromptResult };
export type { ChatPromptResult };
export type { EmbeddingPromptResult };
export type { CommonPromptResult };
export type { PromptResultUsage };
export type { PromptResultUsageCounts };
export type { ScriptExecutionTools };
export type { ScriptExecutionToolsExecuteOptions };
export type { UncertainNumber };
export type { UserInterfaceTools };
export type { UserInterfaceToolsPromptDialogOptions };
export type { CallbackInterfaceToolsOptions };
export type { LlmToolsConfiguration };
export type { LlmToolsMetadata };
export type { LlmToolsOptions };
export type { CacheItem };
export type { CacheLlmToolsOptions };
export type { LlmExecutionToolsWithTotalUsage };
export type { AnthropicClaudeExecutionToolsOptions };
export type { AnthropicClaudeExecutionToolsDirectOptions };
export type { AnthropicClaudeExecutionToolsProxiedOptions };
export type { AzureOpenAiExecutionToolsOptions };
export type { LangtailExecutionToolsOptions };
export type { MultipleLlmExecutionTools };
export type { OpenAiExecutionToolsOptions };
export type { PromptbookServer_Error };
export type { PromptbookServer_ListModels_Request };
export type { PromptbookServer_ListModels_CollectionRequest };
export type { PromptbookServer_ListModels_AnonymousRequest };
export type { PromptbookServer_ListModels_Response };
export type { PromptbookServer_Prompt_Progress };
export type { PromptbookServer_Prompt_Request };
export type { PromptbookServer_Prompt_CollectionRequest };
export type { PromptbookServer_Prompt_AnonymousRequest };
export type { PromptbookServer_Prompt_Response };
export type { RemoteLlmExecutionToolsOptions };
export type { RemoteServerOptions };
export type { AnonymousRemoteServerOptions };
export type { CollectionRemoteServerOptions };
export type { PrepareOptions };
export type { JavascriptExecutionToolsOptions };
export type { PostprocessingFunction };
export type { PromptbookStorage };
export type { FilesStorageOptions };
export type { ExecutionReportJson };
export type { ExecutionReportString };
export type { ExecutionReportStringOptions };
export type { ModelRequirements };
export type { CompletionModelRequirements };
export type { ChatModelRequirements };
export type { EmbeddingModelRequirements };
export type { CommonModelRequirements };
export type { ModelVariant };
export type { Expectations };
export type { ExpectationUnit };
export type { ExpectationAmount };
export type { KnowledgePiecePreparedJson };
export type { KnowledgeSourceJson };
export type { KnowledgeSourcePreparedJson };
export type { LlmTemplateJson };
export type { PersonaJson };
export type { PersonaPreparedJson };
export type { PipelineJson };
export type { PreparationJson };
export type { PromptDialogJson };
export type { PromptTemplateJson };
export type { PromptTemplateJsonCommon };
export type { PromptTemplateParameterJson };
export type { ScriptJson };
export type { SimpleTemplateJson };
export type { PipelineString };
export type { Prompt };
export type { CompletionPrompt };
export type { ChatPrompt };
export type { EmbeddingPrompt };
export type { CommonPrompt };
export type { ScriptLanguage };
export type { TaskProgress };
export type { string_char_emoji };
export type { string_business_category_name };
export type { string_model_name };
export type { string_prompt };
export type { string_template };
export type { string_text_prompt };
export type { string_chat_prompt };
export type { string_system_message };
export type { string_completion_prompt };
export type { string_page };
export type { string_mime_type };
export type { string_mime_type_with_wildcard };
export type { string_char };
export type { string_name };
export type { string_parameter_name };
export type { string_parameter_value };
export type { Parameters };
export type { string_reserved_parameter_name };
export type { ReservedParameters };
export type { string_title };
export type { string_persona_description };
export type { string_knowledge_source_content };
export type { string_knowledge_source_link };
export type { string_html };
export type { string_xml };
export type { string_markdown };
export type { string_markdown_section };
export type { string_markdown_section_content };
export type { string_markdown_text };
export type { string_promptbook_documentation_url };
export type { string_domain };
export type { string_tdl };
export type { string_css };
export type { string_svg };
export type { string_script };
export type { string_javascript };
export type { string_json };
export type { string_css_class };
export type { string_css_property };
export type { string_css_value };
export type { string_css_selector };
export type { string_url };
export type { string_base_url };
export type { string_pipeline_url };
export type { string_pipeline_url_with_hashtemplate };
export type { string_data_url };
export type { string_base64 };
export type { string_href };
export type { string_url_image };
export type { string_uri };
export type { string_uri_part };
export type { string_uriid };
export type { string_hostname };
export type { string_host };
export type { string_protocol };
export type { string_email };
export type { string_emails };
export type { string_uuid };
export type { client_id };
export type { string_sha256 };
export type { string_semantic_version };
export type { string_version_dependency };
export type { string_file_extension };
export type { string_file_absolute_path };
export type { string_file_relative_path };
export type { string_file_path };
export type { string_folder_absolute_path };
export type { string_folder_relative_path };
export type { string_folder_path };
export type { string_filename };
export type { string_person_fullname };
export type { string_person_profile };
export type { string_license };
export type { string_attribute };
export type { string_attribute_value_scope };
export type { string_color };
export type { string_translate_name };
export type { string_translate_name_not_normalized };
export type { string_translate_language };
export type { string_javascript_name };
export type { string_token };
export type { string_license_token };
export type { string_password };
export type { string_ssh_key };
export type { string_pgp_key };
export type { string_date_iso8601 };
export type { number_usd };
export type { number_id };
export type { number_linecol_number };
export type { number_tokens };
export type { number_positive };
export type { number_negative };
export type { number_integer };
export type { number_percent };
export type { number_model_temperature };
export type { number_seed };
export type { number_likeness };
export type { number_miliseconds };
export type { number_seconds };
export type { number_minutes };
export type { number_hours };
export type { number_days };
export type { number_weeks };
export type { number_months };
export type { number_years };
export type { number_bytes };
export type { number_kilobytes };
export type { number_megabytes };
export type { number_gigabytes };
export type { number_terabytes };
export type { Registered };
export type { FromtoItems };
export type { CodeBlock };
export type { MarkdownSection };
export type { string_keyword };
export type { IKeywords };
export type { string_kebab_case };
export type { string_camelCase };
export type { string_PascalCase };
export type { string_SCREAMING_CASE };
export type { string_snake_case };
export type { really_any };
export type { TODO_any };
export type { string_promptbook_version };
