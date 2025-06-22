import { useState, useCallback } from "react";

export const useWindowManager = (initialComponents = ["Welcome", "Display"]) => {
  // Initialize window states object
  const [windowStates, setWindowStates] = useState(() => {
    const states = {};
    initialComponents.forEach((name, index) => {
      states[name] = {
        isOpen: true,
        isMinimized: false,
        zIndex: initialComponents.length - index, // First window gets highest z-index
        isSelected: index === 0, // First window is selected by default
        openOrder: index + 1, // Order in which windows were opened
      };
    });
    return states;
  });

  // Legacy compatibility: Get array of active (open and not minimized) components
  const activeComponents = Object.keys(windowStates)
    .filter(name => windowStates[name].isOpen && !windowStates[name].isMinimized)
    .sort((a, b) => windowStates[b].zIndex - windowStates[a].zIndex); // Sort by z-index (highest first)

  // Legacy compatibility: Get array of all open windows (for taskbar)
  const openWindows = Object.keys(windowStates)
    .filter(name => windowStates[name].isOpen)
    .sort((a, b) => windowStates[a].openOrder - windowStates[b].openOrder); // Sort by open order

  const addActiveComponent = useCallback((componentName) => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      
      if (newStates[componentName]) {
        // Window already exists, bring to front
        const maxZIndex = Math.max(...Object.values(newStates).map(s => s.zIndex));
        newStates[componentName] = {
          ...newStates[componentName],
          zIndex: maxZIndex + 1,
          isMinimized: false, // Restore if minimized
          isSelected: true,
        };
      } else {
        // New window
        const maxZIndex = Math.max(0, ...Object.values(newStates).map(s => s.zIndex));
        const maxOpenOrder = Math.max(0, ...Object.values(newStates).map(s => s.openOrder));
        newStates[componentName] = {
          isOpen: true,
          isMinimized: false,
          zIndex: maxZIndex + 1,
          isSelected: true,
          openOrder: maxOpenOrder + 1,
        };
      }

      // Deselect other windows
      Object.keys(newStates).forEach(name => {
        if (name !== componentName) {
          newStates[name] = { ...newStates[name], isSelected: false };
        }
      });

      return newStates;
    });
  }, []);

  const removeActiveComponent = useCallback((componentName) => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      
      if (newStates[componentName]) {
        delete newStates[componentName];
        
        // If removed window was selected, select the highest z-index window
        const remainingWindows = Object.keys(newStates).filter(name => 
          newStates[name].isOpen && !newStates[name].isMinimized
        );
        
        if (remainingWindows.length > 0) {
          const topWindow = remainingWindows.reduce((top, current) => 
            newStates[current].zIndex > newStates[top].zIndex ? current : top
          );
          newStates[topWindow] = { ...newStates[topWindow], isSelected: true };
        }
      }
      
      return newStates;
    });
  }, []);

  // Select window for taskbar highlighting without changing z-index
  const selectWindow = useCallback((componentName) => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      
      // Only select if window exists and is open
      if (newStates[componentName] && newStates[componentName].isOpen) {
        // Deselect all windows first
        Object.keys(newStates).forEach(name => {
          newStates[name] = { ...newStates[name], isSelected: false };
        });
        
        // Select the target window
        newStates[componentName] = { ...newStates[componentName], isSelected: true };
      }
      
      return newStates;
    });
  }, []);

  // Minimize window (keep in taskbar but hide from desktop)
  const minimizeWindow = useCallback((componentName) => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      
      if (newStates[componentName]) {
        newStates[componentName] = { 
          ...newStates[componentName], 
          isMinimized: true,
          isSelected: false, // Minimized windows should not be selected
        };
        
        // Select the next visible window (highest z-index)
        const visibleWindows = Object.keys(newStates).filter(name => 
          newStates[name].isOpen && !newStates[name].isMinimized && name !== componentName
        );
        
        if (visibleWindows.length > 0) {
          const topWindow = visibleWindows.reduce((top, current) => 
            newStates[current].zIndex > newStates[top].zIndex ? current : top
          );
          newStates[topWindow] = { ...newStates[topWindow], isSelected: true };
        }
      }
      
      return newStates;
    });
  }, []);

  // Restore minimized window
  const restoreWindow = useCallback((componentName) => {
    setWindowStates(prev => {
      const newStates = { ...prev };
      
      if (newStates[componentName] && newStates[componentName].isMinimized) {
        const maxZIndex = Math.max(...Object.values(newStates).map(s => s.zIndex));
        
        // Deselect other windows
        Object.keys(newStates).forEach(name => {
          newStates[name] = { ...newStates[name], isSelected: false };
        });
        
        newStates[componentName] = { 
          ...newStates[componentName], 
          isMinimized: false,
          zIndex: maxZIndex + 1, // Bring to front when restored
          isSelected: true,
        };
      }
      
      return newStates;
    });
  }, []);

  // Helper functions
  const isWindowSelected = useCallback((componentName) => {
    return windowStates[componentName]?.isSelected || false;
  }, [windowStates]);

  const isWindowActive = useCallback((componentName) => {
    const window = windowStates[componentName];
    return window?.isOpen && !window?.isMinimized && window?.zIndex === Math.max(
      ...Object.values(windowStates)
        .filter(s => s.isOpen && !s.isMinimized)
        .map(s => s.zIndex)
    );
  }, [windowStates]);

  const isWindowMinimized = useCallback((componentName) => {
    return windowStates[componentName]?.isMinimized || false;
  }, [windowStates]);

  const getWindowZIndex = useCallback((componentName) => {
    return windowStates[componentName]?.zIndex || 0;
  }, [windowStates]);

  // Legacy compatibility function for components that still use setActiveComponents
  const setActiveComponents = useCallback((newComponents) => {
    setWindowStates(prev => {
      const newStates = {};
      
      newComponents.forEach((name, index) => {
        newStates[name] = {
          isOpen: true,
          isMinimized: false,
          zIndex: newComponents.length - index,
          isSelected: index === 0,
          openOrder: prev[name]?.openOrder || Object.keys(prev).length + index + 1,
        };
      });
      
      return newStates;
    });
  }, []);

  return {
    // New state and functions
    windowStates,
    setWindowStates,
    openWindows,
    selectWindow,
    minimizeWindow,
    restoreWindow,
    isWindowMinimized,
    
    // Legacy compatibility
    activeComponents,
    setActiveComponents,
    addActiveComponent,
    removeActiveComponent,
    isWindowSelected,
    isWindowActive,
    getWindowZIndex,
  };
};