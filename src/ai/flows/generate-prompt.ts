'use server';
/**
 * @fileOverview A prompt generation AI agent.
 *
 * - generateOptimizedPrompt - A function that handles the prompt generation process.
 * - GenerateOptimizedPromptInput - The input type for the generateOptimizedPrompt function.
 * - GenerateOptimizedPromptOutput - The return type for the generateOptimizedPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOptimizedPromptInputSchema = z.object({
  description: z.string().describe('A description of the desired content (e.g., \'marketing text for fiber optic modem\').'),
  useCase: z.enum(['Tolid-e-mohtava', 'Code-nevisi', 'Tahqiq-va-tahlil', 'Sefareshi']).describe('The use case for the prompt (Tolid-e-mohtava, Code-nevisi, Tahqiq-va-tahlil, Sefareshi).'),
  format: z.enum(['XML', 'Markdown', 'Mixed']).describe('The desired output format (XML, Markdown, Mixed).'),
});
export type GenerateOptimizedPromptInput = z.infer<typeof GenerateOptimizedPromptInputSchema>;

const GenerateOptimizedPromptOutputSchema = z.object({
  optimizedPrompt: z.string().describe('The optimized prompt tailored for generating the content.'),
});
export type GenerateOptimizedPromptOutput = z.infer<typeof GenerateOptimizedPromptOutputSchema>;

export async function generateOptimizedPrompt(input: GenerateOptimizedPromptInput): Promise<GenerateOptimizedPromptOutput> {
  return generateOptimizedPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOptimizedPromptPrompt',
  input: {schema: GenerateOptimizedPromptInputSchema},
  output: {schema: GenerateOptimizedPromptOutputSchema},
  prompt: `You are an expert prompt engineer specializing in creating optimized prompts for various use cases.

You will use the user's description of their desired content, the selected use case, and the desired output format to generate an optimized prompt that is tailored for generating that content.

Description: {{{description}}}
Use Case: {{{useCase}}}
Format: {{{format}}}

{{#if format.XML}}
<prompt>
  <instruction>
    متن زیر را برای مدیران غیرفنی خلاصه کن. زبان خلاصه باید ساده و قابل فهم باشد.
  </instruction>
  <context>
    این متن، یک گزارش مالی در مورد عملکرد سه ماهه سوم شرکت است.
  </context>
  <document_to_summarize>
    [متن طولانی گزارش مالی در اینجا قرار می‌گیرد]
  </document_to_summarize>
</prompt>
{{else}}
You will generate an optimized prompt. This is the user's request:
{{{description}}}

The use case is: {{{useCase}}}.
The desired format is: {{{format}}}.

Create a well-structured and effective prompt based on this information. If the format is Markdown, use appropriate Markdown syntax. If it is mixed, you can combine different formatting styles.
{{/if}}`,
});

const generateOptimizedPromptFlow = ai.defineFlow(
  {
    name: 'generateOptimizedPromptFlow',
    inputSchema: GenerateOptimizedPromptInputSchema,
    outputSchema: GenerateOptimizedPromptOutputSchema,
  },
  async input => {
    // A little hack to make the Handlebars `if` work as expected for a string value.
    const modifiedInput = {
      ...input,
      format: {
        [input.format]: true,
      },
    };
    const {output} = await prompt(modifiedInput);
    return output!;
  }
);
