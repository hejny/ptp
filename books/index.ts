export default [{"title":"Prepare Knowledge from Markdown","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.book.md","formfactorName":"GENERIC","parameters":[{"name":"knowledgeContent","description":"Markdown document content","isInput":true,"isOutput":false},{"name":"knowledgePieces","description":"The knowledge JSON object","isInput":false,"isOutput":true}],"tasks":[{"taskType":"PROMPT_TASK","name":"knowledge","title":"Knowledge","content":"You are experienced data researcher, extract the important knowledge from the document.\n\n# Rules\n\n-   Make pieces of information concise, clear, and easy to understand\n-   One piece of information should be approximately 1 paragraph\n-   Divide the paragraphs by markdown horizontal lines ---\n-   Omit irrelevant information\n-   Group redundant information\n-   Write just extracted information, nothing else\n\n# The document\n\nTake information from this document:\n\n> {knowledgeContent}","resultingParameterName":"knowledgePieces","dependentParameterNames":["knowledgeContent"]}],"personas":[],"preparations":[],"knowledgeSources":[],"knowledgePieces":[],"sources":[{"type":"BOOK","path":null,"content":"# Prepare Knowledge from Markdown\n\n-   PIPELINE URL `https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.book.md`\n-   INPUT PARAMETER `{knowledgeContent}` Markdown document content\n-   OUTPUT PARAMETER `{knowledgePieces}` The knowledge JSON object\n\n## Knowledge\n\n<!-- TODO: [🍆] -FORMAT JSON -->\n\n```markdown\nYou are experienced data researcher, extract the important knowledge from the document.\n\n# Rules\n\n-   Make pieces of information concise, clear, and easy to understand\n-   One piece of information should be approximately 1 paragraph\n-   Divide the paragraphs by markdown horizontal lines ---\n-   Omit irrelevant information\n-   Group redundant information\n-   Write just extracted information, nothing else\n\n# The document\n\nTake information from this document:\n\n> {knowledgeContent}\n```\n\n`-> {knowledgePieces}`\n"}],"sourceFile":"./books/prepare-knowledge-from-markdown.book.md"},{"title":"Prepare Keywords","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-keywords.book.md","formfactorName":"GENERIC","parameters":[{"name":"knowledgePieceContent","description":"The content","isInput":true,"isOutput":false},{"name":"keywords","description":"Keywords separated by comma","isInput":false,"isOutput":true}],"tasks":[{"taskType":"PROMPT_TASK","name":"knowledge","title":"Knowledge","content":"You are experienced data researcher, detect the important keywords in the document.\n\n# Rules\n\n-   Write just keywords separated by comma\n\n# The document\n\nTake information from this document:\n\n> {knowledgePieceContent}","resultingParameterName":"keywords","dependentParameterNames":["knowledgePieceContent"]}],"personas":[],"preparations":[],"knowledgeSources":[],"knowledgePieces":[],"sources":[{"type":"BOOK","path":null,"content":"# Prepare Keywords\n\n-   PIPELINE URL `https://promptbook.studio/promptbook/prepare-knowledge-keywords.book.md`\n-   INPUT PARAMETER `{knowledgePieceContent}` The content\n-   OUTPUT PARAMETER `{keywords}` Keywords separated by comma\n\n## Knowledge\n\n<!-- TODO: [🍆] -FORMAT JSON -->\n\n```markdown\nYou are experienced data researcher, detect the important keywords in the document.\n\n# Rules\n\n-   Write just keywords separated by comma\n\n# The document\n\nTake information from this document:\n\n> {knowledgePieceContent}\n```\n\n`-> {keywords}`\n"}],"sourceFile":"./books/prepare-knowledge-keywords.book.md"},{"title":"Prepare Knowledge-piece Title","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-title.book.md","formfactorName":"GENERIC","parameters":[{"name":"knowledgePieceContent","description":"The content","isInput":true,"isOutput":false},{"name":"title","description":"The title of the document","isInput":false,"isOutput":true}],"tasks":[{"taskType":"PROMPT_TASK","name":"knowledge","title":"Knowledge","content":"You are experienced content creator, write best title for the document.\n\n# Rules\n\n-   Write just title, nothing else\n-   Write maximum 5 words for the title\n\n# The document\n\n> {knowledgePieceContent}","resultingParameterName":"title","expectations":{"words":{"min":1,"max":8}},"dependentParameterNames":["knowledgePieceContent"]}],"personas":[],"preparations":[],"knowledgeSources":[],"knowledgePieces":[],"sources":[{"type":"BOOK","path":null,"content":"# Prepare Knowledge-piece Title\n\n-   PIPELINE URL `https://promptbook.studio/promptbook/prepare-knowledge-title.book.md`\n-   INPUT PARAMETER `{knowledgePieceContent}` The content\n-   OUTPUT PARAMETER `{title}` The title of the document\n\n## Knowledge\n\n-   EXPECT MIN 1 WORD\n-   EXPECT MAX 8 WORDS\n\n```markdown\nYou are experienced content creator, write best title for the document.\n\n# Rules\n\n-   Write just title, nothing else\n-   Write maximum 5 words for the title\n\n# The document\n\n> {knowledgePieceContent}\n```\n\n`-> {title}`\n"}],"sourceFile":"./books/prepare-knowledge-title.book.md"},{"title":"Prepare Persona","pipelineUrl":"https://promptbook.studio/promptbook/prepare-persona.book.md","formfactorName":"GENERIC","parameters":[{"name":"availableModelNames","description":"List of available model names separated by comma (,)","isInput":true,"isOutput":false},{"name":"personaDescription","description":"Description of the persona","isInput":true,"isOutput":false},{"name":"modelRequirements","description":"Specific requirements for the model","isInput":false,"isOutput":true}],"tasks":[{"taskType":"PROMPT_TASK","name":"make-model-requirements","title":"Make modelRequirements","content":"You are experienced AI engineer, you need to create virtual assistant.\nWrite\n\n## Example\n\n```json\n{\n\"modelName\": \"gpt-4o\",\n\"systemMessage\": \"You are experienced AI engineer and helpfull assistant.\",\n\"temperature\": 0.7\n}\n```\n\n## Instructions\n\n-   Your output format is JSON object\n-   Write just the JSON object, no other text should be present\n-   It contains the following keys:\n    -   `modelName`: The name of the model to use\n    -   `systemMessage`: The system message to provide context to the model\n    -   `temperature`: The sampling temperature to use\n\n### Key `modelName`\n\nPick from the following models:\n\n-   {availableModelNames}\n\n### Key `systemMessage`\n\nThe system message is used to communicate instructions or provide context to the model at the beginning of a conversation. It is displayed in a different format compared to user messages, helping the model understand its role in the conversation. The system message typically guides the model's behavior, sets the tone, or specifies desired output from the model. By utilizing the system message effectively, users can steer the model towards generating more accurate and relevant responses.\n\nFor example:\n\n> You are an experienced AI engineer and helpful assistant.\n\n> You are a friendly and knowledgeable chatbot.\n\n### Key `temperature`\n\nThe sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.\n\nYou can pick a value between 0 and 2. For example:\n\n-   `0.1`: Low temperature, extremely conservative and deterministic\n-   `0.5`: Medium temperature, balanced between conservative and creative\n-   `1.0`: High temperature, creative and bit random\n-   `1.5`: Very high temperature, extremely creative and often chaotic and unpredictable\n-   `2.0`: Maximum temperature, completely random and unpredictable, for some extreme creative use cases\n\n# The assistant\n\nTake this description of the persona:\n\n> {personaDescription}","resultingParameterName":"modelRequirements","format":"JSON","dependentParameterNames":["availableModelNames","personaDescription"]}],"personas":[],"preparations":[],"knowledgeSources":[],"knowledgePieces":[],"sources":[{"type":"BOOK","path":null,"content":"# Prepare Persona\n\n-   PIPELINE URL `https://promptbook.studio/promptbook/prepare-persona.book.md`\n-   INPUT PARAMETER `{availableModelNames}` List of available model names separated by comma (,)\n-   INPUT PARAMETER `{personaDescription}` Description of the persona\n-   OUTPUT PARAMETER `{modelRequirements}` Specific requirements for the model\n\n## Make modelRequirements\n\n-   FORMAT JSON\n\n```markdown\nYou are experienced AI engineer, you need to create virtual assistant.\nWrite\n\n## Example\n\n\\`\\`\\`json\n{\n\"modelName\": \"gpt-4o\",\n\"systemMessage\": \"You are experienced AI engineer and helpfull assistant.\",\n\"temperature\": 0.7\n}\n\\`\\`\\`\n\n## Instructions\n\n-   Your output format is JSON object\n-   Write just the JSON object, no other text should be present\n-   It contains the following keys:\n    -   `modelName`: The name of the model to use\n    -   `systemMessage`: The system message to provide context to the model\n    -   `temperature`: The sampling temperature to use\n\n### Key `modelName`\n\nPick from the following models:\n\n-   {availableModelNames}\n\n### Key `systemMessage`\n\nThe system message is used to communicate instructions or provide context to the model at the beginning of a conversation. It is displayed in a different format compared to user messages, helping the model understand its role in the conversation. The system message typically guides the model's behavior, sets the tone, or specifies desired output from the model. By utilizing the system message effectively, users can steer the model towards generating more accurate and relevant responses.\n\nFor example:\n\n> You are an experienced AI engineer and helpful assistant.\n\n> You are a friendly and knowledgeable chatbot.\n\n### Key `temperature`\n\nThe sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.\n\nYou can pick a value between 0 and 2. For example:\n\n-   `0.1`: Low temperature, extremely conservative and deterministic\n-   `0.5`: Medium temperature, balanced between conservative and creative\n-   `1.0`: High temperature, creative and bit random\n-   `1.5`: Very high temperature, extremely creative and often chaotic and unpredictable\n-   `2.0`: Maximum temperature, completely random and unpredictable, for some extreme creative use cases\n\n# The assistant\n\nTake this description of the persona:\n\n> {personaDescription}\n```\n\n`-> {modelRequirements}`\n"}],"sourceFile":"./books/prepare-persona.book.md"},{"title":"Prepare Title","pipelineUrl":"https://promptbook.studio/promptbook/prepare-title.book.md","formfactorName":"GENERIC","parameters":[{"name":"book","description":"The book to prepare the title for","isInput":true,"isOutput":false},{"name":"title","description":"Best title for the book","isInput":false,"isOutput":true}],"tasks":[{"taskType":"PROMPT_TASK","name":"make-title","title":"Make title","content":"Make best title for given text which describes the workflow:\n\n## Rules\n\n-   Write just title, nothing else\n-   Title should be concise and clear - Write maximum ideally 2 words, maximum 5 words\n-   Title starts with emoticon\n-   Title should not mention the input and output of the workflow but the main purpose of the workflow\n    _For example, not \"✍ Convert Knowledge-piece to title\" but \"✍ Title\"_\n\n## The workflow\n\n> {book}","resultingParameterName":"title","expectations":{"words":{"min":1,"max":8},"lines":{"min":1,"max":1}},"dependentParameterNames":["book"]}],"personas":[],"preparations":[],"knowledgeSources":[],"knowledgePieces":[],"sources":[{"type":"BOOK","path":null,"content":"# Prepare Title\n\n-   PIPELINE URL `https://promptbook.studio/promptbook/prepare-title.book.md`\n-   INPUT PARAMETER `{book}` The book to prepare the title for\n-   OUTPUT PARAMETER `{title}` Best title for the book\n\n## Make title\n\n-   EXPECT MIN 1 Word\n-   EXPECT MAX 8 Words\n-   EXPECT EXACTLY 1 Line\n\n```markdown\nMake best title for given text which describes the workflow:\n\n## Rules\n\n-   Write just title, nothing else\n-   Title should be concise and clear - Write maximum ideally 2 words, maximum 5 words\n-   Title starts with emoticon\n-   Title should not mention the input and output of the workflow but the main purpose of the workflow\n    _For example, not \"✍ Convert Knowledge-piece to title\" but \"✍ Title\"_\n\n## The workflow\n\n> {book}\n```\n\n`-> {title}`\n"}],"sourceFile":"./books/prepare-title.book.md"}];
