// Responsive window positioning utility for different screen sizes
// Ensures windows are always visible and properly positioned across devices

// Screen breakpoints
const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
}

// Device type detection
export const getDeviceType = (width) => {
  if (width < BREAKPOINTS.MOBILE) return 'mobile'
  if (width < BREAKPOINTS.TABLET) return 'tablet'
  return 'desktop'
}

// Get positioning parameters based on device type
export const getPositioningParams = (deviceType, viewportWidth) => {
  const params = {
    mobile: {
      leftNavWidth: 60,    // Smaller nav space on mobile
      padding: 4,          // Minimal padding for maximum space
      windowWidth: Math.min(250, viewportWidth - 80), // Ultra-conservative width
      windowHeight: 280,   // Reduced height for mobile
    },
    tablet: {
      leftNavWidth: 80,    // Medium nav space
      padding: 12,         // Reduced padding
      windowWidth: 320,    // Smaller tablet width
      windowHeight: 350,   // Tablet-optimized height
    },
    desktop: {
      leftNavWidth: 100,   // Original desktop spacing
      padding: 40,         // Original desktop padding
      windowWidth: 500,    // Original estimates
      windowHeight: 400,   // Original estimates
    }
  }
  
  return params[deviceType] || params.desktop
}

// Simple positioning for critical windows (CSS handles sizing now)
const getCriticalWindowPosition = (componentName, viewportWidth, viewportHeight, params) => {
  const { leftNavWidth, padding } = params
  
  // Simple safe positioning since CSS handles responsive sizing
  const safeX = leftNavWidth + padding
  const safeY = padding
  
  switch (componentName) {
    case 'Welcome':
      // Simple safe positioning - CSS will handle responsive sizing
      return { x: safeX, y: safeY }
      
    case 'Display':
      // Offset slightly from Welcome
      return { x: safeX + 20, y: safeY + 20 }
      
    default:
      return null // Use random positioning for other windows
  }
}

// Simple safe positioning function
export const getResponsivePosition = (componentName, windowSize) => {
  const viewportWidth = windowSize.width || 1200
  
  // Conservative safe positioning for all screen sizes
  const safeX = 80  // Clear the left nav area
  const safeY = 20  // Small top margin
  
  // Special positioning for critical windows
  switch (componentName) {
    case 'Welcome':
      return { x: safeX, y: safeY }
      
    case 'Display':
      return { x: safeX + 30, y: safeY + 30 }
      
    default:
      // Random but safe positioning for other windows
      return { 
        x: safeX + (Math.random() * 150), 
        y: safeY + (Math.random() * 150) 
      }
  }
}

// Debug utility for development
export const getPositioningDebugInfo = (windowSize) => {
  const viewportWidth = windowSize.width || 1200
  const deviceType = getDeviceType(viewportWidth)
  const params = getPositioningParams(deviceType)
  
  return {
    deviceType,
    viewportWidth,
    params,
    safeArea: {
      minX: params.leftNavWidth + params.padding,
      maxX: viewportWidth - params.windowWidth - params.padding,
      availableWidth: viewportWidth - params.leftNavWidth - params.windowWidth - (params.padding * 2)
    }
  }
}