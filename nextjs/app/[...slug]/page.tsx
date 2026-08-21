import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndexableRoutes, getLegacyPage } from '../../lib/legacy-content';
import { StructuredData } from '../../components/structured-data';

type Props = { params: Promise<{ slug: string[] }> };
const routeFromParams = (slug: string[]) => `/${slug.join('/')}`;

export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await getIndexableRoutes();
  return pages.filter((page) => page.route !== '/').map((page) => ({ slug: page.route.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getLegacyPage(routeFromParams((await params).slug));
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: page.canonical }, robots: page.route === '/compare' ? { index: false, follow: true } : undefined };
}

export default async function LegacyParityPage({ params }: Props) {
  const page = await getLegacyPage(routeFromParams((await params).slug));
  if (!page) notFound();
  return <main data-testid="next-server-rendered-parity-page"><StructuredData items={page.jsonLd || []} /><div dangerouslySetInnerHTML={{ __html: page.html }} /></main>;
}