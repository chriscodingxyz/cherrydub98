// Bulletproof positioning that works across all viewport sizes
export const getResponsivePosition = (componentName, windowSize) => {
  const viewportWidth = windowSize.width || 1200
  const viewportHeight = windowSize.height || 800
  
  // Special positioning for Welcome and Display windows - always visible
  if (componentName === 'Welcome' || componentName === 'Display') {
    const isMobile = viewportWidth < 768
    
    if (isMobile) {
      // Mobile: Use small fixed positions that always work
      const position = {
        x: componentName === 'Display' ? 110 : 90,
        y: componentName === 'Display' ? 120 : 100
      }
      return position
    } else {
      // Desktop: Use conservative percentage positioning
      const leftNavWidth = 80
      const xPercent = componentName === 'Display' ? 0.15 : 0.1 // 10% and 15% from left
      const yPercent = componentName === 'Display' ? 0.2 : 0.15 // 15% and 20% from top
      
      const position = {
        x: leftNavWidth + (viewportWidth - leftNavWidth) * xPercent,
        y: viewportHeight * yPercent
      }
      return position
    }
  }
  
  // Random positioning for other windows
  const leftNavWidth = 80
  const isMobile = viewportWidth < 768
  
  if (isMobile) {
    // Mobile: Keep new windows very close to left nav
    const randomPosition = {
      x: leftNavWidth + Math.random() * 100, // Only 100px from left nav
      y: 50 + Math.random() * 200 // Keep near top
    }
    return randomPosition
  } else {
    // Desktop: More spread out random positioning
    const xPercent = Math.random() * 0.6 // 0-60% of available width
    const yPercent = Math.random() * 0.6 // 0-60% of available height
    
    const randomPosition = {
      x: leftNavWidth + (viewportWidth - leftNavWidth) * xPercent,
      y: viewportHeight * yPercent
    }
    return randomPosition
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