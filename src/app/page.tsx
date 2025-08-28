import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 lg:py-32">
      <div className="rounded-full bg-primary/10 p-4 mb-6">
        <Bot className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 font-headline">
        پرامپی
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
        با پرامپی، پرامپت‌های حرفه‌ای و بهینه برای هوش مصنوعی بسازید.
        به سادگی نیاز خود را توصیف کنید و ما بهترین پرامپت را برای شما تولید
        می‌کنیم.
      </p>
      <Button asChild size="lg">
        <Link href="/build">همین حالا بسازید</Link>
      </Button>
    </div>
  );
}
