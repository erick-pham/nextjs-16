'use client';

import { useEffect, useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/libs/utils';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export type ModalProps = {
  /** Controls modal visibility. */
  isOpen: boolean;
  /** Callback fired when modal requests closing. */
  onClose: () => void;
  /** Size variant. */
  size?: ModalSize;
  /** Children elements. */
  children: ReactNode;
  /** Prevent closing on backdrop click. */
  preventBackdropClose?: boolean;
  className?: string;
};

/**
 * Accessible dialog modal with backdrop blur, keyboard ESC dismissal,
 * focus containment, and animated entrance.
 * @param props - Input component properties.
 * @returns Input element.
 */
export function Modal(props: ModalProps) {
  const { isOpen, onClose, size = 'md', children, preventBackdropClose = false, className } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // oxlint-disable-next-line typescript/consistent-return
    return (): void => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <dialog aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => {
          if (!preventBackdropClose) {
            onClose();
          }
        }}
        className="fixed inset-0 animate-in bg-background/80 backdrop-blur-sm transition-opacity duration-200 fade-in-0"
      />

      {/* Modal Dialog Content */}
      <div
        ref={contentRef}
        className={cn(
          'relative z-50 w-full rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-2xl',
          'transition-all duration-200 ease-out animate-in zoom-in-95 fade-in-0',
          sizeClasses[size],
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label="Close dialog"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {children}
      </div>
    </dialog>
  );
}

export function ModalHeader(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div {...rest} className={cn('flex flex-col space-y-1.5 pb-4 pr-6', className)} />;
}

export function ModalTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  const { className, children, ...rest } = props;
  return (
    <h2
      {...rest}
      className={cn('text-lg font-semibold leading-none tracking-tight text-foreground', className)}
    >
      {children}
    </h2>
  );
}

export function ModalDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  const { className, ...rest } = props;
  return <p {...rest} className={cn('text-sm text-muted-foreground leading-relaxed', className)} />;
}

export function ModalBody(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return <div {...rest} className={cn('py-2', className)} />;
}

export function ModalFooter(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-border/60 mt-4',
        className,
      )}
    />
  );
}
