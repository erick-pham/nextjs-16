import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DollarSign, Eye, Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI / Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text field with start/end adornments, standard & premium stacked card variants, floating label, error state, and helper text. Supports `tabular-nums` for financial data.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['default', 'premium'] },
    accentColor: { control: 'radio', options: ['emerald', 'primary'] },
    floatingLabel: { control: 'boolean' },
    success: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder…',
    size: 'md',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Exact layout matching the Premium Email Input mockup with icon squircle, stacked label, and success checkmark */
export const PremiumEmailInput: Story = {
  args: {
    variant: 'premium',
    label: 'Email',
    defaultValue: 'test@gmail.com',
    startAdornment: <Mail className="h-5 w-5" />,
    success: true,
  },
};

/** Interactive demo of the Premium variant validating email format on the fly */
// export const PremiumEmailInteractive: Story = {
//   render: () => {
//     const [email, setEmail] = useState('test@gmail.com');
//     const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/iu.test(email);

//     return (
//       <div className="flex w-88 flex-col gap-2">
//         <Input
//           variant="premium"
//           label="Email"
//           placeholder="yourname@domain.com"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//           }}
//           startAdornment={<Mail className="h-5 w-5" />}
//           success={isValid && email.length > 0}
//           helperText={isValid ? 'Email format is verified' : 'Enter a valid email address'}
//         />
//       </div>
//     );
//   },
// };

export const PremiumWithError: Story = {
  args: {
    variant: 'premium',
    label: 'Email',
    defaultValue: 'invalid-email',
    startAdornment: <Mail className="h-5 w-5" />,
    error: 'Please enter a valid email address.',
  },
};

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com' },
};

export const WithHelperText: Story = {
  args: {
    label: 'Portfolio Value',
    placeholder: '0.00',
    helperText: 'Total current market value in USD',
    startAdornment: <DollarSign size={14} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Amount',
    placeholder: '0.00',
    error: 'Amount must be greater than 0',
    startAdornment: <DollarSign size={14} />,
    value: '-1',
  },
};

export const StartAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search securities…',
    startAdornment: <Search size={14} />,
  },
};

export const EndAdornment: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    endAdornment: <Eye size={14} />,
  },
};

export const BothAdornments: Story = {
  args: {
    label: 'Investment Amount',
    placeholder: '1,000.00',
    startAdornment: <span className="text-xs font-semibold">VND</span>,
    endAdornment: <span className="text-xs text-muted-foreground">.00</span>,
    type: 'number',
  },
};

export const FloatingLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: '',
    floatingLabel: true,
  },
};

export const FloatingLabelWithAdornment: Story = {
  args: {
    label: 'Email',
    placeholder: '',
    floatingLabel: true,
    startAdornment: <Mail size={14} />,
    required: true,
  },
};

export const Disabled: Story = {
  args: { label: 'Account ID', value: 'FIN-2025-00123', disabled: true },
};

export const ReadOnly: Story = {
  args: { label: 'IBAN', value: 'DE89 3704 0044 0532 0130 00', readOnly: true },
};

export const Required: Story = {
  args: {
    label: 'National ID',
    placeholder: 'Enter your national ID',
    required: true,
    helperText: 'Required for KYC verification',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Search…',
    size: 'sm',
    startAdornment: <Search size={12} />,
  },
};

export const LargeSize: Story = {
  args: { label: 'Primary Email', placeholder: 'you@example.com', size: 'lg' },
};
