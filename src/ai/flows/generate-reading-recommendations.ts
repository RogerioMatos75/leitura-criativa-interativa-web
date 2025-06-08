// src/ai/flows/generate-reading-recommendations.ts
'use server';

/**
 * @fileOverview Generates personalized reading recommendations for a child based on their reading level and interests.
 *
 * - generateReadingRecommendations - A function that handles the generation of reading recommendations.
 * - GenerateReadingRecommendationsInput - The input type for the generateReadingRecommendations function.
 * - GenerateReadingRecommendationsOutput - The return type for the generateReadingRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReadingRecommendationsInputSchema = z.object({
  readingLevel: z
    .string()
    .describe('The reading level of the child (e.g., beginner, intermediate, advanced).'),
  interests: z.string().describe('The interests of the child (e.g., animals, dinosaurs, fantasy).'),
  age: z.number().describe('The age of the child.'),
});
export type GenerateReadingRecommendationsInput = z.infer<
  typeof GenerateReadingRecommendationsInputSchema
>;

const GenerateReadingRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized reading recommendations for the child.'),
});
export type GenerateReadingRecommendationsOutput = z.infer<
  typeof GenerateReadingRecommendationsOutputSchema
>;

export async function generateReadingRecommendations(
  input: GenerateReadingRecommendationsInput
): Promise<GenerateReadingRecommendationsOutput> {
  return generateReadingRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReadingRecommendationsPrompt',
  input: {schema: GenerateReadingRecommendationsInputSchema},
  output: {schema: GenerateReadingRecommendationsOutputSchema},
  prompt: `You are a reading recommendation expert for children.

  Based on the child's reading level, interests and age, provide a list of personalized reading recommendations.

  Reading Level: {{{readingLevel}}}
  Interests: {{{interests}}}
  Age: {{{age}}}

  Please provide the recommendations as a list of book titles.`,
});

const generateReadingRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateReadingRecommendationsFlow',
    inputSchema: GenerateReadingRecommendationsInputSchema,
    outputSchema: GenerateReadingRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
