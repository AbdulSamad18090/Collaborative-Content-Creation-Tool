import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Eye, Pen, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import ModeToggle from "@/components/darkModeToggler/page";

// Dynamically import ReactQuill so it only loads in the browser
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const isMobileDevice = () => {
  return (
    typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
  );
};

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to control sidebar visibility
  const [fileName, setFileName] = useState("Document"); // State for the file name

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

  // Function to toggle sidebar
  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  // Function to export content as .docx
  const exportAsDocx = () => {
    const htmlContent = value;
    const converted = htmlDocx.asBlob(htmlContent);

    // Check if the device is mobile and handle download accordingly
    if (isMobileDevice()) {
      const url = URL.createObjectURL(converted);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // For desktop or non-mobile browsers
      saveAs(converted, `${fileName}.docx`);
    }
  };

  useEffect(() => {
    console.log("Value ==>", value);
  }, [value]);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 p-3 border-b dark:border-neutral-800">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Pen className="h-8 w-6 text-black dark:text-white" />
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

          <Button variant="outline" onClick={exportAsDocx}>
            <Download className="h-4 w-4 mr-2 " />
            Export
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className="px-4 py-2">
        <Button className="flex gap-1" onClick={togglePreview}>
          <Eye />
          <span>Preview</span>
        </Button>
      </div>
      <div className="">
        {isClient && (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            placeholder="Compose something awesome..."
          />
        )}
      </div>

      {/* Right Sidebar for Preview */}
      <div
        className={`fixed top-0 right-0 overflow-y-auto md:w-1/2 w-full h-full bg-gray-50 dark:bg-neutral-900 border-l dark:border-neutral-800 shadow-lg p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isPreviewOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-neutral-800 pb-4">
          <h2 className="text-xl font-semibold">Document Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => {}}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={exportAsDocx}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="py-0 px-1"
              onClick={togglePreview}
            >
              <X className="" />
            </Button>
          </div>
        </div>
        <div className=" h-full">
          <div
            dangerouslySetInnerHTML={{ __html: value }} // Render the HTML content
            className="custom-preview"
          ></div>
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
