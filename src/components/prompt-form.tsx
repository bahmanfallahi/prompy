'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type { GenerateOptimizedPromptInput } from '@/ai/flows/generate-prompt';
import { BrainCircuit, FileCode2, FlaskConical, PencilRuler } from 'lucide-react';

const useCaseEnum = z.enum([
  'Tolid-e-mohtava',
  'Code-nevisi',
  'Tahqiq-va-tahlil',
  'Sefareshi',
]);
const formatEnum = z.enum(['XML', 'Markdown', 'Mixed']);

const formSchema = z.object({
  useCase: useCaseEnum.describe('The use case for the prompt'),
  format: formatEnum.describe('The desired output format'),
  description: z
    .string()
    .min(10, { message: 'توضیحات باید حداقل ۱۰ کاراکتر باشد.' })
    .max(500, { message: 'توضیحات نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد.' }),
});

const useCases = [
  {
    id: 'Tolid-e-mohtava',
    label: 'تولید محتوا',
    icon: <PencilRuler className="h-5 w-5" />,
  },
  { id: 'Code-nevisi', label: 'کدنویسی', icon: <FileCode2 className="h-5 w-5" /> },
  {
    id: 'Tahqiq-va-tahlil',
    label: 'تحقیق و تحلیل',
    icon: <FlaskConical className="h-5 w-5" />,
  },
  { id: 'Sefareshi', label: 'سفارشی', icon: <BrainCircuit className="h-5 w-5" /> },
];

const formats = [
  { id: 'Markdown', label: 'Markdown' },
  { id: 'XML', label: 'XML' },
  { id: 'Mixed', label: 'ترکیبی (Mixed)' },
];

type PromptFormProps = {
  onSubmit: (data: GenerateOptimizedPromptInput) => void;
};

export function PromptForm({ onSubmit }: PromptFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>ساخت پرامپت جدید</CardTitle>
            <CardDescription>
              برای شروع، اطلاعات زیر را تکمیل کنید تا پرامپت بهینه برای شما ساخته
              شود.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-semibold">
                    ۱. هدف خود را انتخاب کنید (Use Case)
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {useCases.map((useCase) => (
                        <FormItem key={useCase.id}>
                          <FormControl>
                            <RadioGroupItem
                              value={useCase.id}
                              className="sr-only"
                              id={useCase.id}
                            />
                          </FormControl>
                          <Label
                            htmlFor={useCase.id}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                          >
                            {useCase.icon}
                            <span className="mt-2 text-sm font-medium">{useCase.label}</span>
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-semibold">
                    ۲. فرمت خروجی را انتخاب کنید
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 items-start"
                    >
                      {formats.map((format) => (
                        <FormItem
                          key={format.id}
                          className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse"
                        >
                          <FormControl>
                            <RadioGroupItem value={format.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {format.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    ۳. نیاز خود را شرح دهید
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="مثال: یک متن تبلیغاتی برای معرفی مودم فیبرنوری با سرعت بالا"
                      className="resize-min h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg">
              ساخت پرامپت
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

// Dummy Label component to satisfy type-checker
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => <label {...props} />;
