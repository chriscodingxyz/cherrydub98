import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set the worker source to the public URL of the pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function CvContent() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="bg-white text-black border-l border-t border-gray-500"
      style={{
        height: "75vh",
        maxWidth: "80vw",
        overflow: "auto",
        color: "black",
      }}
    >
      <div className="flex flex-col flex-wrap">
        <Document
          file="https://raw.githubusercontent.com/cherrydub/cherrydub/main/public/Chris_Wisniewski_CV.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {[...Array(numPages).keys()].map((pageIndex) => (
            <Page key={`page_${pageIndex + 1}`} pageNumber={pageIndex + 1} />
          ))}
        </Document>
        {/* {numPages && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )} */}
      </div>
    </div>
  );
}
