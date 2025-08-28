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
  prompt: `You are an expert prompt engineer. Your task is to generate an optimized prompt based on a user's request.
The user provides a description, a use case, and a desired output format.

User Request:
- Description: {{{description}}}
- Use Case: {{{useCase}}}
- Desired Format: {{{format}}}

Your generated prompt must be in Persian and structured according to the "Desired Format". Follow these examples precisely for the output format:

---
### Format Examples

**1. If the format is XML:**
The output should be a machine-readable XML structure. This is for when the output will be processed by another script or system.

Example of expected output structure:
<prompt>
  <instruction>
    یک هدر وبسایت با ساختار زیر طراحی کن.
  </instruction>
  <structure>
    <header>
      <logo src="logo.png" alt="Company Logo" responsive="true"/>
      <navigation>
        <menu-item name="Home" link="/"/>
        <menu-item name="About" link="/about"/>
        <menu-item name="Services" link="/services"/>
        <menu-item name="Contact" link="/contact"/>
      </navigation>
      <utilities>
        <search placeholder="Search..."/>
        <user-menu>
          <item name="Login"/>
          <item name="Register"/>
        </user-menu>
      </utilities>
    </header>
  </structure>
  <notes>
    ساختار باید کاملاً ماشینی و قابل پردازش باشد.
  </notes>
</prompt>

**2. If the format is Markdown:**
The output should be human-readable with simple formatting. This is ideal for documentation or non-technical teams.

Example of expected output structure:
## درخواست: طراحی ساختار هدر وبسایت

- **لوگو (Logo)**
  - فایل: \`logo.png\`
  - واکنش‌گرا (Responsive): ✅

- **منوی اصلی (Main Navigation)**
  - خانه (\`/\`)
  - درباره ما (\`/about\`)
  - خدمات (\`/services\`)
  - تماس با ما (\`/contact\`)

- **ابزارها (Utilities)**
  - نوار جستجو (متن جایگزین: "جستجو...")
  - منوی کاربری: ورود | ثبت‌نام

**یادداشت:** این ساختار برای ارائه به تیم غیرفنی و داکیومنتیشن مناسب است.

**3. If the format is Mixed (XML + Markdown):**
The output should be a combination of machine-readable structure and human-readable comments.

Example of expected output structure:
<header>
  <logo>
    ## Logo
    File: \`logo.png\`
    Responsive: ✅
  </logo>
  
  <navigation>
    ## Main Navigation
    - Home (\`/\`)
    - About (\`/about\`)
    - Services (\`/services\`)
    - Contact (\`/contact\`)
  </navigation>
  
  <utilities>
    ## Utilities
    - Search bar (placeholder: "Search...")
    - User Menu: **Login | Register**
  </utilities>
</header>
---

Now, based on the user's request (Description: '{{{description}}}', Use Case: '{{{useCase}}}'), generate the complete and optimized prompt in the '{{{format}}}' format. The prompt must be in Persian.`,
});

const generateOptimizedPromptFlow = ai.defineFlow(
  {
    name: 'generateOptimizedPromptFlow',
    inputSchema: GenerateOptimizedPromptInputSchema,
    outputSchema: GenerateOptimizedPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
