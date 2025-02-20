import 'dotenv/config'
import { image } from '../assistants/openAi';
import generate from '../assistants';
import { writeYml } from './helpers';

type C = Awaited<ReturnType<typeof generate<'englishChallenge'>>>
export function challengeTranslations(englishChallenge: C, frenchChallenge: C) {

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

    return {
        en,
        fr
    }
}

export async function challenge(context: string) {
    const start = new Date()

    console.log('Kicking off the challenge generation process...')

    const englishChallenge = await generate('englishChallenge', context)

    console.log(`HANDLE: ${englishChallenge.handle}`)

    const frenchChallenge = await generate('frenchChallenge', JSON.stringify(englishChallenge))
    const imagePrompt = await generate('imagePrompt', `# ${englishChallenge.name} \n ${englishChallenge.overview}`)
    const imageUrl = await image(imagePrompt.prompt)

    console.log(`IMAGE: ${imageUrl}`)

    // // TODO: Implement the image generation for the lesson card
    // /* 1. Download the image from the URL */
    // /* 2. Resize the card image  563x563 */
    // /* 3. Save both images to AWS S3 */
    // /* 4. Wrire the new lesson to a yaml file  */

    const { reduction, saving, question } = englishChallenge
    const multipleChoice = question.multipleChoice

    await writeYml(
        `${__dirname}/../../content/challenges/${englishChallenge.handle}.yml`,
        {
            heroImageUrl: imageUrl,
            cardImageUrl: imageUrl,
            saving,
            reduction,
            multipleChoice,
            points: {
                question: englishChallenge.question.points,
                education: englishChallenge.education.points,
                upload: englishChallenge.upload.points,
                completion: englishChallenge.completion.points
            },
            ...challengeTranslations(englishChallenge, frenchChallenge),

        }
    )

    const end = new Date()
    console.log(`Completed the challenge generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}