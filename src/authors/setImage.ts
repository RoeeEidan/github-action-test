import 'dotenv/config'
import { readYml, writeYml } from './helpers'

export async function setImage(type: string, handle: string, url: string) {

    const start = new Date()
    console.log('Kicking off the lesson generation process...')

    /*
        TODO: 
            - Validate the URL
            - Resize the image to the required dimensions
            - Upload the image to the CDN
    */ 
   console.log('IMAGE:', url)

    switch (type) {

        case 'lesson':
            const lessonPath = `${__dirname}/../../content/lessons/${handle}.yml`
            const lesson = await readYml(lessonPath)
            lesson.heroImageUrl = url
            lesson.cardImageUrl = url
            await writeYml(lessonPath, lesson)
            break;

        case 'challenge':
            const challengePath = `${__dirname}/../../content/challenges/${handle}.yml`
            const challenge = await readYml(challengePath)
            challenge.heroImageUrl = url
            challenge.cardImageUrl = url
            await writeYml(challengePath, challenge)
            break;

        default:
            throw new Error(`Content type ${type} is not allowed`)
    }

    const end = new Date()
    console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}