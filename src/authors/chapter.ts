import 'dotenv/config'
import generate from '../assistants';
import { writeYml } from './helpers';

export async function chapter(context: string) {
    const start = new Date()

    console.log('Kicking off the chapter generation process...')

    const chapter = await generate('chapter', context)

    console.log(`HANDLE: ${chapter.handle}`)
    console.log('IMAGE: N/A')

    const end = new Date()
    console.log(`Completed the chapter generation process, took ${(end.getTime() - start.getTime()) / 1000}s`)

    // TODO: Validate that the tasks actually exist.

    const { handle, ...rest } = chapter

    await writeYml(`${__dirname}/../../content/chapters/${handle}.yml`, rest)
}