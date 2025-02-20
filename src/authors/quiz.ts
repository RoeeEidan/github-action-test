import 'dotenv/config'
import generate from '../assistants';
import { writeYml } from './helpers';

export async function quiz(context: string) {
    const start = new Date()

    console.log('Kicking off the quiz generation process...')

    const englishQuiz = await generate('englishQuiz', context)

    console.log(`HANDLE: ${englishQuiz.handle}`)
    const frenchQuiz = await generate('frenchQuiz', JSON.stringify(englishQuiz))

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)

    console.log('IMAGE: N/A')
    const { handle, sourceUrl, correctAnswer, ...en } = englishQuiz
    const { handle: _, sourceUrl: __, correctAnswer: ___, ...fr } = frenchQuiz

    await writeYml(`${__dirname}/../../content/quizzes/${handle}.yml`, {
        sourceUrl,
        correctAnswer,
        en,
        fr
    })
}