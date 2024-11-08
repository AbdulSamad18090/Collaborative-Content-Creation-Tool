import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Eye, LoaderPinwheel, Pen, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import ModeToggle from "@/components/darkModeToggler/page";
import { useDispatch } from "react-redux";
import { saveDocument } from "@/lib/slices/documentSlice";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { database } from "@/firebase.config"; // Import Firebase database
import { ref, set, update, onValue } from "firebase/database"; // Firebase functions
import debounce from "lodash/debounce"; // To debounce updates to Firebase

// Dynamically import ReactQuill so it only loads in the browser
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fileName, setFileName] = useState(""); // State for the file name
  const [isSaving, setIsSaving] = useState(false); // Track if saving is in progress
  const dispatch = useDispatch();
  const { loading, error, savedDocument } = useSelector((state) => state.documentSlice);
  const { data: session } = useSession();
  const id = session?.user?.id;
  const { toast } = useToast();

  // Ensure this code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Persist fileName to localStorage on change
  useEffect(() => {
    if (fileName) {
      localStorage.setItem("fileName", fileName); // Save to localStorage
    }
  }, [fileName]);

  // Retrieve fileName from localStorage on component mount
  useEffect(() => {
    const storedFileName = localStorage.getItem("fileName");
    if (storedFileName) {
      setFileName(storedFileName); // Load from localStorage
    }
  }, []);

  // Firebase document reference
  const docRef = ref(database, `documents/${fileName}`);

  // Listen for changes in Firebase document content
  useEffect(() => {
    const unsubscribe = onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setValue(data.content); // Update editor value with content from Firebase
      }
    });

    return () => unsubscribe();
  }, [docRef]);

  // Sync content to Firebase on change with debouncing
  const handleChange = debounce((newValue) => {
    setValue(newValue);
    update(docRef, { content: newValue }); // Sync to Firebase in real-time
  }, 500); // Update Firebase after 500ms delay

  // Function to handle save
  const handleSave = async () => {
    if (!fileName) {
      toast({ description: "Please enter a valid file name", variant: "destructive" });
      return;
    }

    if (!id) {
      toast({ description: "User session is not valid, please log in.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      // Save document in Firebase Realtime Database
      await set(ref(database, `documents/${fileName}`), {
        fileName,
        type: "text", // This can be dynamic if you have other types of files
        content: value,
        createdBy: id,
        timestamp: Date.now(), // You can also store the timestamp of when the document is created/modified
      });
      
      // Optionally, save to Redux or another state for local handling
      await dispatch(
        saveDocument({ fileName, type: "text", content: value, createdBy: id })
      );

      toast({ description: "Document saved successfully.", variant: "success" });
    } catch (err) {
      toast({ description: "Failed to save document.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  // Export document as .docx
  const exportAsDocx = () => {
    if (!fileName) {
      toast({ description: "Please specify a file name to export.", variant: "destructive" });
      return;
    }
    const htmlContent = value;
    const converted = htmlDocx.asBlob(htmlContent);
    saveAs(converted, `${fileName}.docx`);
  };

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

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

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
          <Button onClick={handleSave} disabled={isSaving || !fileName}>
            {isSaving && <LoaderPinwheel className="animate-spin" />}
            {!isSaving && (
              <>
                <Save className="h-4 w-4 mr-2" />
                save
              </>
            )}
          </Button>

          <Button variant="outline" onClick={exportAsDocx} disabled={!fileName}>
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

      <div>
        {isClient && (
          <ReactQuill
            key={fileName}
            theme="snow"
            value={value}
            onChange={handleChange} // Handle change in editor
            modules={modules}
            formats={formats}
            readOnly={!fileName} // Make the editor read-only if fileName is empty
            placeholder={fileName ? "Compose something awesome..." : "Please Specify Document Name first"}
          />
        )}
      </div>

      {/* Right Sidebar for Preview */}
      <div
        className={`fixed top-0 right-0 overflow-y-auto md:w-1/2 w-full h-full bg-gray-50 dark:bg-neutral-900 border-l dark:border-neutral-800 shadow-lg p-4 z-50 transform transition-transform duration-300 ease-in-out ${isPreviewOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 dark:border-neutral-800 pb-4">
          <h2 className="text-xl font-semibold">Document Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleSave}>
              {isSaving && <LoaderPinwheel className="animate-spin" />}
              {!isSaving && (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  save
                </>
              )}
            </Button>
            <Button onClick={exportAsDocx}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="py-0 px-1" onClick={togglePreview}>
              <X className="" />
            </Button>
          </div>
        </div>
        <div className="h-full">
          <div dangerouslySetInnerHTML={{ __html: value }} className="custom-preview"></div>
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
