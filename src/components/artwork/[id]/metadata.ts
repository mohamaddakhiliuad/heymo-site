import { artworks } from '@/data/artworks'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const artwork = artworks.find((a) => a.id === params.id)

  if (!artwork) return {}

  return {
    title: `${artwork.title} | Noura Gallery`,
    description: artwork.description?.slice(0, 150),
    openGraph: {
      images: artwork.media[0]?.src,
    },
  }
}
