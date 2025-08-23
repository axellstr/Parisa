// API endpoint to serve products data for search functionality
import type { APIRoute } from 'astro';
import productsData from '../../data/products.json';

// Define the product interface
interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price?: number;
  images: string[];
  description: string;
  detailed_description: string;
  collection: string;
  tags: string[];
  specifications: Record<string, string>;
  in_stock: boolean;
  featured: boolean;
  new_arrival: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const GET: APIRoute = async () => {
  try {
    // Transform the data for better search performance
    const flattenedProducts: Product[] = [];
    
    Object.entries(productsData).forEach(([collectionId, products]) => {
      products.forEach((product: any) => {
        flattenedProducts.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          sale_price: product.sale_price,
          images: product.images,
          description: product.description,
          detailed_description: product.detailed_description,
          collection: collectionId,
          tags: product.tags,
          specifications: product.specifications,
          in_stock: product.in_stock,
          featured: product.featured,
          new_arrival: product.new_arrival,
          seo: product.seo
        });
      });
    });

    return new Response(JSON.stringify(flattenedProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error serving products:', error);
    return new Response(JSON.stringify({ error: 'Failed to load products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
