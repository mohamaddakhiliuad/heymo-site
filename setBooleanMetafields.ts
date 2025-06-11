// setBooleanMetafields.js

const SHOPIFY_DOMAIN = 'xrxnq7-16.myshopify.com';
const TOKEN = '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';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

console.log("🟢 Script started. Domain:", SHOPIFY_DOMAIN);

// متافیلدهایی که باید مقداردهی شوند
const METAFIELDS_TO_SET = [
  { namespace: "custom", key: "show_price", value: true },
  { namespace: "custom", key: "has_print", value: true },
  { namespace: "custom", key: "has_nft", value: true }
];

// دریافت همه محصولات
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

// نوشتن متافیلد جدید برای هر محصول
async function setMetafield(productId, namespace, key, value) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/products/${productId}/metafields.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metafield: {
        namespace,
        key,
        type: "boolean",
        value: value.toString()
      }
    })
  });

  if (res.ok) {
    const data = await res.json();
    console.log(`✅ Set ${key} = ${value} for product ${productId}`);
  } else {
    const error = await res.text();
    console.error(`❌ Failed to set ${key} for product ${productId}:`, error);
  }
}

// اجرای فرآیند برای همه محصولات
async function process() {
  const products = await getAllProducts();
  console.log(`🔍 Found ${products.length} products.`);

  for (const product of products) {
    for (const field of METAFIELDS_TO_SET) {
      await setMetafield(product.id, field.namespace, field.key, field.value);
    }
  }
}

process().catch(err => console.error("💥 Unexpected error:", err));
