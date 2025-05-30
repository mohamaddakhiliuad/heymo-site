export interface Product {
  id?: string
  title?: string
  description?: string
  descriptionHtml?: string
  imageSrc?: string
  price?: string
  currency?: string
  handle?: string
  url?: string
  tags?: string[]           // ✅ Shopify product tags for filtering
  category?: string         // ✅ Shopify productType (used as category)
  variantId?: string
  variants?: {
    id: string
    title: string
    color: string
    image?: string
  }[]

  // ✅ Metafields (from namespace "specs")
  size?: string
  medium?: string
  availability?: string
  signedBy?: string
  yearCreated?: string
}
