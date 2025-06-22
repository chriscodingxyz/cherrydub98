import { useState, useCallback } from "react";

export const useWindowManager = (initialComponents = ["Welcome", "Display"]) => {
  const [activeComponents, setActiveComponents] = useState(initialComponents);

  const addActiveComponent = useCallback((componentName) => {
    setActiveComponents((prev) => [
      componentName,
      ...prev.filter((name) => name !== componentName),
    ]);
  }, []);

  const removeActiveComponent = useCallback((componentName) => {
    setActiveComponents((prev) =>
      prev.filter((name) => name !== componentName)
    );
  }, []);

  const isWindowActive = useCallback((componentName) => {
    return (
      activeComponents.length > 0 && activeComponents[0] === componentName
    );
  }, [activeComponents]);

  const getWindowZIndex = useCallback((componentName) => {
    const index = activeComponents.indexOf(componentName);
    return index === -1 ? 0 : activeComponents.length - index;
  }, [activeComponents]);

  return {
    activeComponents,
    setActiveComponents,
    addActiveComponent,
    removeActiveComponent,
    isWindowActive,
    getWindowZIndex,
  };
};