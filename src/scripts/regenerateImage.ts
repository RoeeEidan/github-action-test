import yargs from 'yargs';
import { reGenerateImage } from '../authors/reGenerateImage';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

async function main() {
    const argv = yargs.command('$0 <contentType> <contentHandle>', 'Generate a challenge')
        .usage(`$0 <contentType> <contentHandle>`)
        .positional('contentType', {
            type: 'string',
            describe: 'The type of content to generate the challenge for',
        })
        .positional('contentHandle', {
            type: 'string',
            describe: 'The handle of the content to generate the challenge for',
        })
        .help()
        .parseSync();

    const { contentType: type, contentHandle: handle } = argv

    if (!type) throw new Error('Content type is required')
    if (!handle) throw new Error('Content handle is required')

    await reGenerateImage(type, handle)
    console.log(`Generating a image for ${type} with handle ${handle}`)
}


main()
    .then(() => {
        console.log('Challenge generation completed')
    })
    .catch((error) => {
        console.error('Challenge generation failed', error)
    })