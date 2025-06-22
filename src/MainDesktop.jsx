import React, { lazy, Suspense } from 'react'
import Draggable from 'react-draggable'
import { useAppContext } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import { getResponsivePosition } from './lib/responsivePositioning'

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
            defaultPosition={getResponsivePosition(componentName, windowSize)}
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
