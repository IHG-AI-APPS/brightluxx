import type { Metadata } from 'next';
import { getLegacyPage } from '../lib/legacy-content';
import { StructuredData } from '../components/structured-data';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegacyPage('/');
  return { title: page?.title, description: page?.description, alternates: { canonical: page?.canonical } };
}

export default async function HomePage() {
  const page = await getLegacyPage('/');
  return <main data-testid="next-server-rendered-parity-page"><StructuredData items={page?.jsonLd || []} /><div dangerouslySetInnerHTML={{ __html: page?.html || '' }} /></main>;
}