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

// Ultra-safe positioning for critical windows
const getCriticalWindowPosition = (componentName, viewportWidth, viewportHeight, params) => {
  const { leftNavWidth, padding, windowWidth, windowHeight } = params
  
  // Emergency positioning for very small screens
  const emergencyX = leftNavWidth + padding
  const emergencyY = padding
  
  // Log dimensions for debugging (remove in production)
  console.log(`Positioning ${componentName}:`, {
    viewport: { width: viewportWidth, height: viewportHeight },
    params,
    emergency: { x: emergencyX, y: emergencyY }
  })
  
  switch (componentName) {
    case 'Welcome':
      if (viewportWidth < BREAKPOINTS.MOBILE) {
        // Ultra-safe mobile positioning - never center, always top-left safe area
        const safeX = Math.max(emergencyX, leftNavWidth + padding + 10)
        const safeY = Math.max(emergencyY, padding + 20)
        
        // Ensure position never exceeds viewport
        const finalX = Math.min(safeX, Math.max(0, viewportWidth - windowWidth - 10))
        const finalY = Math.min(safeY, Math.max(0, viewportHeight - windowHeight - 10))
        
        return { x: finalX, y: finalY }
      } else {
        // Desktop: center with bounds checking
        const centerX = (viewportWidth - windowWidth) / 2
        const centerY = (viewportHeight - windowHeight) / 2
        
        const finalX = Math.max(leftNavWidth + padding, Math.min(centerX, viewportWidth - windowWidth - padding))
        const finalY = Math.max(padding, Math.min(centerY, viewportHeight - windowHeight - padding))
        
        return { x: finalX, y: finalY }
      }
      
    case 'Display':
      if (viewportWidth < BREAKPOINTS.MOBILE) {
        // Stack below Welcome window on mobile with safe margins
        const safeX = leftNavWidth + padding
        const safeY = windowHeight + padding + 40 // Stack below Welcome
        
        // Fallback if stacking would go off-screen
        const finalX = Math.min(safeX, Math.max(0, viewportWidth - windowWidth - 10))
        const finalY = Math.min(safeY, Math.max(0, viewportHeight - windowHeight - 10))
        
        return { x: finalX, y: finalY }
      } else {
        // Desktop: offset positioning
        const safeX = leftNavWidth + padding + 30
        const safeY = padding + 30
        
        const finalX = Math.min(safeX, viewportWidth - windowWidth - padding)
        const finalY = Math.min(safeY, viewportHeight - windowHeight - padding)
        
        return { x: finalX, y: finalY }
      }
      
    default:
      return null // Use random positioning for other windows
  }
}

// Main responsive positioning function
export const getResponsivePosition = (componentName, windowSize) => {
  const viewportWidth = windowSize.width || 1200
  const viewportHeight = windowSize.height || 800
  
  const deviceType = getDeviceType(viewportWidth)
  const params = getPositioningParams(deviceType, viewportWidth)
  
  const { leftNavWidth, padding, windowWidth, windowHeight } = params
  
  // Check if this is a critical window that needs special positioning
  const criticalPosition = getCriticalWindowPosition(
    componentName, 
    viewportWidth, 
    viewportHeight, 
    params
  )
  
  if (criticalPosition) {
    return criticalPosition
  }
  
  // Calculate safe positioning area for random placement
  const minX = leftNavWidth + padding
  const maxX = viewportWidth - windowWidth - padding
  const minY = padding
  const maxY = viewportHeight - windowHeight - padding
  
  // Emergency positioning for very small screens
  if (maxX <= minX || maxY <= minY || viewportWidth < 350) {
    console.log(`Emergency positioning for ${componentName} on small screen:`, { viewportWidth, minX, maxX })
    return {
      x: Math.max(0, Math.min(minX, viewportWidth - 200)), // Emergency fallback
      y: Math.max(0, Math.min(minY + (Math.random() * 50), viewportHeight - 200))
    }
  }
  
  // Ensure we have valid ranges
  const safeMaxX = Math.max(minX, maxX)
  const safeMaxY = Math.max(minY, maxY)
  
  // Random positioning within safe bounds with additional bounds checking
  const x = Math.max(minX, Math.min(Math.random() * (safeMaxX - minX) + minX, viewportWidth - windowWidth - 10))
  const y = Math.max(minY, Math.min(Math.random() * (safeMaxY - minY) + minY, viewportHeight - windowHeight - 10))
  
  return { 
    x: Math.floor(x), 
    y: Math.floor(y) 
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