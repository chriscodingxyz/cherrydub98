import React, { lazy, Suspense } from 'react'
import Draggable from 'react-draggable'
import { useAppContext } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load window components
const Cv = lazy(() => import('./windows/Cv.jsx'))
const Projects = lazy(() => import('./windows/Projects.jsx'))
const Memes = lazy(() => import('./windows/Memes.jsx'))
const Todo = lazy(() => import('./windows/Todo.jsx'))
const Timer = lazy(() => import('./windows/Timer.jsx'))
const Welcome = lazy(() => import('./windows/Welcome.jsx'))
const Contact = lazy(() => import('./windows/Contact.jsx'))
const Display = lazy(() => import('./windows/Display.jsx'))
const Links = lazy(() => import('./windows/Links.jsx'))
const Notes = lazy(() => import('./windows/Notes.jsx'))
const Crypto = lazy(() => import('./windows/Crypto.jsx'))

export default function MainDesktop () {
  const { activeComponents, addActiveComponent, getWindowZIndex, windowSize } =
    useAppContext()

  const handleWindowClick = componentName => {
    // Bring the clicked window to the front (make it active)
    addActiveComponent(componentName)
  }

  const getRandomPosition = () => {
    const leftNavWidth = 100 // Increased space for left navigation
    const padding = 40 // Increased padding from edges
    const windowWidth = 500 // More conservative estimate for larger windows
    const windowHeight = 400 // More conservative estimate for taller windows
    
    // Use current viewport size or fallback to reasonable defaults
    const viewportWidth = windowSize.width || 1200
    const viewportHeight = windowSize.height || 800
    
    // Calculate safe positioning area with more conservative bounds
    const minX = leftNavWidth
    const maxX = viewportWidth - windowWidth - padding
    const minY = padding
    const maxY = viewportHeight - windowHeight - padding
    
    // Fallback to safe defaults if screen is too small
    const safeX = Math.max(minX, Math.min(maxX, minX + 50))
    const safeY = Math.max(minY, Math.min(maxY, minY + 50))
    
    // If we have room to randomize, do it, otherwise use safe position
    const rangeX = Math.max(0, maxX - minX)
    const rangeY = Math.max(0, maxY - minY)
    
    const x = rangeX > 0 ? Math.random() * rangeX + minX : safeX
    const y = rangeY > 0 ? Math.random() * rangeY + minY : safeY
    
    return { x: Math.floor(x), y: Math.floor(y) }
  }

  const renderComponent = componentName => {
    const commonProps = {
      key: componentName
    }

    const components = {
      Projects: <Projects {...commonProps} />,
      Notes: <Notes {...commonProps} />,
      Cv: <Cv {...commonProps} />,
      Todo: <Todo {...commonProps} />,
      Crypto: <Crypto {...commonProps} />,
      Memes: <Memes {...commonProps} />,
      Display: <Display {...commonProps} />,
      Contact: <Contact {...commonProps} />,
      Timer: <Timer {...commonProps} />,
      Links: <Links {...commonProps} />,
      Welcome: <Welcome {...commonProps} />
    }

    return components[componentName] || components.Welcome
  }

  return (
    <div className=''>
      <div className=''>
        {activeComponents.map(componentName => (
          <Draggable
            cancel='.btn'
            key={componentName}
            defaultPosition={getRandomPosition()}
            handle='.title-bar'
          >
            <div
              onClick={() => handleWindowClick(componentName)}
              className="absolute"
              style={{
                zIndex: getWindowZIndex(componentName)
              }}
            >
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className='window'>
                      <div className='title-bar'>
                        <div className='title-bar-text'>Loading...</div>
                      </div>
                      <div className='window-body'>Loading window...</div>
                    </div>
                  }
                >
                  {renderComponent(componentName)}
                </Suspense>
              </ErrorBoundary>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}
