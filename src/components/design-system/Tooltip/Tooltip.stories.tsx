import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Copy, Download, HelpCircle, Plus, Settings, Trash2 } from 'lucide-react';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI / Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Premium Tooltip component inspired by Toast: vibrant gradient surfaces, translucent squircle icon badges, background bokeh circles, keyboard shortcuts, rich card layouts, and matching directional arrows.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'info', 'success', 'warning', 'error'],
      description: 'Visual gradient theme matching Toast',
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Positioning relative to trigger',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show the directional arrow indicator',
    },
    delay: { control: 'number', description: 'Hover delay in milliseconds' },
    shortcut: { control: 'text', description: 'Keyboard shortcut label' },
  },
  args: {
    content: 'View candlestick market chart',
    variant: 'default',
    position: 'top',
    arrow: true,
    delay: 100,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div className="p-16">
      <Tooltip {...args}>
        <Button appearance="outline">Hover or Focus Me</Button>
      </Tooltip>
    </div>
  ),
};

export const WithShortcut: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 p-16">
      <Tooltip content="Quick search" shortcut="⌘K" position={args.position}>
        <Button appearance="outline" size="sm">
          Search
        </Button>
      </Tooltip>

      <Tooltip content="Save changes" shortcut="⌘S" variant="primary" position={args.position}>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </Tooltip>

      <Tooltip content="Copy link" shortcut="⌘C" variant="info" position={args.position}>
        <Button appearance="outline" variant="info" size="sm">
          Share
        </Button>
      </Tooltip>
    </div>
  ),
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4 p-16">
      <Tooltip content="Default dark gradient" variant="default" position={args.position}>
        <Button appearance="outline" size="sm">
          Default
        </Button>
      </Tooltip>

      <Tooltip content="Primary royal gradient" variant="primary" position={args.position}>
        <Button variant="primary" size="sm">
          Primary
        </Button>
      </Tooltip>

      <Tooltip content="Informational hint" variant="info" position={args.position}>
        <Button variant="info" size="sm">
          Info
        </Button>
      </Tooltip>

      <Tooltip content="Action succeeded" variant="success" position={args.position}>
        <Button variant="success" size="sm">
          Success
        </Button>
      </Tooltip>

      <Tooltip content="Requires attention" variant="warning" position={args.position}>
        <Button variant="warning" size="sm">
          Warning
        </Button>
      </Tooltip>

      <Tooltip content="Irreversible action" variant="error" position={args.position}>
        <Button variant="destructive" size="sm">
          Error
        </Button>
      </Tooltip>
    </div>
  ),
};

export const RichCards: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6 p-20">
      <Tooltip
        title="Automated Yield"
        description="Earn up to 8.4% APY calculated hourly"
        variant="success"
        position={args.position}
        showIcon
      >
        <Button variant="success" appearance="outline" size="sm">
          Hover for APY
        </Button>
      </Tooltip>

      <Tooltip
        title="Pro Feature"
        description="Unlock multi-exchange algorithmic rebalancing"
        variant="primary"
        shortcut="PRO"
        position={args.position}
        showIcon
      >
        <Button variant="primary" size="sm">
          Smart Order
        </Button>
      </Tooltip>

      <Tooltip
        title="Network Congestion"
        description="Gas fees currently elevated (+24%)"
        variant="warning"
        position="bottom"
        showIcon
      >
        <Button variant="warning" appearance="outline" size="sm">
          Fee Warning
        </Button>
      </Tooltip>

      <Tooltip
        title="Permanent Deletion"
        description="Wallet keys and history will be purged"
        variant="error"
        position={args.position}
        showIcon
      >
        <Button variant="destructive" appearance="outline" size="sm">
          Delete Wallet
        </Button>
      </Tooltip>
    </div>
  ),
};

export const AllPositions: Story = {
  render: (args) => (
    <div className="flex items-center gap-6 p-24">
      <Tooltip content="Tooltip on top" position={args.position} variant="primary">
        <Button appearance="outline" size="sm">
          Top
        </Button>
      </Tooltip>

      <Tooltip content="Tooltip on bottom" position="bottom" variant="info">
        <Button appearance="outline" size="sm">
          Bottom
        </Button>
      </Tooltip>

      <Tooltip content="Tooltip on left" position="left" variant="success">
        <Button appearance="outline" size="sm">
          Left
        </Button>
      </Tooltip>

      <Tooltip content="Tooltip on right" position="right" variant="default">
        <Button appearance="outline" size="sm">
          Right
        </Button>
      </Tooltip>
    </div>
  ),
};

export const ToolbarIconTooltips: Story = {
  render: (args) => (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-xs">
      <Tooltip content="Create new transaction" shortcut="N" position={args.position}>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="New transaction"
        >
          <Plus className="h-4 w-4" />
        </button>
      </Tooltip>

      <Tooltip content="Copy wallet address" shortcut="⌘C" variant="info" position={args.position}>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Copy address"
        >
          <Copy className="h-4 w-4" />
        </button>
      </Tooltip>

      <Tooltip
        content="Export statement as CSV"
        shortcut="⌘E"
        variant="success"
        position={args.position}
      >
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Export CSV"
        >
          <Download className="h-4 w-4" />
        </button>
      </Tooltip>

      <Tooltip
        title="Settings & Security"
        description="Manage 2FA, API keys, and notification channels"
        variant="default"
        position="bottom"
      >
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </Tooltip>

      <div className="h-5 w-px bg-border" />

      <Tooltip content="Delete transaction" variant="error" shortcut="⌫" position={args.position}>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-rose-600 transition-colors hover:bg-rose-500/10 dark:text-rose-400"
          aria-label="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </Tooltip>

      <Tooltip
        title="Need help?"
        description="Browse documentation or contact 24/7 VIP support"
        variant="primary"
        position="bottom"
        showIcon
      >
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  ),
};
