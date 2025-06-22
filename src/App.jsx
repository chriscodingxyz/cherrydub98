import { useState, useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import BottomDesktopBar from "./BottomDesktopBar";
import LeftDesktopNav from "./LeftDesktopNav";
import MainDesktop from "./MainDesktop";
import "./flicker.css";
import Landing from "./components/Landing";

function AppContent() {
  const { backgroundChoice, flicker } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div
      className={`${backgroundChoice} ${flicker ? "crt" : ""}`}
      style={{ height: "100vh" }}
    >
      {isLoading && <Landing />}
      <div className="main-app">
        <LeftDesktopNav />
        <MainDesktop />
        <BottomDesktopBar />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
