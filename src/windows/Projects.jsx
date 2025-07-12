import React from 'react'
import { siteObj } from '../lib/data'
import WindowLayout from '../components/WindowLayout'

export default function Projects () {
  const handleClick = site => {
    window.open(site, '_blank')
  }

  return (
    <div>
      <WindowLayout
        windowType={'Projects'}
        windowIcon={
          'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png'
        }
      >
        <div className='window-body'>
          <div className='bg-white'>
            <div className='bg-white border-t border-l border-gray-500'>
              <div
                className='flex flex-wrap gap-4 p-4'
                style={{
                  color: '#0000ff',
                  maxWidth: 'calc(3 * (64px + 16px) + 16px)' // 3 icons + gaps + padding
                }}
              >
                {Object.entries(siteObj).map(([key, url]) => (
                  <div
                    key={key}
                    onClick={() => handleClick(url)}
                    className='flex overflow-auto flex-col items-center hover:cursor-pointer'
                  >
                    <img
                      src='https://win98icons.alexmeub.com/icons/png/html-5.png'
                      alt={key}
                    />
                    <div className='text-center'>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WindowLayout>
    </div>
  )
}
