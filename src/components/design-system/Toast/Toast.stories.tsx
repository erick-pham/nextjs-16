import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../Button/Button';
import { Toast, ToastProvider, useToast } from './Toast';

function PremiumToastNotificationDemo() {
  const { toast } = useToast();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 p-6 sm:p-10">
      {/* Title */}
      <h2 className="text-center text-xl font-extrabold tracking-wide text-foreground uppercase sm:text-2xl">
        PREMIUM TOAST NOTIFICATION
      </h2>

      {/* Top 4 Trigger Buttons matching the mockup */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        <Button
          variant="success"
          onClick={() => toast.success('Success', 'Everything went smoothly!')}
        >
          Success
        </Button>

        <Button
          variant="info"
          onClick={() => toast.info('Info', 'This is some information for you.')}
        >
          Info
        </Button>

        <Button
          variant="warning"
          onClick={() => toast.warning('Warning', 'Be careful with this next step.')}
        >
          Warning
        </Button>

        <Button variant="destructive" onClick={() => toast.error('Error', 'Something went wrong.')}>
          Error
        </Button>
      </div>

      {/* Stacked Preview Cards matching the attachment exactly */}
      <div className="mt-2 flex w-full flex-col gap-3.5">
        <Toast variant="success" title="Success" description="Everything went smoothly!" />

        <Toast variant="info" title="Info" description="This is some information for you." />

        <Toast variant="warning" title="Warning" description="Be careful with this next step." />

        <Toast variant="error" title="Error" description="Something went wrong." />

        <Toast
          variant="info"
          title="System Update Available"
          description="Version 2.4.0 is ready for installation."
          action={{
            label: 'Restart and Update Now →',
            onClick: () => {
              // oxlint-disable-next-line no-alert
              alert('Updating system...');
            },
          }}
        />
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'UI / Toast',
  component: PremiumToastNotificationDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Premium Toast Notifications with vibrant gradient surfaces, translucent squircle icon badges, floating background bokeh circles, and circular dismiss buttons.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const PremiumToastNotification: Story = {};
