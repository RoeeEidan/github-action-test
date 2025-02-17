import yargs from 'yargs';
import { regenerateImage } from '../authors/regenerateImage';

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

    if (!argv.contentType) {
        throw new Error('Content type is required')
    }

    if (!argv.contentHandle) {
        throw new Error('Content handle is required')
    }

    regenerateImage(argv.contentHandle, argv.contentType)
    console.log(`Generating a challenge for ${argv.contentType} with handle ${argv.contentHandle}`)
}


main()
    .then(() => {
        console.log('Challenge generation completed')
    })
    .catch((error) => {
        console.error('Challenge generation failed', error)
    })