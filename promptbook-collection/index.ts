export default [{"title":"Prepare Knowledge from Markdown","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-from-markdown.ptbk.md","promptbookVersion":"0.60.0","parameters":[{"name":"content","description":"Markdown document content","isInput":true,"isOutput":false},{"name":"knowledge","description":"The knowledge JSON object","isInput":false,"isOutput":true}],"promptTemplates":[{"name":"knowledge","title":"Knowledge","dependentParameterNames":["content"],"executionType":"PROMPT_TEMPLATE","modelRequirements":{"modelVariant":"CHAT","modelName":"claude-3-opus-20240229"},"content":"You are experienced data researcher, extract the important knowledge from the document.\n\n# Rules\n\n-   Make pieces of information concise, clear, and easy to understand\n-   One piece of information should be approximately 1 paragraph\n-   Divide the paragraphs by markdown horizontal lines ---\n-   Omit irrelevant information\n-   Group redundant information\n-   Write just extracted information, nothing else\n\n# The document\n\nTake information from this document:\n\n> {content}","resultingParameterName":"knowledge"}],"knowledge":[{"name":"l","title":"L","content":"D","keywords":["S"],"index":[{"modelName":"mocked-facked","position":[0.9174977914590796,-0.5840885325437926,0.4903153167643062,-0.5678971440599971,-0.054630055513731346,0.9175721958668364,0.027859464179535554,-0.6238655384843144,-0.3373842468535524,-0.944690134485684,0.1114585078344037,0.18832804383157242,-0.5417418061139077,-0.11526994076276464,-0.7549935981711187,0.2307417280182711,-0.3096037259891533,-0.7493658310169824,-0.5671793677148744,-0.5311567378761213,0.5375141647269133,0.6489625385694038,0.06306377035078237,0.3533055691313667,-0.15700642876525794]}],"sources":[{"title":"Markdown document","href":"#"}]}]},{"title":"Prepare Keywords","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-keywords.ptbk.md","promptbookVersion":"0.60.0","parameters":[{"name":"content","description":"The content","isInput":true,"isOutput":false},{"name":"keywords","description":"Keywords separated by comma","isInput":false,"isOutput":true}],"promptTemplates":[{"name":"knowledge","title":"Knowledge","dependentParameterNames":["content"],"executionType":"PROMPT_TEMPLATE","modelRequirements":{"modelVariant":"CHAT","modelName":"claude-3-opus-20240229"},"content":"You are experienced data researcher, detect the important keywords in the document.\n\n# Rules\n\n-   Write just keywords separated by comma\n\n# The document\n\nTake information from this document:\n\n> {content}","resultingParameterName":"keywords"}],"knowledge":[{"name":"i","title":"I","content":"S","keywords":["C"],"index":[{"modelName":"mocked-facked","position":[0.49325983273619345,0.4898090774160133,0.8634145102311948,-0.8868979529496941,-0.6526597025380099,0.08283320868877508,-0.41655280044568244,-0.18997462875751436,0.44607486212182046,0.7398734092796682,0.7818721567474509,0.19317856626823238,-0.17033312598948536,0.8738394056602492,-0.2666728867094803,-0.7246824342525469,-0.9260326702212893,-0.1770302624304576,0.3374952777082276,0.3613337093423583,-0.8004407612895665,-0.2388341811938992,0.5874869114056849,0.9864369222082341,-0.025757005661235954]}],"sources":[{"title":"Markdown document","href":"#"}]}]},{"title":"Prepare Title","pipelineUrl":"https://promptbook.studio/promptbook/prepare-knowledge-title.ptbk.md","promptbookVersion":"0.60.0","parameters":[{"name":"content","description":"The content","isInput":true,"isOutput":false},{"name":"title","description":"The title of the document","isInput":false,"isOutput":true}],"promptTemplates":[{"name":"knowledge","title":"Knowledge","dependentParameterNames":["content"],"executionType":"PROMPT_TEMPLATE","expectations":{"words":{"min":1,"max":8}},"modelRequirements":{"modelVariant":"CHAT","modelName":"claude-3-opus-20240229"},"content":"You are experienced content creator, write best title for the document.\n\n# Rules\n\n-   Write just title, nothing else\n-   Title should be concise and clear\n-   Write maximum 5 words for the title\n\n# The document\n\n> {content}","resultingParameterName":"title"}],"knowledge":[{"name":"e","title":"E","content":"L","keywords":["I"],"index":[{"modelName":"mocked-facked","position":[-0.28212802523235103,0.485791316234069,0.8442037196509578,0.23946995709565444,-0.21458742942032227,0.8244195167516835,-0.08193135954955366,0.9286662143243674,0.03025317239682135,-0.15033361897721065,-0.008039815444327303,0.5255517526388429,0.12213997740713056,-0.907424383568737,0.01330495419263178,-0.858422137371198,-0.029353872339311415,-0.48118658709669093,-0.9764601613092232,0.9789053761915896,-0.055171364220696795,-0.30930188500347766,-0.06351653554045456,0.1755573095825529,-0.2103198722967914]}],"sources":[{"title":"Markdown document","href":"#"}]}]}];
