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
const IE = lazy(() => import('./windows/IE.jsx'))
const Contact = lazy(() => import('./windows/Contact.jsx'))
const Display = lazy(() => import('./windows/Display.jsx'))
const Links = lazy(() => import('./windows/Links.jsx'))
const Notes = lazy(() => import('./windows/Notes.jsx'))
const Crypto = lazy(() => import('./windows/Crypto.jsx'))

export default function MainDesktop () {
  const {
    activeComponents,
    addActiveComponent,
    removeActiveComponent,
    getWindowZIndex,
    backgroundChoice,
    setBackgroundChoice,
    flicker,
    setFlicker,
    site,
    setSite,
    windowSize,
    siteObj
  } = useAppContext()

  const handleWindowClick = componentName => {
    // Bring the clicked window to the front (make it active)
    addActiveComponent(componentName)
  }

  const getWindowPosition = componentName => {
    const positions = {
      Projects: 'absolute ml-14 top-1/4',
      Notes: 'absolute ml-14 top-1/4',
      Cv: 'ml-14 absolute',
      Todo: 'left-1/4 top-1/3 absolute',
      Crypto: 'ml-14 absolute',
      Memes: 'ml-14 top-3/4 absolute',
      IE: 'ml-14 absolute',
      Display: 'ml-4 bottom-1/4 absolute',
      Contact: 'ml-14 bottom-0 right-1/4 absolute',
      Timer: 'ml-14 mt-12 absolute',
      Links: 'absolute ml-14 top-1/2',
      Welcome: 'left-1/4 mt-6 absolute'
    }
    return positions[componentName] || 'ml-14 absolute'
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
      IE: <IE {...commonProps} />,
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
            defaultPosition={{ x: 0, y: 0 }}
            handle='.title-bar'
          >
            <div
              onClick={() => handleWindowClick(componentName)}
              className={getWindowPosition(componentName)}
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
