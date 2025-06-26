// formStyles.ts
// ------------------------------
// Reusable design system styles for Noura project
// Sourced values are imported from theme.ts to ensure central control and consistency.

import { colors, borderRadius, typography } from './theme'

/** ProductCard */
export const cardBase =
  'bg-white rounded-xl shadow-md p-4 min-h-[460px] flex flex-col justify-between'

/** Product Image */
export const productImage =
  'w-full h-[260px] object-contain bg-white p-4 rounded-xl shadow-md transition-transform duration-300 hover:scale-105'

/** Product Title */
export const productTitle = `${typography.heading} text-lg mb-2`
export const productTitleInsidGrid = `text-lg ${typography.heading} mt-4`

/** Product Description */
export const productDescription = `${typography.body} line-clamp-2 mt-1`

/** Product Price */
export const productPrice = `text-base font-semibold ${colors.primary && 'text-[#5e4033]'} mt-2`

/** Card Button Group */
export const cardButtonGroup =
  'flex flex-wrap justify-start items-center gap-4 mt-4'

/** Button Styles */
export const buttonPrimary = `bg-[#5e4033] text-white text-sm px-5 py-2 ${borderRadius.button} hover:bg-[#3e2e24] transition`
export const buttonOutline = `border border-[#5e4033] text-[#5e4033] text-sm px-5 py-2 ${borderRadius.button} hover:bg-[#5e4033] hover:text-white transition`
export const buttonCartFull = `${buttonPrimary} px-6 py-3 text-sm flex items-center gap-2`
export const buttonCartCompact = `${buttonPrimary} text-sm px-4 py-2 flex items-center gap-2`

/** Quantity Selector */
export const quantityBox = 'border border-[#5e4033] rounded-full flex items-center px-4 py-1'
export const quantityButton = 'text-[#5e4033] text-lg px-2 hover:text-[#3e2e24] transition'

/** Variant Selector */
export const variantButtonClass = (selected: boolean) =>
  `px-4 py-1 border rounded-full text-sm transition ${
    selected
      ? 'bg-[#5e4033] text-white'
      : 'border-[#5e4033] text-[#5e4033] hover:bg-[#fef6e4]'
  }`

/** Filter Buttons */
export const filterGroup = 'flex flex-wrap items-center gap-4 mb-6'
export const filterButton = 'px-4 py-1 border border-[#5e4033] text-[#5e4033] rounded-full text-sm transition hover:bg-[#fef6e4]'
export const filterButtonActive = 'px-4 py-1 bg-[#5e4033] text-white rounded-full text-sm transition'
export const filterDropdown = 'px-3 py-1 border border-[#5e4033] text-sm rounded text-[#5e4033] bg-white'

/** Section Layout */
export const sectionWrapper = 'w-full mt-10 px-4 sm:px-6 lg:px-8'
export const sectionTitle = 'text-2xl font-serif text-[#5e4033] mb-6'
export const gridBase = 'grid gap-6'

/** Breadcrumb */
export const breadcrumbWrapper = 'text-sm text-gray-400 mb-2'
export const breadcrumbLink = 'hover:underline text-gray-500'
export const breadcrumbCurrent = 'text-[#5e4033] font-medium'

/** Form Section */
export const formSectionWrapper = 'max-w-2xl mx-auto px-6 py-10'
export const formTitle = 'text-2xl font-semibold text-[#5e4033] mb-2'
export const formDescription = 'text-sm text-gray-600 mb-6'

/** Skeleton */
export const skeletonCard = 'bg-white rounded-xl shadow-md p-4 animate-pulse space-y-4'
export const skeletonBlock = 'h-4 bg-gray-200 rounded'

/** Toast */
export const toastBox = 'bg-[#fff8f2] border border-[#5e4033] shadow-lg rounded-xl p-4 ring-1 ring-black ring-opacity-5 text-[#5e4033] max-w-sm w-full'
export const toastLink = 'underline text-[#5e4033] hover:text-[#3e2e24] transition'

/** Artwork Styles */
export const artworkImage = 'w-full h-[300px] object-contain rounded-md bg-[#f9f9f9] transition-transform duration-300 group-hover:scale-105'
export const artworkVideo = 'w-full h-[300px] object-contain rounded-md bg-black'
export const artworkTitle = 'text-lg font-serif text-[#5e4033]'
export const artworkBuyButton = 'text-sm text-white bg-[#5e4033] px-4 py-2 rounded-full inline-block text-center hover:bg-[#3e2e24] transition'
export const artworkViewLink = 'text-sm underline text-[#5e4033]'
