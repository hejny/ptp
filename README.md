# 🌠 Prompt template pipelines

_(Needs to be fixed - inputed by voice)_

Library for super boosting your usage of large language Models

## Concept

When you have simple sigle Prompt in your up It Just doesn't matter how it is integrated If It's Direct calling of Rest API or using Open Ai library and hardcoilding prompt in the codefile or importing text file

When you need Something Special or Scale The capebilities of the llms, you have Generali Free Ways to come:

1. find tuning some model to your perfection or even creating your own
2. prompt tuning
3. multishot promoting

with each of this situations this Library can help to boost your performance

this Library can help with severo severo Things:

-   separation of responsibilities between fromt engineer and programmer and between code Files and fromp Files and between fromps and from templates
-   testing witch prompt is working best for you loging
-   setting up some Common Format for trumps to be des fronts Intel change Bill between Project AS R For Example React Components Intro changebob between Applications This is implementation for typescript JavaScript but it Can be implemented for Any coule Stick We want
-   Simply find your code to in your code is Just one Simple function Which do All The Magic also **DRY**
-   boosting The Performance of the App and Allo 11
-   streaming

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
