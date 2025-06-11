// deleteMetafields.js

// ✅ به جای dotenv و process.env، دستی مقداردهی می‌کنیم
const SHOPIFY_DOMAIN = 'xrxnq7-16.myshopify.com';
const TOKEN = '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';

// ✅ dynamic import برای node-fetch (چون ESM هست)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

console.log("🟢 Script started. Domain:", SHOPIFY_DOMAIN);

// متافیلدهایی که باید حذف شوند
const METAFIELDS_TO_DELETE = [
  { namespace: "custom", key: "show_price" },
  { namespace: "custom", key: "hasprint" },
  { namespace: "custom", key: "hasnft" }
];

// گرفتن همه محصولات
async function getAllProducts() {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    }
  });

  const json = await res.json();
  return json.products || [];
}

// حذف یک متافیلد خاص از یک محصول
async function deleteMetafield(productId, metafieldId) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/products/${productId}/metafields/${metafieldId}.json`, {
    method: 'DELETE',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    console.log(`✅ Deleted metafield ${metafieldId} from product ${productId}`);
  } else {
    console.error(`❌ Failed to delete metafield ${metafieldId} from product ${productId}`);
  }
}

// اجرای عملیات
async function process() {
  const products = await getAllProducts();
  console.log(`🔍 Found ${products.length} products.`);

  for (const product of products) {
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/products/${product.id}/metafields.json`, {
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json'
      }
    });

    const json = await res.json();
    const metafields = json.metafields || [];

    for (const mf of metafields) {
      const match = METAFIELDS_TO_DELETE.find(d => d.key === mf.key && d.namespace === mf.namespace);
      if (match) {
        await deleteMetafield(product.id, mf.id);
      }
    }
  }
}

process().catch(err => console.error('💥 Unexpected error:', err));
