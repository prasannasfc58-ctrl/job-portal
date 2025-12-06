"use client";

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getMatchingSummary } from '@/app/actions';
import type { IntelligentCandidateMatchingOutput } from '@/ai/flows/intelligent-candidate-matching';
import { useToast } from '@/hooks/use-toast';

interface IntelligentMatchingProps {
  candidateSkills: string[];
  listedTopics: string[];
}

export function IntelligentMatching({ candidateSkills, listedTopics }: IntelligentMatchingProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IntelligentCandidateMatchingOutput | null>(null);
  const { toast } = useToast();

  const handleMatch = async () => {
    setLoading(true);
    setResult(null);
    const response = await getMatchingSummary({
      candidateSkills: candidateSkills.join(', '),
      listedTopics: listedTopics.join(', '),
    });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Matching Failed',
        description: response.error,
      });
    }
    setLoading(false);
  };

  return (
    <div className="rounded-lg border bg-accent/50 border-primary/20 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold leading-none tracking-tight">
          <Sparkles className="text-primary" />
          Intelligent Matching
        </h3>
      </div>
      <div className="p-6 pt-0">
        <p className="mb-4 text-sm text-muted-foreground">
          Use AI to analyze how well this candidate's skills align with the required topics.
        </p>
        <button onClick={handleMatch} disabled={loading} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Match Skills to Topics
            </>
          )}
        </button>
        {result && (
          <div className="mt-4 space-y-3 rounded-lg border bg-background p-4">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">Match Result</h4>
              {result.isSuitable ? (
                <Badge variant="secondary" className="border-green-500 bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Suitable
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Suitable
                </Badge>
              )}
            </div>
            <p className="text-sm text-foreground/80">{result.matchSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
