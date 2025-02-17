import { lesson } from "../authors/lesson";
import yargs from 'yargs';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

async function main() {
    const argv = yargs.command('$0 <context>', 'Generate a lesson')
        .usage(`$0 <context>`)
        .positional('context', {
            type: 'string',
            describe: `The context to generate the lesson in`,
        })
        .help()
        .parseSync();

    if (!argv.context) {
        throw new Error('Context is required')
    }

    await lesson(argv.context)
}


main()
    .then(() => {
        console.log('Lesson generation completed')
    })
    .catch((error) => {
        console.error('Lesson generation failed', error)
    })