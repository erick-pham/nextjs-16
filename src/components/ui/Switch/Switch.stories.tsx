import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'UI / Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle switch with spring-eased thumb animation, sm/md sizes, and left/right label position.',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    labelPosition: { control: 'radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Enable notifications',
    size: 'md',
    labelPosition: 'right',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
};

export const SmallSize: Story = {
  args: { size: 'sm', label: 'Compact view' },
};

export const LabelLeft: Story = {
  args: { label: 'Real-time quotes', labelPosition: 'left' },
};

export const WithDescription: Story = {
  args: {
    label: 'Margin trading',
    description: 'Allows leveraged positions. Higher risk.',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: { label: 'Two-factor auth (managed by admin)', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Compliance mode', disabled: true, defaultChecked: true },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

/** Interactive list of settings toggles. */
export const SettingsPanel: Story = {
  render: () => {
    // oxlint-disable-next-line react-hooks/rules-of-hooks
    const [settings, setSettings] = useState({
      realtime: true,
      alerts: false,
      twofa: true,
      newsletter: false,
    });
    const toggle = (key: keyof typeof settings) => {
      setSettings((s) => ({ ...s, [key]: !s[key] }));
    };

    return (
      <div className="flex w-72 flex-col gap-5 rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
        <Switch
          label="Real-time quotes"
          description="Live market data stream"
          checked={settings.realtime}
          onChange={() => {
            toggle('realtime');
          }}
        />
        <Switch
          label="Price alerts"
          description="Get notified on key movements"
          checked={settings.alerts}
          onChange={() => {
            toggle('alerts');
          }}
        />
        <Switch
          label="Two-factor auth"
          description="Secured via authenticator app"
          checked={settings.twofa}
          onChange={() => {
            toggle('twofa');
          }}
        />
        <Switch
          label="Newsletter"
          checked={settings.newsletter}
          onChange={() => {
            toggle('newsletter');
          }}
        />
      </div>
    );
  },
};
