// oxlint-disable react-hooks/rules-of-hooks
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Badge } from '../Badge/Badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

const meta: Meta<typeof Table> = {
  title: 'UI / Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Premium data table inspired by Toast and Tabs: frosted glassmorphism surfaces, density controls (sm, md, lg), sortable headers, row selection highlights, zebra striping, and empty states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Visual surface treatment',
    },
    density: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Cell spacing and typography density',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Fixed header during scrolling',
    },
  },
  args: {
    variant: 'default',
    density: 'md',
    stickyHeader: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const transactions = [
  {
    id: 'TX-901',
    asset: 'NVDA',
    name: 'NVIDIA Corp.',
    type: 'BUY',
    shares: 15,
    price: '$124.50',
    total: '$1,867.50',
    status: 'completed' as const,
  },
  {
    id: 'TX-902',
    asset: 'MSFT',
    name: 'Microsoft Corp.',
    type: 'BUY',
    shares: 8,
    price: '$448.20',
    total: '$3,585.60',
    status: 'completed' as const,
  },
  {
    id: 'TX-903',
    asset: 'AAPL',
    name: 'Apple Inc.',
    type: 'SELL',
    shares: 20,
    price: '$224.23',
    total: '$4,484.60',
    status: 'completed' as const,
  },
  {
    id: 'TX-904',
    asset: 'ETH',
    name: 'Ethereum L1',
    type: 'BUY',
    shares: 1.25,
    price: '$3,410.00',
    total: '$4,262.50',
    status: 'pending' as const,
  },
  {
    id: 'TX-905',
    asset: 'SOL',
    name: 'Solana Network',
    type: 'BUY',
    shares: 45,
    price: '$148.10',
    total: '$6,664.50',
    status: 'completed' as const,
  },
];

export const FintechTransactions: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Real-time institutional liquidity trades and settlement states</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Shares</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total Value</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id} selected={tx.id === 'TX-902'}>
            <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
              {tx.id}
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{tx.asset}</span>
                <span className="text-[11px] text-muted-foreground">{tx.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <span
                className={`text-xs font-semibold ${
                  tx.type === 'BUY'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {tx.type}
              </span>
            </TableCell>
            <TableCell className="text-right font-mono tabular-nums">{tx.shares}</TableCell>
            <TableCell className="text-right font-mono tabular-nums">{tx.price}</TableCell>
            <TableCell className="text-right font-mono font-bold tabular-nums">
              {tx.total}
            </TableCell>
            <TableCell className="text-center">
              <Badge
                color={tx.status === 'completed' ? 'success' : 'warning'}
                dot={tx.status === 'pending'}
                pulse={tx.status === 'pending'}
              >
                {tx.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-semibold">
            Total Aggregate Volume
          </TableCell>
          <TableCell className="text-right font-mono text-base font-bold">$20,864.70</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const StripedVariant: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">Allocation</TableHead>
          <TableHead className="text-right">Risk Score</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">US Treasuries (3M)</TableCell>
          <TableCell className="text-right font-mono">40.0%</TableCell>
          <TableCell className="text-right font-mono text-emerald-600">0.12</TableCell>
          <TableCell className="text-center">
            <Badge color="neutral">Risk-Free</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Large-Cap Index (S&P 500)</TableCell>
          <TableCell className="text-right font-mono">35.0%</TableCell>
          <TableCell className="text-right font-mono text-blue-600">0.85</TableCell>
          <TableCell className="text-center">
            <Badge color="primary">Core</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Emerging Markets Tech</TableCell>
          <TableCell className="text-right font-mono">15.0%</TableCell>
          <TableCell className="text-right font-mono text-amber-600">1.45</TableCell>
          <TableCell className="text-center">
            <Badge color="warning">Growth</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Digital Assets (BTC/ETH)</TableCell>
          <TableCell className="text-right font-mono">10.0%</TableCell>
          <TableCell className="text-right font-mono text-rose-600">2.10</TableCell>
          <TableCell className="text-center">
            <Badge color="error">High Beta</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SortableColumns: Story = {
  render: (): ReactElement => {
    const [sortCol, setSortCol] = useState<'asset' | 'shares' | 'price'>('shares');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const toggleSort = (col: 'asset' | 'shares' | 'price') => {
      if (sortCol === col) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortCol(col);
        setSortDir('asc');
      }
    };

    const sortedData = [...transactions].toSorted((a, b) => {
      if (sortCol === 'asset') {
        return sortDir === 'asc' ? a.asset.localeCompare(b.asset) : b.asset.localeCompare(a.asset);
      }
      const valA = sortCol === 'shares' ? a.shares : Number(a.price.replace('$', ''));
      const valB = sortCol === 'shares' ? b.shares : Number(b.price.replace('$', ''));
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortDirection={sortCol === 'asset' ? sortDir : false}
              onSort={() => {
                toggleSort('asset');
              }}
            >
              Asset
            </TableHead>
            <TableHead
              className="text-right"
              sortDirection={sortCol === 'shares' ? sortDir : false}
              onSort={() => {
                toggleSort('shares');
              }}
            >
              Shares
            </TableHead>
            <TableHead
              className="text-right"
              sortDirection={sortCol === 'price' ? sortDir : false}
              onSort={() => {
                toggleSort('price');
              }}
            >
              Price
            </TableHead>
            <TableHead className="text-right">Total Value</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-bold">{row.asset}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{row.shares}</TableCell>
              <TableCell className="text-right font-mono tabular-nums">{row.price}</TableCell>
              <TableCell className="text-right font-mono font-semibold tabular-nums">
                {row.total}
              </TableCell>
              <TableCell className="text-center">
                <Badge color={row.status === 'completed' ? 'success' : 'warning'}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const DensityComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Compact / Dense (sm)
        </span>
        <Table density="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">NVDA</TableCell>
              <TableCell className="text-right font-mono">$124.50</TableCell>
              <TableCell className="text-right font-mono text-emerald-600">+4.2%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">MSFT</TableCell>
              <TableCell className="text-right font-mono">$448.20</TableCell>
              <TableCell className="text-right font-mono text-emerald-600">+1.1%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Comfortable (lg)
        </span>
        <Table density="lg">
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">NVDA</TableCell>
              <TableCell className="text-right font-mono text-base font-semibold">
                $124.50
              </TableCell>
              <TableCell className="text-right font-mono text-base font-bold text-emerald-600">
                +4.2%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty
          colSpan={4}
          title="No Executed Orders"
          description="You do not have any trades matching this filter criteria for the current settlement cycle."
        />
      </TableBody>
    </Table>
  ),
};
