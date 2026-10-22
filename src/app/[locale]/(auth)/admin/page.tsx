import { setRequestLocale } from 'next-intl/server';

export default async function AdminPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <>aaaaaaaaaaaaaa</>;
}
