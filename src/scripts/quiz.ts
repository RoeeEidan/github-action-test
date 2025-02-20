import { quiz } from "../authors/quiz";
import yargs from 'yargs';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

async function main() {
    const argv = yargs.command('$0 <context>', 'Generate a quiz')
        .usage(`$0 <context>`)
        .positional('context', {
            type: 'string',
            describe: `The context to generate the quiz in`,
        })
        .help()
        .parseSync();

    if (!argv.context) {
        throw new Error('Context is required')
    }

    await quiz(argv.context)
}


main()
    .then(() => {
        console.log('quiz generation completed')
    })
    .catch((error) => {
        console.error('quiz generation failed', error)
    })