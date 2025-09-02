'use server';
/**
 * @fileOverview AI-powered text polishing for the 'About Me' section.
 *
 * - polishAboutMeText - A function that polishes the input text.
 * - PolishAboutMeTextInput - The input type for the polishAboutMeText function.
 * - PolishAboutMeTextOutput - The return type for the polishAboutMeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PolishAboutMeTextInputSchema = z.object({
  aboutMeText: z
    .string()
    .describe('The text from the About Me section that needs polishing.'),
});
export type PolishAboutMeTextInput = z.infer<typeof PolishAboutMeTextInputSchema>;

const PolishAboutMeTextOutputSchema = z.object({
  polishedText: z
    .string()
    .describe('The polished text for the About Me section.'),
});
export type PolishAboutMeTextOutput = z.infer<typeof PolishAboutMeTextOutputSchema>;

export async function polishAboutMeText(input: PolishAboutMeTextInput): Promise<PolishAboutMeTextOutput> {
  return polishAboutMeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'polishAboutMeTextPrompt',
  input: {schema: PolishAboutMeTextInputSchema},
  output: {schema: PolishAboutMeTextOutputSchema},
  prompt: `You are a professional writing assistant. Your task is to polish the following \"About Me\" text so that it is well-written and professional.

Original Text: {{{aboutMeText}}}

Polished Text:`,
});

const polishAboutMeTextFlow = ai.defineFlow(
  {
    name: 'polishAboutMeTextFlow',
    inputSchema: PolishAboutMeTextInputSchema,
    outputSchema: PolishAboutMeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
