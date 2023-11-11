import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function NotesContent() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    async function fetchMarkdown() {
      const response = await fetch("/markdown/Conditionals.md");
      const data = await response.text();
      setMarkdown(data);
    }

    fetchMarkdown();
  }, []);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
