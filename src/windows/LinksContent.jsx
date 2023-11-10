import React, { useEffect } from "react";

export default function LinksContent() {
  useEffect(() => {
    document.querySelectorAll("table.interactive tbody tr").forEach((row) => {
      row.addEventListener("click", () => {
        row.classList.toggle("highlighted");
      });
    });

    return () => {
      document.querySelectorAll("table.interactive tbody tr").forEach((row) => {
        row.removeEventListener("click", () => {
          row.classList.toggle("highlighted");
        });
      });
    };
  }, []);

  return (
    <div
    //  className="flex flex-wrap p-4 gap-4"
    >
      <div className="sunken-panel">
        <table className="interactive">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a
                  href="https://projects.wojtekmaj.pl/react-pdf/"
                  target="_blank"
                >
                  react-pdf
                </a>
              </td>
              <td>npm</td>
              <td>pdf preview</td>
            </tr>
            <tr>
              <td>
                <a
                  href="https://www.npmjs.com/package/react-draggable"
                  target="_blank"
                >
                  react-draggable
                </a>
              </td>
              <td>npm</td>
              <td>draggable windows</td>
            </tr>
            <tr>
              <td>
                <a href="https://jdan.github.io/98.css/" target="_blank">
                  98.css
                </a>
              </td>
              <td>npm</td>
              <td>Utilized for most of the CSS on site</td>
            </tr>
            <tr>
              <td>
                <a href="https://win98icons.alexmeub.com/" target="_blank">
                  win98icons
                </a>
              </td>
              <td>icons</td>
              <td>98 styled icons used throughout this site</td>
            </tr>
            <tr>
              <td>
                <a href="https://usehooks.com/" target="_blank">
                  useHooks
                </a>
              </td>
              <td>hooks</td>
              <td>A great library of various useful hooks for React</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
