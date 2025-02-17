import 'dotenv/config'
import generate from '../assistants';
import { writeYml, readYml } from './helpers';
import { formatChallenges } from './challenge';

export async function reTranslate(contentType: string, handle: string) {

    const start = new Date()
    console.log('Kicking off the lesson generation process...')

    switch (contentType) {
        case 'lesson':
            const lessonPath = `${__dirname}/../../content/lessons/${handle}.yml`
            const lesson = await readYml(lessonPath)
            if (!lesson) throw new Error(`Lesson with handle ${handle} not found`)
            const { handle: _, ...fr } = await generate('frenchLesson', lesson.en)
            await writeYml(lessonPath, { ...lesson, fr })
            break;
        case 'challenge':
            const path = `${__dirname}/../../content/challenges/${handle}.yml`
            const challenge = await readYml(path)
            if (!challenge) throw new Error(`Challenge with handle ${handle} not found`)
            const frChallenge = await generate('frenchChallenge', challenge.en)
            await writeYml(path, {
                ...challenge,
                ...formatChallenges(challenge.en, frChallenge)
            })

            break;
        default:
            throw new Error(`Content type ${contentType} is not allowed`)
    }

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}