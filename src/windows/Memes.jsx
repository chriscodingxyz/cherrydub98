import React, { useState, useMemo } from 'react'
import WindowLayout from '../components/WindowLayout'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useAppContext } from '../context/AppContext'

// Helper function to properly encode URLs
const encodeImageUrl = url => {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const encodedFilename = encodeURIComponent(filename)
  parts[parts.length - 1] = encodedFilename
  return parts.join('/')
}

// All meme images - complete collection
const allMemeImages = [
  '/memes/20210707_181749.jpg',
  '/memes/20210831_190821.jpg',
  '/memes/325aa756-271c-42ad-8216-4d80b68c9f98.JPG',
  '/memes/6555d245-d0d8-4dc2-8fc1-e54b4327cbc4.JPG',
  '/memes/93f1978f-b930-4f20-bd01-e52f6dc16716.JPG',
  '/memes/B2883C98-04C0-48A7-9505-E92FE3BEC8D1.jpeg',
  '/memes/E4ZYK_SVkAIn_uo.jpeg',
  '/memes/E5HDsFWVIAA3Fiw.jpeg',
  '/memes/E5JFTLrX0AU4EaS.jpeg',
  '/memes/E5OBXL9VUAAiiaA.jpeg',
  '/memes/E6FlMttVkAQ5bCF.jpeg',
  '/memes/E7YYPHBXEAAs5To.png',
  '/memes/E7uvjA_XMAIJ_mb.jpeg',
  '/memes/E9ujdBQXEAATRD5.jpeg',
  '/memes/F-e4P_ab0AEbvTC.png',
  '/memes/FJL0ANXX0AIZLCh (1).jpeg',
  '/memes/FJmRjDjVgAMhpiD.jpeg',
  '/memes/FJzZv0DWYAc5PhA.jpeg',
  '/memes/FKIS0ucWQAIzNVo.jpeg',
  '/memes/FLgD72EWQBADcXr.jpeg',
  '/memes/FMOikiUWQAQauAL.jpeg',
  '/memes/FMsgE90WQAQ_wav.jpeg',
  '/memes/FMsi3dyVgAE05zh.jpeg',
  '/memes/FOVB8dzXMAE65B_.png',
  '/memes/FPgfSPoVUAIZuzV.jpeg',
  '/memes/FR1YeLQXoAIMe89.jpeg',
  '/memes/FR7iCrgX0AA87PU.jpeg',
  '/memes/FT7LxB0WIAkCX1D.jpeg',
  '/memes/FU2IU_iVsAEqcSa.jpeg',
  '/memes/FUHDzHTXsAEVaF6.jpeg',
  '/memes/FVH-PVUWQAEWte6.jpeg',
  '/memes/FVlJ-v9XoAE0ml5.jpeg',
  '/memes/FWQcugkacAAzvxU.png',
  '/memes/FWRr7neWAAIVy0F.jpeg',
  '/memes/FX7ZZ64aAAAvp73.jpeg',
  '/memes/FYJiKFCXgAMQ4Ez.jpeg',
  '/memes/FYvaZc5XEAAHBnm (1).jpeg',
  '/memes/FZOCi1hXkAANqrQ.png',
  '/memes/FZPaRweUsAMwdVT.jpeg',
  '/memes/FZfRzUjXEAM3vKb.jpeg',
  '/memes/FblO8pYWYAEOMda.jpeg',
  '/memes/FeOdfyEXwAAHMZc.jpeg',
  '/memes/FeU8jD9WQAACCPx.jpeg',
  '/memes/FeXFKHJXgAEUXaw.jpeg',
  '/memes/FgGhb0MWYAAgEZW.png',
  '/memes/FitPmx0UAAE-fsu.jpeg',
  '/memes/Fj3AVAiWIAEBnX0.jpeg',
  '/memes/FloR5JbWIAEbB_A.png',
  '/memes/Fm8loVFXoAEfZMX.jpeg',
  '/memes/FmnKYGQaUAAZEBe.png',
  '/memes/FnGWSv1WAAAw0ov.jpeg',
  '/memes/FnfB_YyWAAIJY8E.png',
  '/memes/FntlIIMX0AMJ8ua.jpeg',
  '/memes/GAoD6scWsAAXa6t.jpeg',
  '/memes/GAopSq6a8AAnDjh.jpeg',
  '/memes/GdlpmyXXoAAPPKY.jpeg',
  '/memes/IMG_0910.JPG',
  '/memes/IMG_1042.JPG',
  '/memes/IMG_1162.JPG',
  '/memes/IMG_1516.PNG',
  '/memes/IMG_8951.jpeg',
  '/memes/KEKMONTECRLO.jpeg',
  '/memes/PHOTO-2023-06-02-19-55-26.jpg',
  '/memes/PNG image 10.png',
  '/memes/PNG image 11.png',
  '/memes/PNG image 12.png',
  '/memes/PNG image 13.png',
  '/memes/PNG image 14.png',
  '/memes/PNG image 15.png',
  '/memes/PNG image 16.png',
  '/memes/PNG image 17.png',
  '/memes/PNG image 18.png',
  '/memes/PNG image 19.png',
  '/memes/PNG image 2.png',
  '/memes/PNG image 20.png',
  '/memes/PNG image 21.png',
  '/memes/PNG image 22.png',
  '/memes/PNG image 23.png',
  '/memes/PNG image 24.png',
  '/memes/PNG image 25.png',
  '/memes/PNG image 26.png',
  '/memes/PNG image 27.png',
  '/memes/PNG image 28.png',
  '/memes/PNG image 29.png',
  '/memes/PNG image 3.png',
  '/memes/PNG image 30.png',
  '/memes/PNG image 31.png',
  '/memes/PNG image 32.png',
  '/memes/PNG image 33.png',
  '/memes/PNG image 34.png',
  '/memes/PNG image 35.png',
  '/memes/PNG image 36.png',
  '/memes/PNG image 37.png',
  '/memes/PNG image 38.png',
  '/memes/PNG image 39.png',
  '/memes/PNG image 4.png',
  '/memes/PNG image 40.png',
  '/memes/PNG image 41.png',
  '/memes/PNG image 42.png',
  '/memes/PNG image 43.png',
  '/memes/PNG image 44.png',
  '/memes/PNG image 45.png',
  '/memes/PNG image 46.png',
  '/memes/PNG image 47.png',
  '/memes/PNG image 48.png',
  '/memes/PNG image 49.png',
  '/memes/PNG image 5.png',
  '/memes/PNG image 50.png',
  '/memes/PNG image 51.png',
  '/memes/PNG image 52.png',
  '/memes/PNG image 53.png',
  '/memes/PNG image 54.png',
  '/memes/PNG image 55.png',
  '/memes/PNG image 56.png',
  '/memes/PNG image 57.png',
  '/memes/PNG image 58.png',
  '/memes/PNG image 59.png',
  '/memes/PNG image 6.png',
  '/memes/PNG image 60.png',
  '/memes/PNG image 62.png',
  '/memes/PNG image 63.png',
  '/memes/PNG image 64.png',
  '/memes/PNG image 65.png',
  '/memes/PNG image 66.png',
  '/memes/PNG image 67.png',
  '/memes/PNG image 68.png',
  '/memes/PNG image 69.png',
  '/memes/PNG image 7.png',
  '/memes/PNG image 70.png',
  '/memes/PNG image 71.png',
  '/memes/PNG image 72.png',
  '/memes/PNG image 73.png',
  '/memes/PNG image 74.png',
  '/memes/PNG image 75.png',
  '/memes/PNG image 76.png',
  '/memes/PNG image 77.png',
  '/memes/PNG image 78.png',
  '/memes/PNG image 79.png',
  '/memes/PNG image 8.png',
  '/memes/PNG image 80.png',
  '/memes/PNG image 81.png',
  '/memes/PNG image 82.png',
  '/memes/PNG image 83.png',
  '/memes/PNG image 84.png',
  '/memes/PNG image 85.png',
  '/memes/PNG image 86.png',
  '/memes/PNG image 87.png',
  '/memes/PNG image 88.png',
  '/memes/PNG image 9.png',
  '/memes/PNG image 90.png',
  '/memes/PNG image 91.png',
  '/memes/PNG image.png',
  '/memes/Pepeslicebear.png',
  '/memes/Pepewindowpain.png',
  '/memes/QmdgaG3aErY76nkPfyULh8MbhFVBeJCPW9qPEdptVo6g1B.gif',
  '/memes/b32ffa4a-61e4-41a3-b94d-466e5382ecf0.JPG',
  '/memes/ba0ea06d-4d50-4e4f-92e8-d1cefe11647f.JPG',
  '/memes/gXkply-ztvO86NX7-JqUajIFqVcv5lwoKcDfor36nh8N2stBNLjtNtEPx_D_7NbcSy7nQo9nucIthtypE7fV-G-eVHkyr9Ppd55wTAw600.png',
  '/memes/iqcups.jpeg',
  '/memes/jfldjfsjlaf.jpeg',
  '/memes/nf3rwX17v3Jf4evpE9GKw-kRP7NxBli4lwCrx7WajkDR_Jy32SsoXYAX4sRojRFaP6YVnvOy01kELJrjbhbvnMJD7oLuuUgQ0O5Is0.png',
  '/memes/pixelhaha.png',
  '/memes/unnamed.gif'
].map(encodeImageUrl)

const INITIAL_COUNT = 24 // Start with 24 images
const LOAD_MORE_COUNT = 16 // Load 16 more each time

export default function Memes ({ activeComponents, removeActiveComponent }) {
  const { windowSize } = useAppContext()
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate window dimensions ONCE when component mounts
  const windowConfig = useMemo(() => {
    const isMobile = windowSize.width < 768
    const viewportWidth = windowSize.width || 1200

    const windowWidth = isMobile
      ? Math.min(viewportWidth - 40, 400)
      : Math.min(viewportWidth * 0.7, 800)

    const windowHeight = isMobile ? '50vh' : '60vh'

    return { windowWidth, windowHeight, isMobile }
  }, [])

  // Get visible memes
  const visibleMemes = allMemeImages.slice(0, visibleCount)
  const hasMore = visibleCount < allMemeImages.length

  // Load more function
  const loadMore = () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    // Simulate loading delay to show off the cool loading icon
    setTimeout(() => {
      setVisibleCount(prev =>
        Math.min(prev + LOAD_MORE_COUNT, allMemeImages.length)
      )
      setIsLoading(false)
    }, 1500) // 1.5 seconds to enjoy the loading animation
  }

  // Scroll handler
  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    const isNearBottom = scrollHeight - scrollTop <= clientHeight * 1.5

    if (isNearBottom && hasMore && !isLoading) {
      loadMore()
    }
  }

  return (
    <div>
      <WindowLayout
        activeComponents={activeComponents}
        removeActiveComponent={removeActiveComponent}
        windowType={'Memes'}
        windowIcon={'https://win98icons.alexmeub.com/icons/png/briefcase-4.png'}
      >
        <div className='window-body'>
          <div
            className='bg-white border-t border-l border-gray-500'
            style={{
              height: windowConfig.windowHeight,
              width: `${windowConfig.windowWidth}px`,
              overflow: 'auto'
            }}
            onScroll={handleScroll}
          >
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 0: 2, 500: 3, 700: 4, 900: 5 }}
            >
              <Masonry gutter='0px'>
                {visibleMemes.map((memeUrl, index) => (
                  <img
                    key={index}
                    src={memeUrl}
                    alt={`Meme ${index + 1}`}
                    className='w-full h-auto'
                    style={{ display: 'block' }}
                    loading='lazy'
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>

            {isLoading && (
              <div className='flex justify-center items-center py-2'>
                <img
                  src='https://win98icons.alexmeub.com/icons/png/search_file_2_cool-5.png'
                  alt='Loading'
                  width='20'
                  height='20'
                  className='mr-2'
                />
                Loading more memes...
              </div>
            )}

            {!hasMore && visibleCount > INITIAL_COUNT && (
              <div className='py-2 text-center text-gray-600'>
                🎉 All memes loaded! ({visibleCount} total)
              </div>
            )}
          </div>
        </div>
      </WindowLayout>
    </div>
  )
}
