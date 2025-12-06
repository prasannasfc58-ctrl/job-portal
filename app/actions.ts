'use server';

import { intelligentCandidateMatching, type IntelligentCandidateMatchingInput } from '@/ai/flows/intelligent-candidate-matching';

export async function getMatchingSummary(input: IntelligentCandidateMatchingInput) {
  try {
    const result = await intelligentCandidateMatching(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in AI matching:', error);
    return { success: false, error: 'Failed to get matching summary from AI.' };
  }
}
