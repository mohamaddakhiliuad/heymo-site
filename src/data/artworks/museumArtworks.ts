// data/artworks/museumArtworks.ts

export interface Artwork {
  title: string
  imageSrc: string
  location: string
  year?: string
  documentUrl?: string
}

export const museumArtworks: Artwork[] = [
  {
    title: 'Sahar0',
    imageSrc: '/artworks/sahar.jpg',
    location: 'Iranian Handicrafts Museum, Tehran',
    year: '1997',
    documentUrl: '/docs/sahar_certificate.jpg',
  },
  {
    title: 'Tree of Friendship',
    imageSrc: '/artworks/tree_of_friendship_letter.jpg',
    location: 'Beijing National Museum, China',
    year: '1997',
    documentUrl: '/docs/tree_of_friendship_letter.jpg',
  },
  {
    title: 'Spring Blossom',
    imageSrc: '/artworks/spring-blossom.jpg',
    location: 'Beijing National Museum, China',
    year: '1997',
    documentUrl: '/docs/spring_blossom_letter.jpg',
  },
 
   {
    title: 'Lonely Taming',
    imageSrc: '/artworks/Lonely Taming Museum of Contemporary Art of Iran .jpg',
    location: 'Museum of Contemporary Art, Tehran',
    year: '????',
    documentUrl: '/docs/moca_tehran_mystic_letter.jpg',
  },
   {
    title: 'Prayer',
    imageSrc: '/artworks/Prayer Museum of Contemporary Art of Iran .jpg',
    location: 'Museum of Contemporary Art, Tehran',
    year: '????',
    documentUrl: '/docs/moca_tehran_mystic_letter.jpg',
  },
   {
    title: 'Universal Mother',
    imageSrc: '/artworks/Universal Mother Museum of Contemporary Art of Iran .jpg',
    location: 'Museum of Contemporary Art, Tehran',
    year: '2000',
    documentUrl: '/docs/moca_tehran_mystic_letter.jpg',
  },
  {
    title: 'BIRDS IN UNION',
    imageSrc: '/artworks/BIRDS IN UNION Museum of Contemporary Art of Iran.jpg',
    location: 'Museum of Contemporary Art, Tehran',
    year: '????',
    documentUrl: '/docs/rom_unveil_award.jpg',
  },
  {
  title: 'Ontario Legislative Building (Unveiled Work)',
  imageSrc: '/artworks/ontario-legislature.jpg',
  location: 'Permanent Collection – Queen’s Park, Toronto',
  year: '2011',
  documentUrl: '/docs/ontario-invitation.jpg'
},

]
