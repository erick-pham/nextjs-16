import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI / Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'User identity avatar supporting image fallback to initials or placeholder icon, Badge-aligned active status indicators with pulse animation, semantic color palettes, and group stacking.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size variant',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'rounded'],
      description: 'Avatar border shape',
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'error'],
      description: 'Semantic color palette matching Badge',
    },
    status: {
      control: 'select',
      options: [
        undefined,
        'online',
        'offline',
        'away',
        'busy',
        'neutral',
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
      ],
      description: 'Active status indicator badge',
    },
    pulse: {
      control: 'boolean',
      description: 'Ping/pulse animation on active status badge',
    },
    disable: {
      control: 'boolean',
      description: 'Disabled state with reduced opacity',
    },
  },
  args: {
    name: 'Sarah Connor',
    size: 'md',
    shape: 'circle',
    color: 'neutral',
    status: 'online',
    pulse: false,
    disable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    alt: 'Sarah Jenkins',
    status: 'online',
    pulse: true,
  },
};

export const FallbackInitials: Story = {
  args: {
    name: 'Erick Pham',
    color: 'primary',
    status: 'online',
  },
};

export const PlaceholderIcon: Story = {
  args: {
    color: 'info',
    status: 'online',
  },
};

export const Disabled: Story = {
  args: {
    name: 'Archived User',
    disable: true,
    status: 'offline',
  },
};

export const ActiveStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Online User" status="online" pulse />
        <span className="text-xs font-medium text-muted-foreground">Online (pulse)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Away User" status="away" />
        <span className="text-xs font-medium text-muted-foreground">Away</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Busy User" status="busy" />
        <span className="text-xs font-medium text-muted-foreground">Busy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Offline User" status="offline" />
        <span className="text-xs font-medium text-muted-foreground">Offline</span>
      </div>
    </div>
  ),
};

export const StatusColorPalette: Story = {
  render: () => {
    const colors = [
      'neutral',
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
    ] as const;
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Badge Semantic Palette on Active Status Dot
        </p>
        <div className="flex flex-wrap items-center gap-6">
          {colors.map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <Avatar
                name={color.charAt(0).toUpperCase() + color.slice(1)}
                status={color}
                pulse={color === 'success' || color === 'primary'}
              />
              <span className="text-xs font-medium text-muted-foreground capitalize">{color}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const StatusDotsWithPulse: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Market Open" status="success" pulse />
        <span className="text-xs font-medium text-muted-foreground">Live (Success)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Streaming" status="info" pulse />
        <span className="text-xs font-medium text-muted-foreground">Streaming (Info)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Alert" status="warning" pulse />
        <span className="text-xs font-medium text-muted-foreground">Warning Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar name="Critical" status="error" pulse />
        <span className="text-xs font-medium text-muted-foreground">Critical Pulse</span>
      </div>
    </div>
  ),
};

export const AvatarColors: Story = {
  render: () => {
    const colors = [
      'neutral',
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
    ] as const;
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Avatar Surface Colors (Soft Tint Matching Badge)
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {colors.map((c) => (
            <Avatar key={c} name={c.charAt(0).toUpperCase() + c.slice(1)} color={c} status={c} />
          ))}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" name="Alex Green" status="online" />
      <Avatar size="sm" name="Bob Ross" status="online" />
      <Avatar size="md" name="Charlie Brown" status="online" pulse />
      <Avatar size="lg" name="David Miller" status="away" />
      <Avatar size="xl" name="Erick Pham" status="busy" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar name="Elena Rostova" status="online" pulse />
      <Avatar name="Marcus Chen" color="primary" status="away" />
      <Avatar name="Aria Stark" color="info" status="busy" />
      <Avatar name="Devin Patel" color="success" />
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground shadow-xs">
        +3
      </div>
    </AvatarGroup>
  ),
};
