// setVariantMetafields.js

const SHOPIFY_DOMAIN = 'xrxnq7-16.myshopify.com';
const TOKEN = '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';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

console.log("🟢 Script started. Domain:", SHOPIFY_DOMAIN);

// متافیلدهایی که باید مقداردهی شوند
const METAFIELDS_TO_SET = [
  { namespace: "custom", key: "show_price", type: "boolean", value: true },
  { namespace: "custom", key: "description", type: "multi_line_text_field", value: " artwork." }
];

// دریافت همه محصولات و وریانت‌هایشان
async function getAllProducts() {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/products.json?limit=250`, {
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    }
  });

  const json = await res.json();
  return json.products || [];
}

// نوشتن متافیلد جدید برای هر وریانت
async function setVariantMetafield(variantId, namespace, key, type, value) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-01/variants/${variantId}/metafields.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metafield: {
        namespace,
        key,
        type,
        value: value
      }
    })
  });

  if (res.ok) {
    console.log(`✅ Set ${key} = ${value} (${type}) for variant ${variantId}`);
  } else {
    const error = await res.text();
    console.error(`❌ Failed to set ${key} for variant ${variantId}:`, error);
  }
}

// اجرای فرآیند برای همه وریانت‌ها
async function process() {
  const products = await getAllProducts();
  console.log(`🔍 Found ${products.length} products.`);

  for (const product of products) {
    for (const variant of product.variants || []) {
      for (const field of METAFIELDS_TO_SET) {
        await setVariantMetafield(
          variant.id,
          field.namespace,
          field.key,
          field.type,
          field.value
        );
      }
    }
  }
}

process().catch(err => console.error("💥 Unexpected error:", err));
