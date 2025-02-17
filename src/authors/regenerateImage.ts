import 'dotenv/config'
import { image } from '../assistants/openAi';
import generate from '../assistants';
import { writeYml, readYml } from './helpers';

const allowedContentTypes = ['lesson', 'challenge']

export async function regenerateImage(contentType: string, handle: string) {

    if (!allowedContentTypes.includes(contentType)) {
        throw new Error(`Content type ${contentType} is not allowed`)
    }

    const start = new Date()

    console.log('Kicking off the lesson generation process...')

    const path = `${__dirname}/../../content/${contentType}s/${handle}.yml`

    const content = await readYml(path)

    if (!content) {
        throw new Error(`Lesson with handle ${handle} not found`)
    }

    const imagePrompt = await generate('imagePrompt', `# ${content.en.heading || content.en.name} \n ${content.en.body || content.en.overview}`)

    const imageUrl = await image(imagePrompt.prompt)

    console.log(`IMAGE: ${imageUrl}`)

    // TODO: Implement the image generation for the lesson card
    /* 1. Download the image from the URL */
    /* 2. Resize the card image  563x563 */
    /* 3. Save both images to AWS S3 */
    content.heroImageUrl = imageUrl
    content.cardImageUrl = imageUrl

    await writeYml(path, content)

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}