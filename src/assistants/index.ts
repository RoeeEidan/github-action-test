import Handlebars from 'handlebars';
import { readMd } from '../authors/helpers';
import { query } from './openAi';
import { z } from 'zod';

const lesson = z.object({
    handle: z.string(),
    heading: z.string(),
    body: z.string(),
    message: z.object({
        heading: z.string(),
        body: z.string()
    }),
    popup: z.object({
        heading: z.string(),
    })
})

const challenge = z.object({
    handle: z.string(),
    reduction: z.number(),
    saving: z.number(),
    name: z.string(),
    message: z.string(),
    overview: z.string(),
    question: z.object({
        multipleChoice: z.boolean(),
        points: z.number(),
        heading: z.string(),
        description: z.string(),
        answers: z.object({
            a: z.string(),
            b: z.string(),
            c: z.string(),
            d: z.string(),
            e: z.string().optional().nullable(),
            f: z.string().optional().nullable(),
        })
    }),
    education: z.object({
        points: z.number(),
        heading: z.string(),
        description: z.string(),
        link: z.object({
            text: z.string(),
            url: z.string().optional().nullable(),
            popup: z.string().optional().nullable()
        })
    }),
    upload: z.object({
        points: z.number(),
        heading: z.string(),
        description: z.string()
    }),
    completion: z.object({
        points: z.number(),
        heading: z.string(),
        description: z.string(),
    })
})

const quiz = z.object({
    handle: z.string(),
    question: z.string(),
    answers: z.object({
        a: z.string(),
        b: z.string(),
        c: z.string(),
        d: z.string()
    }),
    sourceUrl: z.string(),
    topic: z.string(),
    correctAnswer: z.enum(['a', 'b', 'c', 'd']),
})

const chapter = z.object({
    handle: z.string(),
    en: z.object({
        heading: z.string(),
    }),
    fr: z.object({
        heading: z.string(),
    }),
    tasks: z.array(z.object({
        type: z.enum(['lesson', 'challenge', 'quiz']),
        handle: z.string()
    })),
    tags: z.array(z.string()).optional().nullable(),
    locations: z.array(z.string()).optional().nullable(),
    ownerId: z.number().optional().nullable(),
    roles: z.array(z.string()).optional().nullable(),
})

const schema = {
    englishLesson: lesson,
    frenchLesson: lesson,
    englishChallenge: challenge,
    frenchChallenge: challenge,
    englishQuiz: quiz,
    frenchQuiz: quiz,
    imagePrompt: z.object({
        prompt: z.string()
    }),
    chapter: chapter
}


export default async function generate<T extends keyof typeof schema>(key: T, input: string): Promise<z.infer<typeof schema[T]>> {
    const start = new Date()
    console.log(`Generating ${key}....`)
    const instructions = Handlebars.compile(await readMd(`${__dirname}/../../src/assistants/${key}/instructions.md`))({ input });
    const prompt = Handlebars.compile(await readMd(`${__dirname}/../../src/assistants/${key}/prompt.md`))({ input });
    const res = await query(instructions, prompt);
    console.log(`Generated ${key}, took ${(new Date().getTime() - start.getTime()) / 1000}s`)
    return schema[key].parse(JSON.parse(res.choices[0].message.content as string))
}


