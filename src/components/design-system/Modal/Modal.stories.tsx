// oxlint-disable react-hooks/rules-of-hooks
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI / Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible modal dialog with backdrop blur, scroll locking, ESC key dismissal, and header/body/footer subcomponents.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    preventBackdropClose: { control: 'boolean' },
  },
  args: {
    isOpen: true,
    size: 'md',
    preventBackdropClose: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const InteractiveDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Transfer Modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalHeader>
            <ModalTitle>Execute Transfer</ModalTitle>
            <ModalDescription>Transfer funds between internal trading accounts.</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input label="Amount (USD)" type="number" defaultValue="5000" />
              <Input label="Destination Account" defaultValue="Margin Account (****-8821)" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              appearance="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Confirm Transfer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const DestructiveConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Button
          variant="destructive"
          onClick={() => {
            setOpen(true);
          }}
        >
          Liquidate Position
        </Button>
        <Modal
          size="sm"
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <ModalHeader>
            <ModalTitle>Confirm Liquidation</ModalTitle>
            <ModalDescription>
              Are you sure you want to close all active long contracts? This action cannot be
              undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button
              appearance="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Dismiss
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setOpen(false);
              }}
            >
              Liquidate Now
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};
