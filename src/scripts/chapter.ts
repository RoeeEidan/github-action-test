import { chapter } from "../authors/chapter";
import yargs from 'yargs';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

async function main() {
    const argv = yargs.command('$0 <context>', 'Generate a chapter')
        .usage(`$0 <context>`)
        .positional('context', {
            type: 'string',
            describe: `The context to generate the chapter in`,
        })
        .help()
        .parseSync();

    if (!argv.context) {
        throw new Error('Context is required')
    }

    await chapter(argv.context)
}


main()
    .then(() => {
        console.log('chapter generation completed')
    })
    .catch((error) => {
        console.error('chapter generation failed', error)
    })