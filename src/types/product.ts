export interface Product {
  id?: string
  title?: string
  description?: string
  imageSrc?: string
  price?: string
  currency?: string
  handle?: string
  url?: string

  tags?: string[]
  category?: string
  variantId?: string

  variants?: {
    id: string
    title: string
    color: string
    price?: string
    currency?: string
    show_price?: boolean
    description?: string
  }[]

  size?: string
  medium?: string
  availability?: string
  signedBy?: string
  yearCreated?: string
  show_price?: boolean
  has_print?: boolean
  has_nft?: boolean
}
