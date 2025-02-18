import 'dotenv/config'
import generate from '../assistants';
import { writeYml, readYml } from './helpers';
import { challengeTranslations } from './challenge';

export async function translate(contentType: string, handle: string) {

    const start = new Date()
    console.log('Kicking off the lesson generation process...')

    switch (contentType) {
        case 'lesson':
            const lessonPath = `${__dirname}/../../content/lessons/${handle}.yml`
            const lesson = await readYml(lessonPath)
            if (!lesson) throw new Error(`Lesson with handle ${handle} not found`)
            const { handle: _, ...fr } = await generate('frenchLesson', JSON.stringify({ handle, ...lesson.en }))
            await writeYml(lessonPath, { ...lesson, fr })
            break;
        case 'challenge':
            const path = `${__dirname}/../../content/challenges/${handle}.yml`
            const { fr: __, cardImageUrl: ___, heroImageUrl: ____, en, multipleChoice, points, ...challenge } = await readYml(path)
            if (!challenge) throw new Error(`Challenge with handle ${handle} not found`)

            const enChallenge = { ...en }
            enChallenge.question.multipleChoice = multipleChoice
            enChallenge.question.points = points.question
            enChallenge.education.points = points.education
            enChallenge.upload.points = points.upload
            enChallenge.completion.points = points.completion

            const frChallenge = await generate('frenchChallenge', JSON.stringify({
                handle,
                ...challenge,
                ...enChallenge
            }))

            await writeYml(path, {
                ...challenge,
                ...challengeTranslations(challenge.en, frChallenge)
            })

            break;
        default:
            throw new Error(`Content type ${contentType} is not allowed`)
    }

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}