export interface WitnessItem {
  title: string
  issuer: string
  year: number | string
  image?: string
  type: 'recognition' | 'letter' | 'role' | 'certificate'
}

export const witnesses: WitnessItem[] = [
  // 🎖️ CERTIFICATES & AWARDS
  {
    title: 'Rank 1 Certificate in Art',
    issuer: 'Ministry of Culture and Islamic Guidance of Iran',
    year: 2010,
    image: '/letters/rank1-art.jpg',
    type: 'certificate',
  },
  {
    title: 'First Prize in Biennale of Painting',
    issuer: 'Tehran Museum of Contemporary Art',
    year: '1993,1995',
    image: '/letters/tehran-biennale.jpg',  
    type: 'recognition',
  },
  

  // 👨‍⚖️ JURY & ROLES
  {
    title: 'Jury Member',
    issuer: 'Tehran Painting Biennials',
    year: '1997, 1999',
    image: '/letters/Jury.jpg',
    type: 'role',
  },
  {
    title: 'Founder & Instructor',
    issuer: 'Irena Art Gallery & School, Toronto',
    year: '2000–present',
    type: 'role',
  },

  // 📜 LETTERS
  {
    title: 'Official Meeting with Canadian Leaders Regarding Syria',
  issuer: 'Rt. Hon. Adrienne Clarkson, Hon. John McCallum & Dr. John Ralston Saul',
  year: 2016,
  type: 'recognition',
  image: '/letters/syria-meeting.jpg'
  },
  {
    title: 'Letter from Hon. John McCallum',
    issuer: 'Ambassador of Canada to China',
    year: 2016,
    image: '/letters/mccallum-letter.jpg',
    type: 'letter',
  },
  {
    title: 'Letter from Dr. John Ralston Saul',
    issuer: 'Canadian Philosopher and Author',
    year: 2016,
    image: '/letters/saul-letter.jpg',
    type: 'letter',
  },
  {
    title: 'Letter from Master Mahmoud Farshchian',
    issuer: 'Master of Persian Miniature',
    year: 1997,
    image: '/letters/farshchian-letter.jpg',
    type: 'letter',
  },

  // 🎗️ POLITICAL & OFFICIAL RECOGNITION
  {
    title: 'Recognition by Premier Kathleen Wynne',
    issuer: 'Premier of Ontario',
    year: 2018,
    image: '/letters/Kathleen-Wynne-Premier.jpg',
    type: 'recognition',
  },
  {
     title: "Letter of Recognition from Premier of Ontario",
  issuer: "Premier of Ontario – Dalton McGuinty",
  year: 2009,
  type: "letter",
  image: "/letters/premier-letter.jpg"
  },
  {
    title: 'Recognition by MPP Reza Moridi',
    issuer: 'Ontario Legislature',
    year: 2018,
    type: 'recognition',
  },
  {
    title: 'Recognition by MPP Ali Ehsassi',
    issuer: 'Ontario Legislature',
    year: 2018,
    type: 'recognition',
  },
]
