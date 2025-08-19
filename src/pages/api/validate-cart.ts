import type { APIRoute } from 'astro';
import products from '../../data/products.json';

// Type definitions for better type safety
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  collection: string;
}

interface ValidationResponse {
  success: boolean;
  items?: CartItem[];
  total?: number;
  error?: string;
}

// Helper function to find product by ID across all collections
function findProductById(productId: string): any | null {
  for (const collectionName in products) {
    const collection = (products as any)[collectionName];
    const product = collection.find((p: any) => p.id === productId);
    if (product) {
      return { ...product, collection: collectionName };
    }
  }
  return null;
}

// Basic rate limiting (in-memory, simple implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(clientIP) || { count: 0, resetTime: now + 60000 }; // 1 minute window
  
  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + 60000;
  }
  
  if (limit.count >= 20) { // Max 20 requests per minute
    return false;
  }
  
  limit.count++;
  rateLimitMap.set(clientIP, limit);
  return true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Basic rate limiting
    const clientIP = clientAddress || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Rate limit exceeded. Please try again later.' 
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const { items } = await request.json();
    
    if (!Array.isArray(items)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid cart items format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate and correct each cart item
    const validatedItems: CartItem[] = [];
    let total = 0;

    for (const item of items) {
      // Input sanitization
      const sanitizedId = String(item.id || '').replace(/[^a-zA-Z0-9-]/g, '');
      const quantity = Math.min(Math.max(1, parseInt(item.quantity) || 1), 10); // Min 1, Max 10
      
      if (!sanitizedId) {
        continue; // Skip invalid items
      }

      // Find product in database
      const productData = findProductById(sanitizedId);
      
      if (!productData) {
        continue; // Skip non-existent products
      }

      // Check stock availability
      if (!productData.in_stock || productData.stock_quantity < quantity) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Product "${productData.name}" is not available in requested quantity` 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Create validated item with SERVER-SIDE price (critical!)
      const validatedItem: CartItem = {
        id: productData.id,
        name: productData.name,
        price: productData.price, // ✅ Server-controlled price
        quantity: quantity,
        image: productData.images[0],
        collection: productData.collection
      };

      validatedItems.push(validatedItem);
      total += validatedItem.price * validatedItem.quantity;
    }

    const response: ValidationResponse = {
      success: true,
      items: validatedItems,
      total: total
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0' // Don't cache sensitive cart data
      }
    });

  } catch (error) {
    console.error('Cart validation error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
