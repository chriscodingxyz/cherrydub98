import React, { lazy, Suspense } from 'react'
import Draggable from 'react-draggable'
import { useAppContext } from './context/AppContext'
import ErrorBoundary from './components/ErrorBoundary'
import { getResponsivePosition } from './lib/responsivePositioning'

// Import basic windows directly for instant loading
import Cv from './windows/Cv.jsx'
import Projects from './windows/Projects.jsx'
import Memes from './windows/Memes.jsx'
import Todo from './windows/Todo.jsx'
import Timer from './windows/Timer.jsx'
import Welcome from './windows/Welcome.jsx'
import Contact from './windows/Contact.jsx'
import Display from './windows/Display.jsx'
import Links from './windows/Links.jsx'
import Notes from './windows/Notes.jsx'

// Only lazy load components with heavy API calls
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

    // Components that load instantly
    const instantComponents = {
      Projects: <Projects {...commonProps} />,
      Notes: <Notes {...commonProps} />,
      Cv: <Cv {...commonProps} />,
      Todo: <Todo {...commonProps} />,
      Memes: <Memes {...commonProps} />,
      Display: <Display {...commonProps} />,
      Contact: <Contact {...commonProps} />,
      Timer: <Timer {...commonProps} />,
      Links: <Links {...commonProps} />,
      Welcome: <Welcome {...commonProps} />
    }

    // Lazy loaded components (only Crypto for now)
    if (componentName === 'Crypto') {
      return <Crypto {...commonProps} />
    }

    return instantComponents[componentName] || instantComponents.Welcome
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
                {componentName === 'Crypto' ? (
                  <Suspense
                    fallback={
                      <div className='window'>
                        <div className='title-bar'>
                          <div className='title-bar-text'>Loading Crypto...</div>
                        </div>
                        <div className='window-body'>Loading crypto data...</div>
                      </div>
                    }
                  >
                    {renderComponent(componentName)}
                  </Suspense>
                ) : (
                  renderComponent(componentName)
                )}
              </ErrorBoundary>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  )
}
