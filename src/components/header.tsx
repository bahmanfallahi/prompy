import Link from 'next/link';
import { Bot } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg transition-colors hover:text-primary"
        >
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-headline">پرامپی</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
