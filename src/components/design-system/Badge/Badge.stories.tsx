// oxlint-disable no-alert
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI / Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge with a 2-axis design system: `variant` (soft | solid | outlined) × `color` (neutral | primary | secondary | info | success | warning | error). Supports status dots, icons, and removable dismiss.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['soft', 'solid', 'outlined'],
      description: 'Surface treatment',
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'error'],
      description: 'Semantic color palette',
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
    disable: { control: 'boolean' },
    pulse: { control: 'boolean' },
  },
  args: {
    children: 'Badge',
    variant: 'soft',
    color: 'neutral',
    size: 'sm',
    dot: false,
    disable: false,
    pulse: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ── State stories ─────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { color: 'neutral', children: 'Archived', disable: true },
};

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        color="primary"
        onRemove={() => {
          alert('Removed');
        }}
      >
        Fintech
      </Badge>
      <Badge
        color="info"
        onRemove={() => {
          alert('Removed');
        }}
      >
        Machine Learning
      </Badge>
      <Badge
        color="success"
        onRemove={() => {
          alert('Removed');
        }}
      >
        Completed
      </Badge>
    </div>
  ),
};

export const StatusDotsWithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color="success" dot pulse>
        Market Open
      </Badge>
      <Badge color="error" dot>
        Market Closed
      </Badge>
      <Badge color="info" dot pulse>
        Live Stream
      </Badge>
      <Badge color="warning" dot>
        Maintenance
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm" color="primary">
        Small (sm)
      </Badge>
      <Badge size="md" color="primary">
        Medium (md)
      </Badge>
    </div>
  ),
};

// ── Showcase ──────────────────────────────────────────────────────────────────

const COLORS = ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;
const VARIANTS = ['soft', 'solid', 'outlined'] as const;

/** Full variant × color matrix. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {variant}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((color) => (
              <Badge key={color} variant={variant} color={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
