import React, { createContext, useContext } from "react";
import { useLocalStorage, useWindowSize } from "@uidotdev/usehooks";
import { useWindowManager } from "../hooks/useWindowManager";
import { siteObj } from "../lib/data";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const windowManager = useWindowManager();
  const [backgroundChoice, setBackgroundChoice] = useLocalStorage(
    "backgroundChoice",
    "background-default"
  );
  const [flicker, setFlicker] = useLocalStorage("flicker", false);
  const [site, setSite] = useLocalStorage("site", siteObj.Portfolio);
  const windowSize = useWindowSize();

  const value = {
    ...windowManager,
    backgroundChoice,
    setBackgroundChoice,
    flicker,
    setFlicker,
    site,
    setSite,
    windowSize,
    siteObj,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};