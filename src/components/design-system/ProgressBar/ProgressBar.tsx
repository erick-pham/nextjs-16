import type { HTMLAttributes } from 'react';
import { cn } from '@/libs/utils';

type ProgressVariant = 'primary' | 'success' | 'warning' | 'error' | 'gradient';
type ProgressSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const variantColorMap: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  gradient: 'bg-gradient-to-r from-primary via-indigo-500 to-emerald-400',
};

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Value between 0 and 100 (or between 0 and max). */
  value: number;
  /** Max value, default 100. */
  max?: number;
  /** Visual variant. */
  variant?: ProgressVariant;
  /** Bar thickness size. */
  size?: ProgressSize;
  /** Optional label shown above the bar. */
  label?: string;
  /** Shows the percentage indicator on the right side of the label. */
  showValue?: boolean;
  /** Animated barber-pole stripes for indeterminate / ongoing operations. */
  animated?: boolean;
};

/**
 * Accessible progress bar with smooth transitions, multiple color variants,
 * size options, and optional percentage indicators.
 * @param props - ProgressBar component properties.
 * @returns ProgressBar element.
 */
export function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    max = 100,
    variant = 'primary',
    size = 'md',
    label,
    showValue = false,
    animated = false,
    className,
    ...rest
  } = props;

  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div {...rest} className={cn('flex flex-col gap-1.5 w-full', className)}>
      {(label ?? showValue) && (
        <div className="flex items-center justify-between text-xs font-medium text-foreground">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-muted-foreground">{percentage}%</span>}
        </div>
      )}

      <progress
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
        className={cn('w-full rounded-full bg-muted overflow-hidden relative', sizeMap[size])}
      >
        <div
          style={{ width: `${percentage}%` }}
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantColorMap[variant],
            animated &&
              'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-length:1rem_1rem animate-[move-bg_1s_linear_infinite]',
          )}
        />
      </progress>
    </div>
  );
}
