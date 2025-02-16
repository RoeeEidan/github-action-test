import { challenge } from "../authors/challenge";
import yargs from 'yargs';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

async function main() {
    const argv = yargs.command('$0 <context>', 'Generate a challenge')
        .usage(`$0 <context>`)
        .positional('context', {
            type: 'string',
            describe: `The context to generate the challenge in`,
        })
        .help()
        .parseSync();

    await challenge(argv.context)
}


main()
    .then(() => {
        console.log('Challenge generation completed')
    })
    .catch((error) => {
        console.error('Challenge generation failed', error)
    })