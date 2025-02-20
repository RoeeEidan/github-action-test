import 'dotenv/config'
import generate from '../assistants';
import { writeYml, readYml } from './helpers';
import { challengeTranslations } from './challenge';

export async function translate(contentType: string, handle: string) {

    const start = new Date()
    console.log('Kicking off the translation process...')

    switch (contentType) {
        case 'lesson':
            const lessonPath = `${__dirname}/../../content/lessons/${handle}.yml`
            const lesson = await readYml(lessonPath)
            if (!lesson) throw new Error(`Lesson with handle ${handle} not found`)
            const { handle: _, ...fr } = await generate('frenchLesson', JSON.stringify({ handle, ...lesson.en }))
            await writeYml(lessonPath, { ...lesson, fr })
            break;
        case 'challenge':
            const challengePath = `${__dirname}/../../content/challenges/${handle}.yml`
            const { fr: __, cardImageUrl, heroImageUrl, en, multipleChoice, points, ...challenge } = await readYml(challengePath)
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

            await writeYml(challengePath, {
                heroImageUrl,
                cardImageUrl,
                ...challenge,
                multipleChoice,
                points,
                ...challengeTranslations(enChallenge, frChallenge)
            })

            break;
        case 'quiz':
            const quizPath = `${__dirname}/../../content/quizzes/${handle}.yml`
            const quiz = await readYml(quizPath)
            if (!quiz) throw new Error(`Quiz with handle ${handle} not found`)
            const { handle: ____, sourceUrl: _____, correctAnswer: ______, ...frQuiz } = await generate('frenchQuiz', JSON.stringify(quiz))
            const { handle: ___, sourceUrl, correctAnswer, ...enQuiz } = quiz
            await writeYml(quizPath, {
                sourceUrl,
                correctAnswer,
                en: enQuiz,
                fr: frQuiz
            })
            break
        case 'chapter':
            const chapterPath = `${__dirname}/../../content/chapters/${handle}.yml`
            const currentChapter = await readYml(chapterPath)
            if (!currentChapter) throw new Error(`Quiz with handle ${handle} not found`)
            const { handle: _______, ...newChapter } = await generate('chapter', JSON.stringify(currentChapter))
            await writeYml(chapterPath, newChapter)
            break
        default:
            throw new Error(`Content type ${contentType} is not allowed`)
    }

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}