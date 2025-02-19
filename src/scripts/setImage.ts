import yargs from 'yargs';
import { setImage } from "../authors/setImage"

async function main() {
    const argv = yargs.command('$0 <handle> <url>', 'Generate a challenge')
        .usage(`$0 <handle> <url>`)
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

    const { handle, url } = argv

    if (!url) throw new Error('Content tyurlpe is required')
    if (!handle) throw new Error('Content handle is required')

    await setImage(handle, url)
}


main()
    .then(() => {
        console.log('Challenge generation completed')
    })
    .catch((error) => {
        console.error('Challenge generation failed', error)
    })