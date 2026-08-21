export function StructuredData({ items }: { items: string[] }) {
  return items.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: item }} />);
}