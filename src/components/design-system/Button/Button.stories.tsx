import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Download, Plus } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI / Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button with a 2-axis design system: `variant` (contained | outlined | text) × `color` (primary | secondary | info | success | warning | error). Supports 3 sizes, loading state, and icon slots.',
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'radio',
      options: ['solid', 'gradient', 'outline', 'ghost'],
      description: 'Surface treatment',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'destructive'],
      description: 'Surface treatment',
    },
    size: {
      control: 'radio',
      options: ['default', 'sm', 'md', 'lg'],
      description: 'Size preset',
    },
    loading: {
      control: 'boolean',
      description: 'Shows spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    appearance: 'default',
    variant: 'primary',
    size: 'default',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── State stories ─────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Submitting…' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Unavailable' },
};

export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    children: 'Add Item',
    iconLeft: <Plus size={16} aria-hidden="true" />,
  },
};

export const WithIconRight: Story = {
  args: {
    appearance: 'outline',
    variant: 'primary',
    children: 'Download Report',
    iconRight: <Download size={16} aria-hidden="true" />,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Complete Purchase',
  },
  parameters: { layout: 'padded' },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

const VARIANTS = ['primary', 'secondary', 'info', 'success', 'warning', 'destructive'] as const;
const appearanceS = ['default', 'outline', 'gradient', 'ghost'] as const;

/** Full variant × color matrix. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {appearanceS.map((appearance) => (
        <div key={appearance} className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {appearance}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {VARIANTS.map((variant) => (
              <Button key={variant} variant={variant} appearance={appearance}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/** All sizes shown together. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
