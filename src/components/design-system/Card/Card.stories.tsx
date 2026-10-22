import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI / Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Structural surface component with glassmorphism, interactive hover lift, and composable header/content/footer slots.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-380px">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'glass', 'outline', 'subtle'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Review your latest financial position</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-2xl font-bold tracking-tight text-foreground">
            $128,450.00
          </span>
          <span className="text-success flex items-center gap-1 text-xs font-medium">
            ▲ +14.2% from last month
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">Updated 2m ago</span>
        <Button size="sm" appearance="outline">
          View Ledger
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const InteractiveCourseCard: Story = {
  render: (args) => (
    <Card {...args} variant="interactive">
      <CardHeader>
        <div className="flex items-center justify-between pb-2">
          <Badge color="info">EdTech</Badge>
          <span className="text-xs text-muted-foreground">8 Modules</span>
        </div>
        <CardTitle>Algorithmic Trading Systems</CardTitle>
        <CardDescription>
          Master backtesting, statistical arbitrage, and execution engines in Python.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 rounded-full bg-primary" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">75% completed</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Resume Course</Button>
      </CardFooter>
    </Card>
  ),
};

export const GlassEffect: Story = {
  render: (args) => (
    <div className="rounded-3xl bg-linear-to-tr from-primary/20 via-background to-secondary/30 p-8">
      <Card {...args} variant="glass">
        <CardHeader>
          <CardTitle>Glassmorphism Surface</CardTitle>
          <CardDescription>Backdrop blur effect with subtle translucent border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80">
            Ideal for dark-mode financial dashboards and overlay HUD components.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
