import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Style variant — controls the visual treatment of the button surface. */
export type ButtonVariant = 'contained' | 'outlined' | 'text';

/** Color token — maps to a semantic palette applied across all variants. */
export type ButtonColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

/** All available size options for the Button component. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the Button component. */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Style variant: contained (filled), outlined (bordered), or text (flat). */
  variant?: ButtonVariant;
  /** Semantic color palette applied to the variant. */
  color?: ButtonColor;
  /** Size preset. */
  size?: ButtonSize;
  /** Shows an animated spinner and disables interaction. */
  isLoading?: boolean;
  /** Icon element to render before the label. */
  iconLeft?: ReactNode;
  /** Icon element to render after the label. */
  iconRight?: ReactNode;
  /** Makes the button fill its container width. */
  fullWidth?: boolean;
};
