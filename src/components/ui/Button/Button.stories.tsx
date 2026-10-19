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
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
      description: 'Surface treatment',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
      description: 'Semantic color palette',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset',
    },
    isLoading: {
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
    variant: 'contained',
    color: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── State stories ─────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { color: 'primary', isLoading: true, children: 'Submitting…' },
};

export const Disabled: Story = {
  args: { color: 'primary', disabled: true, children: 'Unavailable' },
};

export const WithIconLeft: Story = {
  args: {
    color: 'primary',
    children: 'Add Item',
    iconLeft: <Plus size={16} aria-hidden="true" />,
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'Download Report',
    iconRight: <Download size={16} aria-hidden="true" />,
  },
};

export const FullWidth: Story = {
  args: {
    color: 'primary',
    fullWidth: true,
    children: 'Complete Purchase',
  },
  parameters: { layout: 'padded' },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;
const VARIANTS = ['contained', 'outlined', 'text'] as const;

/** Full variant × color matrix. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {variant}
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {COLORS.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
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
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
