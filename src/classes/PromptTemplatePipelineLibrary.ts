import { string_name } from '../../../../../../utils/typeAliases';
import { createPtpExecutor } from '../execution/createPtpExecutor';
import { ExecutionTools } from '../execution/ExecutionTools';
import { PtpExecutor } from '../execution/PtpExecutor';
import { Prompt } from '../types/Prompt';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

/**
 * Library of prompt template pipelines that groups together prompt template pipelines for an application. This is a very thin wrapper around the Array / Set of prompt template pipelines.
 *
 * Prompt Template Pipeline library is a useful helper in execution, it can be shared between execution and consumer parts of the app and make common knowledge about prompt template pipelines.
 *
 * It allows to create executor functions from prompt template pipelines in the library.
 *
 * @see https://github.com/webgptorg/ptp#prompt-template-pipeline-library
 */
export class PromptTemplatePipelineLibrary {
    /**
     * Constructs PromptTemplatePipeline from any sources
     *
     * Note: During the construction syntax and logic of all sources are validated
     * Note: You can combine .ptp.md and .ptp.json files BUT it is not recommended
     *
     * @param ptpSources contents of .ptp.md or .ptp.json files
     * @returns PromptTemplatePipelineLibrary
     */
    public static fromSources(
        ptpSources: Record<string_name, PromptTemplatePipelineJson | PromptTemplatePipelineString>,
    ): PromptTemplatePipelineLibrary {
        const promptTemplatePipelines: Record<string_name, PromptTemplatePipeline> = {};
        for (const [name, source] of Object.entries(ptpSources)) {
            promptTemplatePipelines[name] = PromptTemplatePipeline.fromSource(source);
        }
        return new PromptTemplatePipelineLibrary(promptTemplatePipelines);
    }

    private constructor(private readonly promptTemplatePipelines: Record<string_name, PromptTemplatePipeline>) {}

    /**
     * Gets prompt template pipeline by name
     */
    public getPtp(name: string_name): PromptTemplatePipeline {
        const promptTemplatePipeline = this.promptTemplatePipelines[name];
        if (!promptTemplatePipeline) {
            throw new Error(`Prompt template pipeline with name "${name}" not found`);
        }
        return promptTemplatePipeline;
    }

    /**
     * Checks whether prompt is in the library
     */
    public isPromptInLibrary(prompt: Prompt): boolean {
        // TODO: DO not hardcode this, really validate whether the prompt is in the library
        return true;
    }

    /**
     * Gets executor function for given prompt template pipeline
     */
    public createExecutor(name: string_name, tools: ExecutionTools): PtpExecutor {
        const ptp = this.getPtp(name);
        return createPtpExecutor({ ptp, tools });
    }
}

/**
 * TODO: Static method fromDirectory
 * TODO: [🤜] Add generic type for entry and result parameters
 * TODO: [🧠] Is it better to ptpLibrary.executePtp('writeXyz',{...}) OR ptpLibrary.createExecutor('writeXyz')({...}) OR createExecutor(ptpLibrary.getPtp('writeXyz'))
 * TODO: [🧠] Formarly (before commit 62229afce7668a5b85077cc18becf798b583bf8d) there were two classes PromptTemplatePipelineLibrary+PtpLibraryExecutor (maybe it was better?)
 * TODO: [🧠] Is it better to pass tools into getExecutor or into constructor
 *             Maybe it is not a good idea to cache executors when they are can be created with different tools
 * TODO: [👧] Strongly type the executors to avoid need of remove nullables whtn noUncheckedIndexedAccess in tsconfig.json
 */
