import yargs from 'yargs';
import { setImage } from "../authors/setImage"

async function main() {
    const argv = yargs.command('$0 <type> <handle> <url>', 'Generate a challenge')
        .usage(`$0 <type> <handle> <url>`)
        .positional('type', {
            type: 'string',
            describe: 'The type of content to generate the challenge for',
        })
        .positional('handle', {
            type: 'string',
            describe: 'The type of content to generate the challenge for',
        })
        .positional('url', {
            type: 'string',
            describe: 'The handle of the content to generate the challenge for',
        })
        .help()
        .parseSync();

    const { handle, url, type } = argv

    if (!type) throw new Error('Content type is required')
    if (!url) throw new Error('Content tyurlpe is required')
    if (!handle) throw new Error('Content handle is required')

    await setImage(type, handle, url)
}


main()
    .then(() => {
        console.log('Challenge generation completed')
    })
    .catch((error) => {
        console.error('Challenge generation failed', error)
    })