'use server';

/**
 * @fileOverview Matches candidates with listed topics based on their skills.
 *
 * - intelligentCandidateMatching - A function that matches candidates with listed topics.
 * - IntelligentCandidateMatchingInput - The input type for the intelligentCandidateMatching function.
 * - IntelligentCandidateMatchingOutput - The return type for the intelligentCandidateMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentCandidateMatchingInputSchema = z.object({
  candidateSkills: z.string().describe('The skills of the candidate.'),
  listedTopics: z.string().describe('The listed topics to match against.'),
});
export type IntelligentCandidateMatchingInput = z.infer<typeof IntelligentCandidateMatchingInputSchema>;

const IntelligentCandidateMatchingOutputSchema = z.object({
  matchSummary: z.string().describe('A summary of how well the candidate matches the listed topics.'),
  isSuitable: z.boolean().describe('A boolean value indicating whether the candidate is suitable for the topics.'),
});
export type IntelligentCandidateMatchingOutput = z.infer<typeof IntelligentCandidateMatchingOutputSchema>;

export async function intelligentCandidateMatching(input: IntelligentCandidateMatchingInput): Promise<IntelligentCandidateMatchingOutput> {
  return intelligentCandidateMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentCandidateMatchingPrompt',
  input: {schema: IntelligentCandidateMatchingInputSchema},
  output: {schema: IntelligentCandidateMatchingOutputSchema},
  prompt: `You are an expert recruiter specializing in matching candidates to listed topics based on their skills.

You will use the candidate skills and listed topics to determine how well the candidate matches the listed topics.

Candidate Skills: {{{candidateSkills}}}
Listed Topics: {{{listedTopics}}}

Based on the candidate skills and listed topics, provide a summary of how well the candidate matches the listed topics and a boolean value indicating whether the candidate is suitable for the topics.
`,
});

const intelligentCandidateMatchingFlow = ai.defineFlow(
  {
    name: 'intelligentCandidateMatchingFlow',
    inputSchema: IntelligentCandidateMatchingInputSchema,
    outputSchema: IntelligentCandidateMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
