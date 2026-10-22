// oxlint-disable react-hooks/rules-of-hooks
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Checkbox, RadioGroup } from './Checkbox';

/* ═══════════════ Checkbox ════════════════════════════════ */

const checkboxMeta: Meta<typeof Checkbox> = {
  title: 'UI / Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom-styled checkbox with smooth SVG check animation, description slot, and error state.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    label: 'I agree to the Terms of Service',
    disabled: false,
    error: false,
  },
};

export default checkboxMeta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { label: 'Enable email notifications', defaultChecked: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Margin trading',
    description: 'Enables leveraged positions up to 3×. Higher risk.',
    defaultChecked: false,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Accept risk disclosure',
    error: true,
  },
};

export const Disabled: Story = {
  args: { label: 'Two-factor authentication', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Receive platform alerts', disabled: true, defaultChecked: true },
};

/** Multiple checkboxes — simulates a feature list. */
export const FeatureList: Story = {
  render: () => {
    const [state, setState] = useState({ email: true, sms: false, push: true });
    return (
      <div className="flex flex-col gap-4">
        <Checkbox
          label="Email alerts"
          description="Daily portfolio digest"
          checked={state.email}
          onChange={(e) => {
            setState((s) => ({ ...s, email: e.target.checked }));
          }}
        />
        <Checkbox
          label="SMS alerts"
          description="Critical price movements"
          checked={state.sms}
          onChange={(e) => {
            setState((s) => ({ ...s, sms: e.target.checked }));
          }}
          disabled
        />
        <Checkbox
          label="Push notifications"
          description="In-app trade confirmations"
          checked={state.push}
          onChange={(e) => {
            setState((s) => ({ ...s, push: e.target.checked }));
          }}
        />
      </div>
    );
  },
};

/* ═══════════════ RadioGroup ══════════════════════════════ */

export const RadioVertical: Story = {
  render: () => {
    const [val, setVal] = useState('moderate');
    return (
      <RadioGroup
        name="risk-profile"
        label="Risk Profile"
        value={val}
        onChange={setVal}
        options={[
          { value: 'conservative', label: 'Conservative', description: 'Low risk, stable returns' },
          { value: 'moderate', label: 'Moderate', description: 'Balanced risk/reward' },
          { value: 'aggressive', label: 'Aggressive', description: 'High risk, high potential' },
          { value: 'custom', label: 'Custom', disabled: true, description: 'Coming soon' },
        ]}
      />
    );
  },
};

export const RadioHorizontal: Story = {
  render: () => {
    const [val, setVal] = useState('monthly');
    return (
      <RadioGroup
        name="billing-cycle"
        label="Billing Cycle"
        value={val}
        onChange={setVal}
        direction="horizontal"
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' },
          { value: 'annual', label: 'Annual' },
        ]}
      />
    );
  },
};
