import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/libs/utils';

const cardVariants = cva('rounded-2xl border transition-all duration-200 text-card-foreground', {
  variants: {
    variant: {
      default: 'bg-card border-border shadow-xs hover:border-border/80',
      interactive:
        'bg-card border-border shadow-xs hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
      glass: 'bg-background/60 backdrop-blur-md border-white/10 dark:border-white/5 shadow-sm',
      outline: 'bg-transparent border-border/80 hover:border-border',
      subtle: 'bg-muted/40 border-transparent hover:bg-muted/60',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

export function Card(props: CardProps) {
  const { variant, padding, className, ...rest } = props;
  return <div {...rest} className={cn(cardVariants({ variant, padding }), className)} />;
}

export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div {...rest} className={cn('flex flex-col space-y-1.5 pb-4', className)} />;
}

export function CardTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  const { className, children, ...rest } = props;
  return (
    <h3
      {...rest}
      className={cn('text-lg font-semibold leading-none tracking-tight text-foreground', className)}
    >
      {children}
    </h3>
  );
}

export function CardDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return <p {...rest} className={cn('text-sm text-muted-foreground leading-relaxed', className)} />;
}

export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div {...rest} className={cn('pt-0', className)} />;
}

export function CardFooter(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn('flex items-center pt-4 border-t border-border/60 mt-4', className)}
    />
  );
}
