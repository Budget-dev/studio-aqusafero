'use server';
/**
 * @fileOverview An AI agent that recommends suitable RO water treatment solutions.
 *
 * - roSolutionRecommendation - A function that handles the RO solution recommendation process.
 * - RoSolutionRecommendationInput - The input type for the roSolutionRecommendation function.
 * - RoSolutionRecommendationOutput - The return type for the roSolutionRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RoSolutionRecommendationInputSchema = z.object({
  industryType: z
    .string()
    .describe('The type of industry or application (e.g., Food & Beverage, Pharmaceutical, Residential).'),
  requiredWaterQuality: z
    .string()
    .describe('The required water quality (e.g., Drinking Water, Ultrapure Water, Boiler Feed Water).'),
  dailyCapacityGPD: z
    .number()
    .int()
    .positive()
    .describe('The daily water treatment capacity required, in Gallons Per Day (GPD).'),
});
export type RoSolutionRecommendationInput = z.infer<typeof RoSolutionRecommendationInputSchema>;

const RoSolutionRecommendationOutputSchema = z.object({
  recommendedSolutions: z.array(
    z.object({
      solutionName: z.string().describe('The name of the recommended RO solution or system.'),
      description: z.string().describe('A detailed description of the solution.'),
      capacityRangeGPD: z
        .string()
        .describe('The typical capacity range of this solution, in GPD (e.g., "500-1000 GPD", "Up to 50 GPD").'),
      applicationArea: z
        .string()
        .describe('The primary application area for this solution (e.g., "Large-scale industrial processes", "Household drinking water").'),
      keyFeatures: z.array(z.string()).describe('A list of key features or benefits of the solution.'),
    })
  ).describe('An array of suitable RO water treatment solutions.'),
  disclaimer: z.string().optional().describe('An optional disclaimer about the recommendations.'),
});
export type RoSolutionRecommendationOutput = z.infer<typeof RoSolutionRecommendationOutputSchema>;

export async function roSolutionRecommendation(
  input: RoSolutionRecommendationInput
): Promise<RoSolutionRecommendationOutput> {
  return roSolutionRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roSolutionRecommendationPrompt',
  input: { schema: RoSolutionRecommendationInputSchema },
  output: { schema: RoSolutionRecommendationOutputSchema },
  prompt: `You are an expert in Reverse Osmosis (RO) water treatment solutions. Your goal is to provide tailored recommendations based on the user's specific needs.

Analyze the following requirements and suggest suitable RO water treatment solutions. For each recommendation, provide a name, a detailed description, its typical capacity range in GPD, its primary application area, and a list of key features.

User Requirements:
Industry Type: {{{industryType}}}
Required Water Quality: {{{requiredWaterQuality}}}
Daily Capacity: {{{dailyCapacityGPD}}} GPD

Provide at least 1-3 distinct and relevant recommendations. If the input seems unusual or outside typical RO applications, add a disclaimer.`,
});

const roSolutionRecommendationFlow = ai.defineFlow(
  {
    name: 'roSolutionRecommendationFlow',
    inputSchema: RoSolutionRecommendationInputSchema,
    outputSchema: RoSolutionRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
