import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Select } from './Select';
import type { SelectOption } from './Select';

const assetOptions: SelectOption[] = [
  { value: 'aapl', label: 'Apple Inc.', description: 'AAPL · NASDAQ' },
  { value: 'msft', label: 'Microsoft Corp.', description: 'MSFT · NASDAQ' },
  { value: 'tsla', label: 'Tesla Inc.', description: 'TSLA · NASDAQ' },
  { value: 'goog', label: 'Alphabet Inc.', description: 'GOOG · NASDAQ' },
  { value: 'amzn', label: 'Amazon.com Inc.', description: 'AMZN · NASDAQ', disabled: true },
];

const courseOptions: SelectOption[] = [
  { value: 'js', label: 'JavaScript Fundamentals', description: 'Beginner · 12h' },
  { value: 'react', label: 'React Advanced Patterns', description: 'Advanced · 8h' },
  { value: 'ts', label: 'TypeScript Mastery', description: 'Intermediate · 10h' },
  { value: 'node', label: 'Node.js Backend', description: 'Intermediate · 15h' },
];

const meta: Meta<typeof Select> = {
  title: 'UI / Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom dropdown with optional search, item descriptions, and accessible listbox ARIA roles.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80 pb-64">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    options: assetOptions,
    placeholder: 'Select a security…',
    searchable: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: { label: 'Security', options: assetOptions },
};

export const Searchable: Story = {
  args: {
    label: 'Find a security',
    options: assetOptions,
    searchable: true,
    placeholder: 'Search stocks…',
    helperText: 'Type to filter results',
  },
};

export const WithDescriptions: Story = {
  args: {
    label: 'Course',
    options: courseOptions,
    placeholder: 'Choose a course…',
  },
};

export const WithError: Story = {
  args: {
    label: 'Risk Profile',
    options: [
      { value: 'low', label: 'Conservative' },
      { value: 'med', label: 'Moderate' },
      { value: 'high', label: 'Aggressive' },
    ],
    error: 'Please select a risk profile',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account Type',
    options: assetOptions,
    disabled: true,
    value: 'aapl',
  },
};

/** Interactive story with controlled state. */

/**
 * @param props - SelectDemo component properties.
 * @returns SelectDemo element.
 */
function SelectDemo() {
  const [val, setVal] = useState<string>('');
  return (
    <div className="flex w-80 flex-col gap-3 pb-64">
      <Select
        label="Select a security"
        options={assetOptions}
        value={val}
        onChange={setVal}
        searchable
        placeholder="Choose one…"
      />
      {val && (
        <p className="text-sm text-muted-foreground">
          Selected: <strong className="text-foreground">{val}</strong>
        </p>
      )}
    </div>
  );
}

export const Controlled: Story = {
  render: () => <SelectDemo />,
};
