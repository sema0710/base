import OpenAI from "openai";

export default class OpenAIService {
  async exec(html: string) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const splittedHtml = html.match(/[\s\S]{1,4000}/g) ?? [];
    const resumeMessage = splittedHtml.map((html) => ({
      role: "user" as const,
      content: html,
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        ...resumeMessage,
        {
          role: "user",
          content: `Please create 10 interview questions from this resume with this format 1.[question]\n 2.[question]\n

        And Please leave only questions And translate to korean.`,
        },
      ],
    });

    return response;
  }
}
