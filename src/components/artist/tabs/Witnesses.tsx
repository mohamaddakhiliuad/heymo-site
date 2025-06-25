'use client'

import { useState } from 'react'
import { witnesses } from '@/data/artists/witnesses'
import FormWrapper from '@/components/ui/FormWrapper'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

export default function Witnesses() {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <FormWrapper
      title="Witnesses"
      description="Official recognitions, letters, and honors documenting Master Alijanpour’s artistic journey."
    >
      <section className="space-y-10 text-[#4e3a2f] text-base leading-relaxed">
        {witnesses.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden flex flex-col md:flex-row md:items-start md:gap-6"
          >
            {item.image && (
              <div
                className="w-full md:w-52 shrink-0 cursor-pointer"
                onClick={() => {
                  setSelectedImage(item.image!)
                  setOpen(true)
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={208}
                  height={280}
                  className="object-cover object-center rounded-l-xl w-full"
                  priority
                />
              </div>
            )}
            <div className="flex-1 p-5">
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm">{item.issuer}</p>
              <p className="text-sm italic text-[#7c6f63]">{item.year}</p>
              <p className="text-xs mt-1 text-[#a3988f] capitalize">{item.type}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ✅ Lightbox */}
      {selectedImage && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: selectedImage }]}
          plugins={[Captions]}
        />
      )}
    </FormWrapper>
  )
}
