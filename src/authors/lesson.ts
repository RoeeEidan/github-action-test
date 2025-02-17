import 'dotenv/config'
import { image } from '../assistants/openAi';
import generate from '../assistants';
import { writeYml, writeMd } from './helpers';

export async function lesson(context: string) {
    const start = new Date()

    console.log('Kicking off the lesson generation process...')

    const englishLesson = await generate('englishLesson', context)

    console.log(`HANDLE: ${englishLesson.handle}`)

    const frenchLesson = await generate('frenchLesson', JSON.stringify(englishLesson))
    const imagePrompt = await generate('imagePrompt', `# ${englishLesson.heading} \n ${englishLesson.body}`)
    const imageUrl = await image(imagePrompt.prompt)

    console.log(`IMAGE: ${imageUrl}`)

    // TODO: Implement the image generation for the lesson card
    /* 1. Download the image from the URL */
    /* 2. Resize the card image  563x563 */
    /* 3. Save both images to AWS S3 */
    const heroImageUrl = imageUrl
    const cardImageUrl = imageUrl

    /* 4. Wrire the new lesson to a yaml file  */
    const { handle: enHanhle, ...enRest } = englishLesson
    const { handle: frHandle, ...frRest } = frenchLesson

    if (enHanhle !== frHandle) {
        throw new Error('The handles of the lessons do not match')
    }

    await writeYml(`${__dirname}/../../content/lessons/${enHanhle}.yml`, {
        cardImageUrl,
        heroImageUrl,
        en: enRest,
        fr: frRest
    })
    // await writeMd(`../content/lessons/${enHanhle}_en_body.md`, enBody)
    // await writeMd(`../content/lessons/${enHanhle}_fr_body.md`, frBody)

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}