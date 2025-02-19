import 'dotenv/config'

export async function setImage(handle: string, url: string) {

    // const start = new Date()
    // console.log('Kicking off the lesson generation process...')
    console.log(`IMAGE: ${url} for ${handle}`)

    // switch (contentType) {

    //     case 'lesson':
    //         const lessonPath = `${__dirname}/../../content/lessons/${handle}.yml`
    //         const lesson = await readYml(lessonPath)
    //         const lessonImagePrompt = await generate('imagePrompt', `# ${lesson.en.heading} \n ${lesson.en.body}`)
    //         const lessonImageUrl = await image(lessonImagePrompt.prompt)
    //         console.log(`IMAGE: ${lessonImageUrl}`)
    //         lesson.heroImageUrl = lessonImageUrl
    //         lesson.cardImageUrl = lessonImageUrl
    //         await writeYml(lessonPath, lesson)
    //         break;

    //     case 'challenge':
    //         const challengePath = `${__dirname}/../../content/challenges/${handle}.yml`
    //         const challenge = await readYml(challengePath)
    //         const challengeImagePrompt = await generate('imagePrompt', `# ${challenge.en.name} \n ${challenge.en.overview}`)
    //         const challengeImageUrl = await image(challengeImagePrompt.prompt)
    //         console.log(`IMAGE: ${challengeImageUrl}`)
    //         challenge.heroImageUrl = challengeImageUrl
    //         challenge.cardImageUrl = challengeImageUrl
    //         await writeYml(challengePath, challenge)
    //         break;

    //     default:
    //         throw new Error(`Content type ${contentType} is not allowed`)
    // }

    // const end = new Date()
    // console.log(`Completed the lesson generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)
}