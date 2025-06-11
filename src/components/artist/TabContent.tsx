// components/artist/TabContent.tsx
'use client'

import LifeAndLight from './tabs/LifeAndLight'

// Future tabs to be imported:
import SacredWorks from './tabs/SacredWorks'
 import Witnesses from './tabs/Witnesses'
 import StageAndStory from './tabs/StageAndStory'
 import Legacy from './tabs/Legacy'
// import Publications from './tabs/Publications'
// import ContactGallery from './tabs/ContactGallery'

interface Props {
  activeTab: string
}

/**
 * TabContent
 * --------------------------------
 * Renders the currently active tab's component
 */
export default function TabContent({ activeTab }: Props) {
  switch (activeTab) {
    case 'Life & Light':
      return <LifeAndLight />
     case 'Sacred Works': return <SacredWorks />
    case 'Witnesses': return <Witnesses />
    case 'Stage & Story': return <StageAndStory />
     case 'Legacy': return <Legacy />
    // case 'Publications': return <Publications />
    // case 'Contact & Gallery': return <ContactGallery />
    default:
      return null
  }
}
