export default [{"title":"Prepare Knowledge from Markdown","promptbookUrl":"https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.ptbk.md","promptbookVersion":"0.59.0-15","parameters":[{"name":"content","description":"Markdown document content","isInput":true,"isOutput":false},{"name":"knowledge","description":"The knowledge JSON object","isInput":false,"isOutput":true}],"promptTemplates":[{"name":"knowledge","title":"Knowledge","dependentParameterNames":["content"],"executionType":"PROMPT_TEMPLATE","modelRequirements":{"modelVariant":"CHAT","modelName":"claude-3-opus-20240229"},"content":"You are experienced data researcher, extract the important knowledge from the document.\n\n# Rules\n\n-   Make pieces of information concise, clear, and easy to understand\n-   One piece of information should be approximately 1 paragraph\n-   Divide the paragraphs by markdown horizontal lines ---\n-   Omit irrelevant information\n-   Group redundant information\n-   Write just extracted information, nothing else\n\n# The document\n\nTake information from this document:\n\n> {content}","resultingParameterName":"knowledge"}],"knowledge":[]}]
