const { comment } = Wizzard.takeCookbook({ url: 'https://ptp.example.com/samples/', isLazy: true })
    .useOpenAi({ apiKey: 'sss' })
    .askUser()
    .takeRecipe('comment.ptp.md@v1')
    .cook();

//==============

const wizzard = Wizzard.takeCookbook({ sources: {...} })
    .useOpenAi({ apiKey: 'sss' })
    .askUser();

const recipe = wizzard.takeRecipe('website.ptp.md@v1');
const { websiteContent } = recipe.cook();

/**
url, sources nebo folder 
 * TODO: [🧠] OpenAi apiKey vs token
 */
