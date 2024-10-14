"use client";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Import styles
import dynamic from "next/dynamic";
import Link from "next/link";
import { Download, Pen, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

// Dynamically import ReactQuill so it only loads in the browser
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PDFGenerator = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [fileName, setFileName] = useState("Document");
  console.log("Content ===>", editorHtml);

  // Ensure this code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "script",
    "code-block",
  ];

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const generatePDF = () => {
    if (typeof window === "undefined") {
      // Ensure this code only runs in the browser, avoiding SSR
      return;
    }
  
    const tempElement = document.createElement("div");
    tempElement.innerHTML = editorHtml;
  
    const style = document.createElement("style");
    style.innerHTML = `
      ul, ol {
        padding-left: 20px;
        margin-bottom: 10px;
      }
      ul li, ol li {
        margin-bottom: 5px;
      }
  
      ul {
        list-style-type: disc;
      }
  
      ol {
        list-style-type: decimal;
      }
  
      img {
        margin-top: 10px;
        display: block;
        max-width: 100%;
        border-radius: 5px;
      }
  
      .ql-align-center {
        text-align: center !important;
      }
  
      .ql-align-right {
        text-align: right !important;
      }
  
      .ql-align-left {
        text-align: left !important;
      }
  
      p {
        margin: 0.25rem 0;
        line-height: 1;
      }
  
      code {
        background-color: #f5f5f5;
        color: #d63384;
        border-radius: 4px;
        padding: 2px 4px;
        font-family: "Courier New", Courier, monospace;
        font-size: 0.875rem;
      }
  
      pre {
        background-color: rgb(4, 4, 46);
        color: rgb(0, 255, 157);
        padding: 1rem;
        border-radius: 8px;
        overflow-x: auto;
        font-family: "Courier New", Courier, monospace;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 1rem 0;
        white-space: pre-wrap;
      }
    `;
    tempElement.appendChild(style);
  
    const options = {
      margin: 0.5,
      filename: `${fileName}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
  
    html2pdf().from(tempElement).set(options).save();
  };
  
  

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 border-b">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Pen className="h-8 w-6 text-black" />
          <span className="text-xl font-bold">ContentCollab</span>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Input
            placeholder="Enter File name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="sm:w-[200px] w-full"
          />
          <Button onClick={() => {}}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button variant="outline" onClick={generatePDF}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div>
        {isClient && (
          <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Compose something awesome..."
          />
        )}
      </div>
    </>
  );
};

export default PDFGenerator;
