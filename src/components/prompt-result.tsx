'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Copy, RefreshCw, PlusCircle } from 'lucide-react';

type PromptResultProps = {
  prompt: string;
  onRegenerate: () => void;
  onReset: () => void;
};

export function PromptResult({
  prompt,
  onRegenerate,
  onReset,
}: PromptResultProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className="w-full animate-in fade-in">
      <CardHeader>
        <CardTitle>پرامپت بهینه شما آماده است!</CardTitle>
        <CardDescription>
          می‌توانید پرامپت زیر را کپی کرده و در ابزار هوش مصنوعی مورد نظر خود
          استفاده کنید.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 h-7 w-7"
            onClick={handleCopy}
            aria-label="کپی کردن"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <pre className="bg-muted rounded-md p-4 pt-10 text-sm overflow-x-auto whitespace-pre-wrap break-words font-code leading-relaxed">
            <code>{prompt}</code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button onClick={onRegenerate}>
          <RefreshCw className="ms-2 h-4 w-4" />
          ساخت دوباره
        </Button>
        <Button variant="outline" onClick={onReset}>
          <PlusCircle className="ms-2 h-4 w-4" />
          ساخت پرامپت جدید
        </Button>
      </CardFooter>
    </Card>
  );
}
