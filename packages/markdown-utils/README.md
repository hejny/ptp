<!-- ⚠️ WARNING: This code has been generated so that any manual changes will be overwritten -->

# ![Promptbook logo - cube with letters P and B](./other/design/logo-h1.png) Promptbook

Build responsible, controlled and transparent applications on top of LLM models!




[![NPM Version of ![Promptbook logo - cube with letters P and B](./other/design/logo-h1.png) Promptbook](https://badge.fury.io/js/promptbook.svg)](https://www.npmjs.com/package/promptbook)
[![Quality of package ![Promptbook logo - cube with letters P and B](./other/design/logo-h1.png) Promptbook](https://packagequality.com/shield/promptbook.svg)](https://packagequality.com/#?package=promptbook)
[![Known Vulnerabilities](https://snyk.io/test/github/webgptorg/promptbook/badge.svg)](https://snyk.io/test/github/webgptorg/promptbook)
[![Issues](https://img.shields.io/github/issues/webgptorg/promptbook.svg?style=flat)](https://github.com/webgptorg/promptbook/issues)





## ✨ New Features

-   💙 Working on [the **Book** language v1](https://github.com/webgptorg/book)
-   📚 Support of `.docx`, `.doc` and `.pdf` documents
-   ✨ **Support of [OpenAI o1 model](https://openai.com/o1/)**



<blockquote style="color: #ff8811">
    <b>⚠ Warning:</b> This is a pre-release version of the library. It is not yet ready for production use. Please look at <a href="https://www.npmjs.com/package/@promptbook/core?activeTab=versions">latest stable release</a>.
</blockquote>

## 📦 Package `@promptbook/markdown-utils`

- Promptbooks are [divided into several](#-packages) packages, all are published from [single monorepo](https://github.com/webgptorg/promptbook).
- This package `@promptbook/markdown-utils` is one part of the promptbook ecosystem.

To install this package, run:

```bash
# Install entire promptbook ecosystem
npm i ptbk

# Install just this package to save space
npm install @promptbook/markdown-utils
```

Utility functions used for processing markdown. Its part of the larger [`@promptbook/utils`](https://www.npmjs.com/package/@promptbook/utils) ecosystem.


---

Rest of the documentation is common for **entire promptbook ecosystem**:

## 🤍 The Promptbook Whitepaper



If you have a simple, single prompt for ChatGPT, GPT-4, Anthropic Claude, Google Gemini, Llama 3, or whatever, it doesn't matter how you integrate it. Whether it's calling a REST API directly, using the SDK, hardcoding the prompt into the source code, or importing a text file, the process remains the same.

But often you will struggle with the **limitations of LLMs**, such as **hallucinations, off-topic responses, poor quality output, language and prompt drift, word repetition repetition repetition repetition or misuse, lack of context, or just plain w𝒆𝐢rd resp0nses**. When this happens, you generally have three options:

1. **Fine-tune** the model to your specifications or even train your own.
2. **Prompt-engineer** the prompt to the best shape you can achieve.
3. Orchestrate **multiple prompts** in a [pipeline](https://github.com/webgptorg/promptbook/discussions/64) to get the best result.

In all of these situations, but especially in 3., the **✨ Promptbook can make your life waaaaaaaaaay easier**.

-   [**Separates concerns**](https://github.com/webgptorg/promptbook/discussions/32) between prompt-engineer and programmer, between code files and prompt files, and between prompts and their execution logic. For this purpose, it introduces a new language called [the **💙 Book**](https://github.com/webgptorg/book).
-   Book allows you to **focus on the business** logic without having to write code or deal with the technicalities of LLMs.
-   **Forget** about **low-level details** like choosing the right model, tokens, context size, `temperature`, `top-k`, `top-p`, or kernel sampling. **Just write your intent** and [**persona**](https://github.com/webgptorg/promptbook/discussions/22) who should be responsible for the task and let the library do the rest.
-   We have built-in **orchestration** of [pipeline](https://github.com/webgptorg/promptbook/discussions/64) execution and many tools to make the process easier, more reliable, and more efficient, such as caching, [compilation+preparation](https://github.com/webgptorg/promptbook/discussions/78), [just-in-time fine-tuning](https://github.com/webgptorg/promptbook/discussions/33), [expectation-aware generation](https://github.com/webgptorg/promptbook/discussions/37), [agent adversary expectations](https://github.com/webgptorg/promptbook/discussions/39), and more.
-   Sometimes even the best prompts with the best framework like Promptbook `:)` can't avoid the problems. In this case, the library has built-in **[anomaly detection](https://github.com/webgptorg/promptbook/discussions/40) and logging** to help you find and fix the problems.
-   Versioning is build in. You can test multiple **A/B versions** of pipelines and see which one works best.
-   Promptbook is designed to use [**RAG** (Retrieval-Augmented Generation)](https://github.com/webgptorg/promptbook/discussions/41) and other advanced techniques to bring the context of your business to generic LLM. You can use **knowledge** to improve the quality of the output.



## 💜 The Promptbook Project



<table>
  <tbody>
    <tr>
      <td>Promptbook whitepaper</td>
      <td>Basic motivations and problems which we are trying to solve</td>
      <td rowspan=3>https://github.com/webgptorg/book</td>
    </tr>
    <tr>
      <td>Promptbook <i>(system)</i></td>
      <td>Promptbook ...</td>
    </tr>
    <tr>
      <td>Book language</td>
      <td>
          Book is a markdown-like language to define projects, pipelines, knowledge,... in the Promptbook system. It is designed to be understandable by non-programmers and non-technical people
      </td>
    </tr>
    <tr>
      <td>Promptbook typescript project</td>
      <td>Implementation of Promptbook in TypeScript published into multiple packages to NPM</td>
      <td>https://github.com/webgptorg/promptbook</td>
    </tr>
    <tr>
      <td>Promptbook studio</td>
      <td>Promptbook studio</td>
      <td rowspan=2>https://github.com/hejny/promptbook-studio</td>
    </tr>
    <tr>
      <td>Promptbook miniapps</td>
      <td>Promptbook miniapps</td>
    </tr>
  </tbody>
</table>

## 💙 Book language _(for prompt-engineer)_

Promptbook [pipelines](https://github.com/webgptorg/promptbook/discussions/64) are written in markdown-like language called [Book](https://github.com/webgptorg/book). It is designed to be understandable by non-programmers and non-technical people.



```markdown
# 🌟 My first Book

-   INPUT PARAMETER {subject}
-   OUTPUT PARAMETER {article}

## Sample subject

> Promptbook

-> {subject}

## Write an article

-   PERSONA Jane, marketing specialist with prior experience in writing articles about technology and artificial intelligence
-   KNOWLEDGE https://ptbk.io
-   KNOWLEDGE ./promptbook.pdf
-   EXPECT MIN 1 Sentence
-   EXPECT MAX 1 Paragraph

> Write an article about the future of artificial intelligence in the next 10 years and how metalanguages will change the way AI is used in the world.
> Look specifically at the impact of {subject} on the AI industry.

-> {article}
```

## 📦 Packages _(for developers)_

This library is divided into several packages, all are published from [single monorepo](https://github.com/webgptorg/promptbook).
You can install all of them at once:

```bash
npm i ptbk
```

Or you can install them separately:

> ⭐ Marked packages are worth to try first

-   ⭐ **[ptbk](https://www.npmjs.com/package/ptbk)** - Bundle of all packages, when you want to install everything and you don't care about the size
-   **[promptbook](https://www.npmjs.com/package/promptbook)** - Same as `ptbk`
-   **[@promptbook/core](https://www.npmjs.com/package/@promptbook/core)** - Core of the library, it contains the main logic for promptbooks
-   **[@promptbook/node](https://www.npmjs.com/package/@promptbook/node)** - Core of the library for Node.js environment
-   **[@promptbook/browser](https://www.npmjs.com/package/@promptbook/browser)** - Core of the library for browser environment
-   ⭐ **[@promptbook/utils](https://www.npmjs.com/package/@promptbook/utils)** - Utility functions used in the library but also useful for individual use in preprocessing and postprocessing LLM inputs and outputs
-   **[@promptbook/markdown-utils](https://www.npmjs.com/package/@promptbook/markdown-utils)** - Utility functions used for processing markdown
-   _(Not finished)_ **[@promptbook/wizzard](https://www.npmjs.com/package/@promptbook/wizzard)** - Wizard for creating+running promptbooks in single line
-   **[@promptbook/execute-javascript](https://www.npmjs.com/package/@promptbook/execute-javascript)** - Execution tools for javascript inside promptbooks
-   **[@promptbook/openai](https://www.npmjs.com/package/@promptbook/openai)** - Execution tools for OpenAI API, wrapper around OpenAI SDK
-   **[@promptbook/anthropic-claude](https://www.npmjs.com/package/@promptbook/anthropic-claude)** - Execution tools for Anthropic Claude API, wrapper around Anthropic Claude SDK 
-   **[@promptbook/azure-openai](https://www.npmjs.com/package/@promptbook/azure-openai)** - Execution tools for Azure OpenAI API
-   **[@promptbook/langtail](https://www.npmjs.com/package/@promptbook/langtail)** - Execution tools for Langtail API, wrapper around Langtail SDK
-   **[@promptbook/fake-llm](https://www.npmjs.com/package/@promptbook/fake-llm)** - Mocked execution tools for testing the library and saving the tokens
-   **[@promptbook/remote-client](https://www.npmjs.com/package/@promptbook/remote-client)** - Remote client for remote execution of promptbooks
-   **[@promptbook/remote-server](https://www.npmjs.com/package/@promptbook/remote-server)** - Remote server for remote execution of promptbooks
-   **[@promptbook/pdf](https://www.npmjs.com/package/@promptbook/pdf)** - Read knowledge from `.pdf` documents
-   **[@promptbook/documents](https://www.npmjs.com/package/@promptbook/documents)** - Read knowledge from documents like `.docx`, `.odt`,…
-   **[@promptbook/legacy-documents](https://www.npmjs.com/package/@promptbook/legacy-documents)** - Read knowledge from legacy documents like `.doc`, `.rtf`,…
-   **[@promptbook/website-crawler](https://www.npmjs.com/package/@promptbook/website-crawler)** - Crawl knowledge from the web
-   **[@promptbook/types](https://www.npmjs.com/package/@promptbook/types)** - Just typescript types used in the library
-   **[@promptbook/cli](https://www.npmjs.com/package/@promptbook/cli)** - Command line interface utilities for promptbooks



## 📚 Dictionary

The following glossary is used to clarify certain concepts:

### Basic terms



### Core concepts

-   [📚 Collection of pipelines](https://github.com/webgptorg/promptbook/discussions/65)
-   [📯 Pipeline](https://github.com/webgptorg/promptbook/discussions/64)
-   [🎺 Pipeline templates](https://github.com/webgptorg/promptbook/discussions/88)
-   [🤼 Personas](https://github.com/webgptorg/promptbook/discussions/22)
-   [⭕ Parameters](https://github.com/webgptorg/promptbook/discussions/83)
-   [🚀 Pipeline execution](https://github.com/webgptorg/promptbook/discussions/84)
-   [🧪 Expectations](https://github.com/webgptorg/promptbook/discussions/30)
-   [✂️ Postprocessing](https://github.com/webgptorg/promptbook/discussions/31)
-   [🔣 Words not tokens](https://github.com/webgptorg/promptbook/discussions/29)
-   [☯ Separation of concerns](https://github.com/webgptorg/promptbook/discussions/32)

### Advanced concepts

-   [📚 Knowledge (Retrieval-augmented generation)](https://github.com/webgptorg/promptbook/discussions/41)
-   [🌏 Remote server](https://github.com/webgptorg/promptbook/discussions/89)
-   [🃏 Jokers (conditions)](https://github.com/webgptorg/promptbook/discussions/66)
-   [🔳 Metaprompting](https://github.com/webgptorg/promptbook/discussions/35)
-   [🌏 Linguistically typed languages](https://github.com/webgptorg/promptbook/discussions/53)
-   [🌍 Auto-Translations](https://github.com/webgptorg/promptbook/discussions/42)
-   [📽 Images, audio, video, spreadsheets](https://github.com/webgptorg/promptbook/discussions/54)
-   [🔙 Expectation-aware generation](https://github.com/webgptorg/promptbook/discussions/37)
-   [⏳ Just-in-time fine-tuning](https://github.com/webgptorg/promptbook/discussions/33)
-   [🔴 Anomaly detection](https://github.com/webgptorg/promptbook/discussions/40)
-   [👮 Agent adversary expectations](https://github.com/webgptorg/promptbook/discussions/39)
-   [view more](https://github.com/webgptorg/promptbook/discussions/categories/concepts)

## 🔌 Usage in Typescript / Javascript

-   [Simple usage](./examples/usage/simple-script)
-   [Usage with client and remote server](./examples/usage/remote)

## ➕➖ When to use Promptbook?

### ➕ When to use

-   When you are writing app that generates complex things via LLM - like **websites, articles, presentations, code, stories, songs**,...
-   When you want to **separate code from text prompts**
-   When you want to describe **complex prompt pipelines** and don't want to do it in the code
-   When you want to **orchestrate multiple prompts** together
-   When you want to **reuse** parts of prompts in multiple places
-   When you want to **version** your prompts and **test multiple versions**
-   When you want to **log** the execution of prompts and backtrace the issues

[See more](https://github.com/webgptorg/promptbook/discussions/111)

### ➖ When not to use

-   When you have already implemented single simple prompt and it works fine for your job
-   When [OpenAI Assistant (GPTs)](https://help.openai.com/en/articles/8673914-gpts-vs-assistants) is enough for you
-   When you need streaming _(this may be implemented in the future, [see discussion](https://github.com/webgptorg/promptbook/discussions/102))_.
-   When you need to use something other than JavaScript or TypeScript _(other languages are on the way, [see the discussion](https://github.com/webgptorg/promptbook/discussions/101))_
-   When your main focus is on something other than text - like images, audio, video, spreadsheets _(other media types may be added in the future, [see discussion](https://github.com/webgptorg/promptbook/discussions/103))_
-   When you need to use recursion _([see the discussion](https://github.com/webgptorg/promptbook/discussions/38))_

[See more](https://github.com/webgptorg/promptbook/discussions/112)

## 🐜 Known issues

-   [🤸‍♂️ Iterations not working yet](https://github.com/webgptorg/promptbook/discussions/55)
-   [⤵️ Imports not working yet](https://github.com/webgptorg/promptbook/discussions/34)

## 🧼 Intentionally not implemented features

-   [➿ No recursion](https://github.com/webgptorg/promptbook/discussions/38)
-   [🏳 There are no types, just strings](https://github.com/webgptorg/promptbook/discussions/52)

## ❔ FAQ

If you have a question [start a discussion](https://github.com/webgptorg/promptbook/discussions/), [open an issue](https://github.com/webgptorg/promptbook/issues) or [write me an email](https://www.pavolhejny.com/contact).

-   [❔ Why not just use the OpenAI SDK / Anthropic Claude SDK / ...?](https://github.com/webgptorg/promptbook/discussions/114)
-   [❔ How is it different from the OpenAI`s GPTs?](https://github.com/webgptorg/promptbook/discussions/118)
-   [❔ How is it different from the Langchain?](https://github.com/webgptorg/promptbook/discussions/115)
-   [❔ How is it different from the DSPy?](https://github.com/webgptorg/promptbook/discussions/117)
-   [❔ How is it different from _anything_?](https://github.com/webgptorg/promptbook/discussions?discussions_q=is%3Aopen+label%3A%22Promptbook+vs%22)
-   [❔ Is Promptbook using RAG _(Retrieval-Augmented Generation)_?](https://github.com/webgptorg/promptbook/discussions/123)
-   [❔ Is Promptbook using function calling?](https://github.com/webgptorg/promptbook/discussions/124)

## ⌚ Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## 📜 License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/webgptorg/promptbook">Promptbook</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/hejny/">Pavol Hejný</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0</a></p>

## 🎯 Todos

See [TODO.md](./TODO.md)




## 🖋️ Contributing

I am open to pull requests, feedback, and suggestions. Or if you like this utility, you can [☕ buy me a coffee](https://www.buymeacoffee.com/hejny) or [donate via cryptocurrencies](https://github.com/hejny/hejny/blob/main/documents/crypto.md).

You can also ⭐ star the promptbook package, [follow me on GitHub](https://github.com/hejny) or [various other social networks](https://www.pavolhejny.com/contact/).