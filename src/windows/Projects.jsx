import React from "react";
import { useAppContext } from "../context/AppContext";
import ProjectsContent from "./ProjectsContent";
import WindowLayout from "../components/WindowLayout";

export default function Projects() {
  const { site, setSite, siteObj } = useAppContext();

  return (
    <div>
      <WindowLayout
        windowType={"Projects"}
        windowIcon={
          "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png"
        }
      >
        <div className="window-body">
          <div className="bg-white">
            <div className="bg-white border-l border-t border-gray-500">
              <ProjectsContent
                site={site}
                setSite={setSite}
                siteObj={siteObj}
              />
            </div>
          </div>
        </div>
      </WindowLayout>
    </div>
  );
}
