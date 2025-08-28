type LoaderProps = {
  text?: string;
};

export function Loader({ text = 'کمی صبر کنید، در حال ساخت پرامپت...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center animate-in fade-in">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-primary border-t-transparent"></div>
      <p className="text-lg font-medium text-primary">{text}</p>
      <p className="text-sm text-muted-foreground">این فرآیند ممکن است چند لحظه طول بکشد.</p>
    </div>
  );
}
