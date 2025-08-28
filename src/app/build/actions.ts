'use server';

import {
  generateOptimizedPrompt,
  type GenerateOptimizedPromptInput,
} from '@/ai/flows/generate-prompt';

export async function handlePromptGeneration(data: GenerateOptimizedPromptInput) {
  try {
    const result = await generateOptimizedPrompt(data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating prompt:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An unknown error occurred.',
    };
  }
}
