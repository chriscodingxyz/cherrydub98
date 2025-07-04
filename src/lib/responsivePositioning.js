// Viewport-aware positioning with dimension bounds checking
export const getResponsivePosition = (componentName, windowSize) => {
  const viewportWidth = windowSize.width || 1200
  const viewportHeight = windowSize.height || 800
  
  // Window dimension estimates for bounds checking
  const windowDimensions = {
    Welcome: { width: 300, height: 350 }, // ASCII art + crypto data
    Display: { width: 250, height: 200 }  // Form controls
  }
  
  // Special positioning for Welcome and Display windows - always visible
  if (componentName === 'Welcome' || componentName === 'Display') {
    const leftNavWidth = 80
    const safeMargin = 20
    
    if (componentName === 'Welcome') {
      const windowDim = windowDimensions.Welcome
      
      // Calculate safe positioning bounds
      const maxX = viewportWidth - windowDim.width - safeMargin
      const maxY = viewportHeight - windowDim.height - safeMargin
      
      // Start with preferred position
      const preferredX = leftNavWidth + safeMargin
      const preferredY = safeMargin
      
      // Ensure window stays within bounds
      const x = Math.max(safeMargin, Math.min(preferredX, maxX))
      const y = Math.max(safeMargin, Math.min(preferredY, maxY))
      
      return { x, y }
    }
    
    if (componentName === 'Display') {
      const welcomeDim = windowDimensions.Welcome
      const displayDim = windowDimensions.Display
      
      // Get Welcome position (recalculate to ensure consistency)
      const welcomeX = Math.max(safeMargin, Math.min(
        leftNavWidth + safeMargin,
        viewportWidth - welcomeDim.width - safeMargin
      ))
      const welcomeY = Math.max(safeMargin, Math.min(
        safeMargin,
        viewportHeight - welcomeDim.height - safeMargin
      ))
      
      // Try stacking vertically first
      const verticalY = welcomeY + welcomeDim.height + safeMargin
      const verticalMaxY = viewportHeight - displayDim.height - safeMargin
      
      if (verticalY <= verticalMaxY) {
        // Stack vertically - fits below Welcome
        const x = Math.max(safeMargin, Math.min(
          welcomeX + 20,
          viewportWidth - displayDim.width - safeMargin
        ))
        return { x, y: verticalY }
      } else {
        // Try horizontal positioning - beside Welcome
        const horizontalX = welcomeX + welcomeDim.width + safeMargin
        const horizontalMaxX = viewportWidth - displayDim.width - safeMargin
        
        if (horizontalX <= horizontalMaxX) {
          // Position beside Welcome
          return { x: horizontalX, y: welcomeY }
        } else {
          // Emergency positioning - overlap but ensure visibility
          const x = Math.max(safeMargin, viewportWidth - displayDim.width - safeMargin)
          const y = Math.max(safeMargin, viewportHeight - displayDim.height - safeMargin)
          return { x, y }
        }
      }
    }
  }
  
  // Random positioning for other windows with bounds checking
  const leftNavWidth = 80
  const safeMargin = 20
  const estimatedWindowWidth = 300 // Conservative estimate for other windows
  const estimatedWindowHeight = 250
  
  // Calculate safe positioning area
  const minX = leftNavWidth + safeMargin
  const maxX = viewportWidth - estimatedWindowWidth - safeMargin
  const minY = safeMargin
  const maxY = viewportHeight - estimatedWindowHeight - safeMargin
  
  // Ensure we have valid positioning area
  if (maxX <= minX || maxY <= minY) {
    // Emergency positioning for very small screens
    return {
      x: Math.max(safeMargin, leftNavWidth + 10),
      y: Math.max(safeMargin, 50)
    }
  }
  
  // Random positioning within safe bounds
  const x = minX + Math.random() * (maxX - minX)
  const y = minY + Math.random() * (maxY - minY)
  
  return { x: Math.floor(x), y: Math.floor(y) }
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