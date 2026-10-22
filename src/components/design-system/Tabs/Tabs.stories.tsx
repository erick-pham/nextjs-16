import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Lock,
  PieChart,
  Settings,
  Shield,
  User,
  Wallet,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card/Card';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI / Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Premium Tabs navigation supporting pill (segmented), underline, glassmorphism, and enclosed variants with semantic color palettes, full WAI-ARIA keyboard navigation, icons, and counter badges.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-135 max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'underline', 'glass', 'enclosed'],
      description: 'Surface styling treatment',
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'info', 'success', 'warning', 'error'],
      description: 'Semantic accent color for active indicator',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset for tab items',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
  args: {
    variant: 'pill',
    color: 'neutral',
    size: 'md',
    orientation: 'horizontal',
    defaultValue: 'overview',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const PillVariant: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview" variant="pill">
      <TabList>
        <Tab value="overview" icon={<BarChart3 className="h-4 w-4" />}>
          Overview
        </Tab>
        <Tab value="analytics" icon={<PieChart className="h-4 w-4" />} badge="Live">
          Analytics
        </Tab>
        <Tab value="reports" icon={<FileText className="h-4 w-4" />} badge={3}>
          Reports
        </Tab>
        <Tab value="settings" icon={<Settings className="h-4 w-4" />} disabled>
          Settings
        </Tab>
      </TabList>

      <TabPanel value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Market Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              S&P 500 index tracking at +1.8% intraday with strong volume across high-frequency
              semiconductor liquidity pools.
            </p>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Quantitative Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sharpe Ratio: 2.14 · Alpha: +3.8% · Max Drawdown: -4.2% · Real-time telemetry synced.
            </p>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Statements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              3 automated compliance and tax audit statements available for immediate download.
            </p>
          </CardContent>
        </Card>
      </TabPanel>
    </Tabs>
  ),
};

export const UnderlineVariant: Story = {
  render: () => (
    <Tabs defaultValue="curriculum" variant="underline" color="primary">
      <TabList>
        <Tab value="curriculum" icon={<FileText className="h-4 w-4" />}>
          Curriculum
        </Tab>
        <Tab value="instructors" icon={<User className="h-4 w-4" />}>
          Instructors
        </Tab>
        <Tab value="reviews" badge="128">
          Student Reviews
        </Tab>
      </TabList>
      <TabPanel value="curriculum" className="pt-3">
        <p className="text-sm text-foreground">
          12 comprehensive video modules covering algorithmic execution strategies, dark pool
          arbitrage, and statistical risk modeling.
        </p>
      </TabPanel>
      <TabPanel value="instructors" className="pt-3">
        <p className="text-sm text-foreground">
          Led by Dr. Evelyn Vance, former lead quantitative researcher at Citadel Securities.
        </p>
      </TabPanel>
      <TabPanel value="reviews" className="pt-3">
        <p className="text-sm text-foreground">
          ⭐ 4.9/5 rating across 1,400+ verified software and financial engineers worldwide.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const EnclosedVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="enclosed">
      <TabList fullWidth>
        <Tab value="account" icon={<User className="h-4 w-4" />}>
          Account
        </Tab>
        <Tab value="billing" icon={<CreditCard className="h-4 w-4" />}>
          Billing
        </Tab>
        <Tab value="security" icon={<Shield className="h-4 w-4" />} badge="2FA">
          Security
        </Tab>
      </TabList>
      <TabPanel value="account" className="pt-2">
        <p className="text-sm text-muted-foreground">
          Manage your personal profile, email preferences, and developer API credentials.
        </p>
      </TabPanel>
      <TabPanel value="billing" className="pt-2">
        <p className="text-sm text-muted-foreground">
          Pro tier active ($49/mo). Next renewal on November 15, 2026 via Stripe.
        </p>
      </TabPanel>
      <TabPanel value="security" className="pt-2">
        <p className="text-sm text-muted-foreground">
          Hardware YubiKey authentication enabled. 0 suspicious login attempts detected.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const ColorPalettes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Primary
        </span>
        <Tabs defaultValue="t1" variant="pill" color="primary">
          <TabList>
            <Tab value="t1">Overview</Tab>
            <Tab value="t2">Transactions</Tab>
            <Tab value="t3">Settings</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Success / Yield
        </span>
        <Tabs defaultValue="t1" variant="pill" color="success">
          <TabList>
            <Tab value="t1" badge="Active">
              Staking Pool
            </Tab>
            <Tab value="t2">Rewards</Tab>
            <Tab value="t3">History</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Info / Blue
        </span>
        <Tabs defaultValue="t1" variant="underline" color="info">
          <TabList>
            <Tab value="t1">Documentation</Tab>
            <Tab value="t2" badge="New">
              API References
            </Tab>
            <Tab value="t3">Changelog</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Warning / Amber
        </span>
        <Tabs defaultValue="t1" variant="pill" color="warning">
          <TabList>
            <Tab value="t1">System Status</Tab>
            <Tab value="t2" badge="Degraded">
              Latency
            </Tab>
            <Tab value="t3">Incidents</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Error / Danger
        </span>
        <Tabs defaultValue="t1" variant="pill" color="error">
          <TabList>
            <Tab value="t1">Audit Log</Tab>
            <Tab value="t2" badge={12}>
              Breaches
            </Tab>
            <Tab value="t3">Quarantine</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
      <Tabs defaultValue="profile" orientation="vertical" variant="underline" color="primary">
        <TabList className="w-48 shrink-0">
          <Tab value="profile" icon={<User className="h-4 w-4" />}>
            Profile
          </Tab>
          <Tab value="wallet" icon={<Wallet className="h-4 w-4" />}>
            Billing & Cards
          </Tab>
          <Tab value="security" icon={<Lock className="h-4 w-4" />}>
            Security & 2FA
          </Tab>
          <Tab value="notifications" icon={<Bell className="h-4 w-4" />} badge={2}>
            Notifications
          </Tab>
        </TabList>

        <div className="flex-1 pl-2">
          <TabPanel value="profile">
            <h4 className="text-sm font-bold text-foreground">User Profile</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Update avatar, handle name, bio, and connected public GitHub / LinkedIn accounts.
            </p>
          </TabPanel>
          <TabPanel value="wallet">
            <h4 className="text-sm font-bold text-foreground">Billing Methods</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Visa ending in 4242 · Next automated invoice $49 USD on Nov 1st.
            </p>
          </TabPanel>
          <TabPanel value="security">
            <h4 className="text-sm font-bold text-foreground">Security Overview</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Passkeys enabled. Hardware FIDO2 keys configured for maximum authorization security.
            </p>
          </TabPanel>
          <TabPanel value="notifications">
            <h4 className="text-sm font-bold text-foreground">Notification Channels</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              SMS critical alerts active. Daily digest email delivered at 08:00 UTC.
            </p>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Small (sm)</span>
        <Tabs defaultValue="1" size="sm" variant="pill">
          <TabList>
            <Tab value="1">1D</Tab>
            <Tab value="2">1W</Tab>
            <Tab value="3">1M</Tab>
            <Tab value="4">1Y</Tab>
            <Tab value="5">ALL</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Medium (md)</span>
        <Tabs defaultValue="1" size="md" variant="pill">
          <TabList>
            <Tab value="1">Overview</Tab>
            <Tab value="2">Orders</Tab>
            <Tab value="3">Trades</Tab>
          </TabList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Large (lg)</span>
        <Tabs defaultValue="1" size="lg" variant="pill">
          <TabList>
            <Tab value="1">Deposit</Tab>
            <Tab value="2">Withdraw</Tab>
            <Tab value="3">Transfer</Tab>
          </TabList>
        </Tabs>
      </div>
    </div>
  ),
};
