export const dynamic = 'force-dynamic'

type ProductPageProps = {
  params: { handle: string }
}

const ProductPage = async ({ params }: ProductPageProps): Promise<JSX.Element> => {
  return (
    <div style={{ padding: '2rem', fontSize: '1.25rem' }}>
      <p>Hello! This is a placeholder page for product: <strong>{params.handle}</strong></p>
    </div>
  )
}

export default ProductPage
