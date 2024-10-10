import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");

  console.log("Content =>", editorContent);

  const handleChange = (content) => {
    setEditorContent(content);
  };

  // Customize the toolbar to include all options like inserting images, aligning text, and more
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }], // Heading and font options
      [{ size: [] }], // Font size
      ["bold", "italic", "underline", "strike"], // Formatting options
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Text alignment
      ["link", "image", "video"], // Link, image, and video options
      ["blockquote", "code-block"], // Blockquote and code block
      [{ color: [] }, { background: [] }], // Text color and background color
      ["clean"], // Remove formatting
    ],
  };

  // Formats allowed in the editor
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
    "video",
    "align",
    "color",
    "background",
    "code-block",
  ];

  return (
    <>
      <header className="p-4 w-full flex justify-end gap-2">
        <Input placeholder="Enter File name" className='w-[200px]'/>
        <Button onClick={() => {}}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={() => {}}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </header>
      <div className="flex gap-2 px-4 pb-4 ">
        <ReactQuill
          value={editorContent}
          onChange={handleChange}
          theme="snow" // Theme style for editor
          modules={modules} // Toolbar modules
          formats={formats} // Allowed formats
          className="w-[60%] h-[90vh]"
        />
        <div className="border w-[40%] h-screen overflow-y-auto p-2 rounded-l-lg shadow-md">
          <h3 className="font-semibold text-xl border-b border-gray-300 pb-2">Preview</h3>
          <div
            className="prose max-w-none" // Ensure max width isn't applied to prose
            // dangerouslySetInnerHTML={{ __html: editorContent }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
