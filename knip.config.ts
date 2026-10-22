import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  ignore: [
    'src/libs/I18n.ts',
    'src/types/I18n.ts',
    'src/components/ui/**/*.{ts,tsx}',
    'src/components/design-system/**/*.{ts,tsx}',
    'src/data/**/*.{ts,tsx}',
    'src/icons/index.tsx',
    'src/libs/shared.ts',
    'src/libs/auth.ts',
  ],
  // Dependencies to ignore during analysis
  ignoreDependencies: [],
  // Include custom Playwright test file suffixes
  playwright: {
    entry: ['tests/**/*.@(integ|e2e).ts'],
  },
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  treatConfigHintsAsErrors: true,
};

export default config;
