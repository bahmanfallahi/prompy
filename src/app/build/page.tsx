'use client';

import { useState } from 'react';
import type { GenerateOptimizedPromptInput } from '@/ai/flows/generate-prompt';
import { useToast } from '@/hooks/use-toast';
import { handlePromptGeneration } from './actions';
import { PromptForm } from '@/components/prompt-form';
import { PromptResult } from '@/components/prompt-result';
import { Loader } from '@/components/loader';

export default function BuildPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] =
    useState<GenerateOptimizedPromptInput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: GenerateOptimizedPromptInput) => {
    setIsLoading(true);
    setLastSubmission(data);
    const response = await handlePromptGeneration(data);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data.optimizedPrompt);
    } else {
      toast({
        variant: 'destructive',
        title: 'خطا در ساخت پرامپت',
        description:
          response.error || 'مشکلی پیش آمده، لطفا دوباره تلاش کنید.',
      });
      setResult(null);
    }
  };

  const handleRegenerate = () => {
    if (lastSubmission) {
      handleSubmit(lastSubmission);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLastSubmission(null);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      {isLoading ? (
        <Loader />
      ) : result ? (
        <PromptResult
          prompt={result}
          onRegenerate={handleRegenerate}
          onReset={handleReset}
        />
      ) : (
        <PromptForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
