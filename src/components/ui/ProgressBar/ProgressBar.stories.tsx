import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI / ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible progress bar with status color schemes, smooth width animations, and label/value indicators.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'gradient'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    showValue: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
  args: {
    value: 65,
    variant: 'primary',
    size: 'md',
    showValue: true,
    label: 'Course Completion',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <ProgressBar label="Default Primary" value={45} showValue variant="primary" />
      <ProgressBar label="Portfolio Target Met" value={100} showValue variant="success" />
      <ProgressBar label="Risk Limit Nearing" value={82} showValue variant="warning" />
      <ProgressBar label="Storage Quota Exceeded" value={95} showValue variant="error" />
      <ProgressBar label="Fintech Dual-Domain Gradient" value={70} showValue variant="gradient" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <ProgressBar label="Small (1.5)" size="sm" value={50} showValue />
      <ProgressBar label="Medium (2.5)" size="md" value={50} showValue />
      <ProgressBar label="Large (4)" size="lg" value={50} showValue />
    </div>
  ),
};
