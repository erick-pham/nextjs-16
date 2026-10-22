import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { MobileNav } from '@/components/shared/MobileNav';
import { TopNavbar } from '@/components/shared/TopNavbar';

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AdminLayoutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'AdminLayout',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AdminLayout(props: AdminLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'AdminPage',
  });

  // The accent attribute switches primary tokens to indigo (see global.css)
  return (
    <div data-theme-accent="indigo">
      <div className="flex min-h-dvh bg-background text-foreground">
        <a
          href="#admin-main"
          className="sr-only z-50 rounded-md bg-background px-3 py-2 text-sm font-medium ring-2 ring-ring focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          {t('skip_to_content')}
        </a>

        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 overflow-y-auto border-r lg:block">
          <AppSidebar />
        </aside>
        <MobileNav>
          <AppSidebar />
        </MobileNav>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar />
          <main
            id="admin-main"
            // ref={mainRef}
            tabIndex={-1}
            className="mx-auto w-full max-w-7xl flex-1 p-4 outline-none sm:p-6"
          >
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}
