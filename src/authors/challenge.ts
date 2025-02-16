import 'dotenv/config'
import { image } from '../assistants/openAi';
import generate from '../assistants';
import { writeYml, writeMd } from './helpers';

export async function challenge(context: string) {
    const start = new Date()

    console.log('Kicking off the challenge generation process...')

    const englishChallenge = await generate('englishChallenge', context)
    const frenchChallenge = await generate('frenchChallenge', JSON.stringify(englishChallenge))
    const imagePrompt = await generate('imagePrompt', `# ${englishChallenge.name} \n ${englishChallenge.overview}`)
    const imageUrl = await image(imagePrompt.prompt)

    // // TODO: Implement the image generation for the lesson card
    // /* 1. Download the image from the URL */
    // /* 2. Resize the card image  563x563 */
    // /* 3. Save both images to AWS S3 */
    const heroImageUrl = imageUrl
    const cardImageUrl = imageUrl

    // /* 4. Wrire the new lesson to a yaml file  */


    const { handle, reduction, saving, question, education, upload, completion } = englishChallenge

    const points = {
        question: question.points,
        education: education.points,
        upload: upload.points,
        completion: completion.points
    }

    const multipleChoice = question.multipleChoice
    
    const en: any = { ...englishChallenge }
    delete en.handle
    delete en.reduction
    delete en.saving
    delete en.question.points
    delete en.question.multipleChoice
    delete en.education.points
    delete en.upload.points
    delete en.completion.points

    const fr: any = { ...frenchChallenge }
    delete fr.handle
    delete fr.reduction
    delete fr.saving
    delete fr.question.points
    delete fr.question.multipleChoice
    delete fr.education.points
    delete fr.upload.points
    delete fr.completion.points


    await writeYml(`${__dirname}/../../content/challenges/${handle}.yml`, {
        cardImageUrl,
        heroImageUrl,
        reduction,
        saving,
        points,
        multipleChoice,
        en,
        fr
    })

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}