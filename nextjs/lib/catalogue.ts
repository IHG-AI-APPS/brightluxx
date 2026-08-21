export type Product = {
  id: string;
  slug: string;
  name: string;
  product_code: string;
  category: string;
  sub_category?: string;
  application?: string;
  pixel_pitch?: string;
  brightness?: string;
  refresh_rate?: string;
  image_url?: string;
  description?: string;
  key_specs?: { label: string; value: string }[];
};

type ProductsResponse = Product[] | { products?: Product[]; data?: Product[] };

export const categoryLabels: Record<string, string> = {
  'cob-microled': 'COB MicroLED', mip: 'MiP', indoor: 'Fine Pitch Indoor', 'all-in-one': 'All-in-One',
  'cinema-led': 'Cinema LED', dvled: 'DVLED Cinema', outdoor: 'Outdoor', transparent: 'Transparent',
  flexible: 'Flexible / Creative', 'custom-shapes': 'Custom Shapes', sphere: 'LED Sphere', 'naked-eye-3d': 'Naked-Eye 3D',
  'ceiling-led': 'Ceiling / Sky Screen', 'digital-signage': 'Digital Signage', 'smart-tv': 'Smart TVs',
  'ready-made': 'Ready-Made', interactive: 'Interactive Floor', 'virtual-production': 'Virtual Production',
  'poster-totem': 'LED Poster / Totem', 'shelf-edge': 'Shelf Edge', 'road-signal': 'Road Signals', accessories: 'Accessories',
  'art-immersive': 'Art & XR', 'home-cinema': 'Home Cinema',
};

function normalizedProduct(product: Product): Product {
  const refresh = product.refresh_rate || product.key_specs?.find((item) => item.label.toLowerCase() === 'refresh rate')?.value;
  return { ...product, refresh_rate: refresh };
}

export async function getCatalogue(): Promise<Product[]> {
  const apiOrigin = process.env.API_ORIGIN;
  if (!apiOrigin) throw new Error('API_ORIGIN must be configured');
  const response = await fetch(`${apiOrigin}/api/products`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);
  const payload = await response.json() as ProductsResponse;
  const products = Array.isArray(payload) ? payload : (payload.products || payload.data || []);
  return products.map(normalizedProduct);
}