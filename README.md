# 🌠 Prompt template pipelines

Library to supercharge your use of large language models

<!--Badges-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/800-badges/badges.ts so every manual change will be overwritten.-->

[![License of 🌠 Prompt template pipelines](https://img.shields.io/github/license/hejny/ptp.svg?style=flat)](https://github.com/hejny/ptp/blob/main/LICENSE)
[![NPM Version of 🌠 Prompt template pipelines](https://badge.fury.io/js/ptp.svg)](https://www.npmjs.com/package/ptp)
[![Quality of package 🌠 Prompt template pipelines](https://packagequality.com/shield/ptp.svg)](https://packagequality.com/#?package=ptp)
[![Known Vulnerabilities](https://snyk.io/test/github/hejny/ptp/badge.svg)](https://snyk.io/test/github/hejny/ptp)
[![Issues](https://img.shields.io/github/issues/hejny/ptp.svg?style=flat)](https://github.com/hejny/ptp/issues)

<!--/Badges-->

## Concept

When you have a simple single prompt in GPT / ChatGPT, it doesn't matter how it is integrated, whether it's direct calling of Rest API or using Open Ai library and hardcoding prompt in source code or importing text file.

If you need something more advanced or want to extend the capabilities of LLMs, you generally have 3 ways to come:

1. **Fine-tune** the model to your perfection or even train your own.
2. **Tune** the prompt to your perfection
3. Use **multishot** approach with multiple prompts to get the best result

In any of these situations, this library can make your life easier:

-   **Separation of concerns** between prompt engineer and programmer; between code files and prompt files; and between prompts, templates, templating pipelines, and their execution logic.
-   Set up a **common format** for prompts that is interchangeable between project and language/technology stacks.
-   Simplify your code to be **DRY** and not repeat all the boilerplate code for each prompt.
-   **Versioning** of prompt template pipelines
-   **Reuse** parts of prompt template pipelines in/between projects
-   **Logging** the results of the prompt template pipelines
-   **Caching** calls to LLMs to save money and time
-   **A/B testing** to determine which prompt works best for the job
-   Leverage the **streaming** to make super cool UI/UX

## Prompt template pipelines _(for prompt-engeneers)_

_(TODO: Write this section)_:

```markdown
# 👁‍🗨 Language Capabilities

Trying the language capabilities of GPT models.

## Synonym

Write synonym for "{word}"

-> removeQuotes -> {wordSynonym}

## Sentence with Synonym

Write sentence with "{word}" and "{wordSynonym}" in it

-> {sentenceWithTwoSynonyms}

## Sentence without original word

Remove word "{word}" from sentence and modify it so that it makes sense:

### Rules:

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

#### The Sentence:

> {sentenceWithTwoSynonyms}

-> {sentenceWithOriginalWordRemoved}

## Comparison

### Requirements:

-   Use GPT-4

---

Compare meaning of thee two sentences:

### Sentence 1:

> {sentenceWithTwoSynonyms}

### Sentence 2:

> {sentenceWithOriginalWordRemoved}

-> {comparisonOfTwoSentences}
```

## Dictionary

Following dictionary is used to make certain basic concepts more clear:

### Prompt

Prompt in one text together with model requirements but without any execution or templating logic.
It can be for example:

```json
{
    "request": "Which sound does a cat make?",
    "modelRequirements": {
        "variant": "CHAT"
    }
}
```

```json
{
    "request": "I am a cat.\nI like to eat fish.\nI like to sleep.\nI like to play with a ball.\nI l",
    "modelRequirements": {
        "variant": "COMPLETION"
    }
}
```

### Prompt Template

Simmilar concept as prompt but with templating logic. It can be for example:

```json
{
    "request": "Which sound does a {animalName} make?",
    "modelRequirements": {
        "variant": "CHAT"
    }
}
```

### Model Requirements

Abstract way how to specify the LLM.
It does not specify the LLM itself but only the requirements for the LLM.
_Like NOT chatgpt-3.5-turbo but CHAT variant of GPT-3._

### Prompt Template Params

Parameters which are placed in prompt template and are replaced to create the prompt.
It is simple key-value object.

```json
{
    "animalName": "cat",
    "animalSound": "Meow!"
}
```

There are three types of template params according to their usage in prompt template pipeline:

-   **Entry params** a
-   **Internal params**
-   **Result params**

### Prompt Template Pipeline

Prompt template pipeline is core concept of this library.
It represents series of prompt templates chained together together forming a pipeline / one big prompt template with entry and result params.

Internally it can have 3 formats:

-   **.ptp.md file** in customized markdown format
-   **JSON** format which is parsed from .ptp.md file
-   **Object** which is created from JSON format and binded with tools around (but not the execution logic)

### Prompt Template Pipeline **Library**

Library of prompt template pipelines which groups together prompt template pipelines for one app.
This is a very thin wrapper around the Array/Set of prompt template pipelines.

Prompt Template Pipeline library is useful helper in execution, it can be shared between execution and consumer parts of the app and make common knowledge about prompt template pipelines.

### Prompt Result

Prompt result is simplest concept of execution.
It is result of one prompt (NOT template) execution.

For example:

```json
{
    "response": "Meow!",
    "model": "chatgpt-3.5-turbo"
}
```

### Execution Tools

Execution tools is container for all tools needed for execution of prompts (template pipelines).
On its interface it exposes common methods for prompt execution.
On inside (in constructor) it calls OpenAI, Azure, GPU, proxy, cache, logging,...

Execution tools is abstract interface which is implemented by concrete execution tools:

-   `OpenAiExecutionTools`
-   `AzureOpenAiExecutionTools`
-   `BardExecutionTools`
-   `LamaExecutionTools`
-   `GpuExecutionTools`
-   And special case are `RemoteExecutionTools` which are connected to remote server and on that server is executed one of the above execution tools.

### Executor

Executor is simple async function which takes entry params and returns result params (together with all internal params and entry paramsm = it extends input object).

Executor is made by joining together execution tools and prompt template pipeline library.
It can be done two ways:

-   From `PromptTemplatePipelineLibrary.getExecutor` method
-   `createPtpExecutor` utility function

### Remote server

Remote server is proxy server which internally uses its execution tools and on outside it exposes executor interface.

You can use RemoteExecutionTools simply on client-side javascript and connect to remote server.
This is useful to make all logic on browser-side but not expose your API keys or no need for utilizing customers GPU.

## Usage and integration _(for developers)_

First you need to install this library:

```bash
npm install --save @gptp/core
```

_(TODO: Write this section)_

## FAQ

If you have a question [start a discussion](https://github.com/hejny/ptp/discussions/), [open an issue](https://github.com/hejny/ptp/issues) or [write me an email](https://www.pavolhejny.com/contact).

### Why not just use OpenAI library?

Different levels of abstraction. OpenAI library is for direct usage of OpenAI API. This library is for higher level of abstraction. It is for creating prompt templates and prompt template pipelines which are indipedent on the underlying library, LLM model or even LLM provider.

### How it different from Langchain library?

Langchain is primarly focued on ML engeneers working in python. This library is for developers working in javascript/typescript creating applications for end users.

We are considering to create a bridge/convertor between these two libraries.

<!--
Include:
- jde naprosto hlavně o python knihovnu a JavaScript je tam na druhém místě
- je zaměřený primárně na dělání templates ne na spojování templates do větších struktur
- na úrovni jazyka rozlišuje chat a completion, já potřebuji tyhle dvě věci mixovat do jedné template pipeline
- pro neprogramátora je docela těžké s takovou věcí pracovat a template psát- já bych měl mnohem radši systém který umožňuje psát šablony i pro netechnické lidi ( kterých je na trhu mnohem více než volných pythonistů)
- Focus mého projektu je primárně zaměřený na budování uživatelských aplikací, nepředgenerovávání, zpracování dat, tréning či autogpt.
-->

## TODOs

-   [ ] !! Make this working as external library
-   [ ] [🧠] Figure out the best name for this library - `Prompt Template Pipeline`, `Prompt Template Engine`, `Prompt Template Processor`, `Open Prompt Initiative`
-   [ ] Export all promptTemplatePipeline as ptp alias from library
-   [ ] Make from this folder a separate repository + npm package
-   [ ] Add tests
-   [ ] Annotate all entities
-   [ ] Make internal string aliases
-   [ ] Make branded types instead of pure `string` aliases
-   [ ] Remove all anys
-   [ ] Make PTP non-linear
-   [ ] Logging pipeline name, version, step,...
-   [ ] No circular dependencies
-   [ ][🧠] Wording: "param" vs "parameter" vs "variable" vs "argument"
-   [ ] All entities must have public / private / protected modifiers
-   [ ] Everything not needed should be private or not exported
-   [ ] Refactor circular dependencies
-   [ ] Importing subtemplates
-   [ ] Use spaceTrim more effectively
-   [ ][🧠] Figure out best word for "entry" and "result" params
-   [ ] [🤹‍♂️] Allow chats to be continued with previous message
-   [ ] [🧠][🤹‍♂️] How to mark continued chat in .ptp.md format?
-   [ ] Use newest version of socket.io for remote server
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx

```

```

<!--Contributing-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/810-contributing/contributing.ts so every manual change will be overwritten.-->

## 🖋️ Contributing

I am open to pull requests, feedback, and suggestions. Or if you like this utility, you can [☕ buy me a coffee](https://www.buymeacoffee.com/hejny) or [donate via cryptocurrencies](https://github.com/hejny/hejny/blob/main/documents/crypto.md).

You can also ⭐ star the ptp package, [follow me on GitHub](https://github.com/hejny) or [various other social networks](https://www.pavolhejny.com/contact/).

<!--/Contributing-->

<!--Partners-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/820-partners/partners.ts so every manual change will be overwritten.-->

## ✨ Partners

<a href="https://collboard.com/">
  <img src="https://collboard.fra1.cdn.digitaloceanspaces.com/assets/18.12.1/logo-small.png" alt="Collboard logo" width="50"  />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://czech.events/">
  <img src="https://czech.events/design/logos/czech.events.transparent-logo.png" alt="Czech.events logo" width="50"  />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://sigmastamp.ml/">
  <img src="https://www.sigmastamp.ml/sigmastamp-logo.white.svg" alt="SigmaStamp logo" width="50"  />
</a>

[Become a partner](https://www.pavolhejny.com/contact/)

<!--/Partners-->
