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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
        <Card className="w-full border-border/40 bg-card/60">
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
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-sm font-normal text-muted-foreground py-2 hover:no-underline">
                        🔎 راهنمای انتخاب فرمت پرامپت
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-muted/50 rounded-md">
                        <p className="mb-4">
                          برای اینکه پرامپت شما بهترین نتیجه رو بده، باید تعیین کنید خروجی چه ساختاری داشته باشه:
                        </p>
                        <ul className="space-y-4">
                          <li>
                            <strong className="flex items-center gap-2"><span>🏗️</span><span>XML Tag</span></strong>
                            <p className="text-sm text-muted-foreground mt-1 pr-8">
                              اگر می‌خواید خروجی خیلی دقیق و ساختاریافته باشه.
                              <br/>
                              <strong>مثال:</strong> ساختار هدر سایت یا تعریف دیتابیس.
                            </p>
                          </li>
                          <li>
                            <strong className="flex items-center gap-2"><span>✍️</span><span>Markdown</span></strong>
                            <p className="text-sm text-muted-foreground mt-1 pr-8">
                              اگر می‌خواید خروجی خوانا و مرتب برای انسان باشه.
                              <br/>
                              <strong>مثال:</strong> لیست نکات یک مقاله یا متن تبلیغاتی.
                            </p>
                          </li>
                          <li>
                            <strong className="flex items-center gap-2"><span>⚡️</span><span>Mixed</span></strong>
                            <p className="text-sm text-muted-foreground mt-1 pr-8">
                              ترکیبی از هر دو، وقتی هم دقت ماشینی و هم خوانایی انسانی مهمه.
                              <br/>
                              <strong>مثال:</strong> توضیحات محصول با ساختار فنی + متن ساده برای مشتری.
                            </p>
                          </li>
                        </ul>
                         <p className="mt-4 pt-4 border-t border-border">
                          <strong>👈 اگر نمی‌دونید کدوم بهتره، <span className="text-primary">Markdown</span> رو انتخاب کنید.</strong>
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col items-end"
                    >
                      {formats.map((format) => (
                        <FormItem
                          key={format.id}
                          className="flex items-center space-y-0"
                        >
                          <Label htmlFor={format.id} className="font-normal cursor-pointer mr-3">
                            {format.label}
                          </Label>
                          <FormControl>
                            <RadioGroupItem value={format.id} id={format.id} />
                          </FormControl>
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
              🚀 پرامپی بزن بریم
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => <label {...props} />;
