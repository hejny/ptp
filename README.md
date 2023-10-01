# 🌠 Prompt template pipelines

Library to supercharge your use of large language models

## Concept

When you have simple sigle prompt into GPT / ChatGPT, It Just doesn't matter how it is integrated Wheather It's Direct calling of Rest API or using Open Ai library and hardcoding prompt in the source code or importing text file.

When you need Something more advanced or Scale up The capabilities of the LLMs, you have in general 3 Ways to come:

1. **finetune** the model to your perfection or even train your own
2. **prompt tuning** the prompt to your perfection
3. **multishot** using multiple prompts to get the best result

With each of this situations this library can make your life easier:

-   **Separation of concerns** between prompt engineer and programmer; between code files and prompt files and between prompts, templates, templating pipelines and its execution logic
-   **Versioning** of the prompt templates and prompt template pipelines
-   **Sharing** of the prompt templates and prompt template pipelines
-   **Reusability** of the prompt templates and prompt template pipelines
-   **Logging** the results of the prompt template pipelines
-   **A/B testing** witch prompt works best for job
-   setting up some **common format** for prompts which is interchangable between Project and language/technology stacks
-   **Simply your code** to be **DRY** and not repeat all the boilerplate code for each prompt
-   Leverage the **streaming** to make supercool UI/UX

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

_(TODO: Write this section)_

### Prompt

_(TODO: Write this section)_

### Prompt Template

_(TODO: Write this section)_

### Model Requirements

Connected with each prompt template
_(TODO: Write this section)_

### Prompt Template Params

_(TODO: Write this section)_

### Prompt Template Pipeline

_(TODO: Write this section)_

it can have 3 formats:

-   `.ptp.md` - markdown format
-   `.ptp.json` - json format
-   **object**

### Prompt Template Pipeline **Library**

_(TODO: Write this section)_

### Prompt Result

_(TODO: Write this section)_

### Execution Tools

_(TODO: Write this section)_

OpenAiExecutionTools, AzureOpenAiExecutionTools, BardExecutionTools, LamaExecutionTools
and special case are RemoteExecutionTools

### Executor

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

### Xxxxx

_(TODO: Write this section)_

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
