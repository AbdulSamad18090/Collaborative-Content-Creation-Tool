import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Eye, LoaderPinwheel, Pen, Save, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "react-quill/dist/quill.snow.css";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import ModeToggle from "@/components/darkModeToggler/page";
import { useDispatch, useSelector } from "react-redux";
import { saveDocument } from "@/lib/slices/documentSlice";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { database } from "@/firebase.config";
import { ref, set, update, onValue } from "firebase/database";
import debounce from "lodash/debounce";
import { usePathname, useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = () => {
  const [value, setValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { toast } = useToast();
  const id = session?.user?.id;

  const docRef = ref(database, `documents/${fileName}`);
  const localContentRef = useRef(value); // Local content to avoid excessive re-renders

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (fileName) localStorage.setItem("fileName", fileName);
  }, [fileName]);

  useEffect(() => {
    const storedFileName = localStorage.getItem("fileName");
    if (storedFileName) setFileName(storedFileName);
  }, []);

  // Sync with Firebase only if content differs
  useEffect(() => {
    const unsubscribe = onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.content !== localContentRef.current) {
        setValue(data.content);
        localContentRef.current = data.content;
      }
    });
    return () => unsubscribe();
  }, [docRef]);

  // Debounced Firebase update function
  const debouncedUpdate = useCallback(
    debounce((newValue) => {
      if (newValue !== localContentRef.current) {
        localContentRef.current = newValue;
        update(docRef, { content: newValue });
      }
    }, 0),
    [docRef]
  );

  // Handle editor changes without state interference
  const handleChange = (newValue) => {
    setValue(newValue);
    debouncedUpdate(newValue); // Only sync to Firebase with debounced call
  };

  // Save button click
  const handleSave = async () => {
    if (!fileName) {
      toast({
        description: "Please enter a valid file name",
        variant: "destructive",
      });
      return;
    }
    if (!id) {
      toast({
        description: "User session is not valid, please log in.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await set(ref(database, `documents/${fileName}`), {
        fileName,
        type: "text",
        content: value,
        createdBy: id,
        timestamp: Date.now(),
      });
      await dispatch(
        saveDocument({ fileName, type: "text", content: value, createdBy: id })
      );
      toast({
        description: "Document saved successfully.",
        variant: "success",
      });
    } catch (err) {
      toast({
        description: "Failed to save document.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Export document as .docx
  const exportAsDocx = () => {
    if (!fileName) {
      toast({
        description: "Please specify a file name to export.",
        variant: "destructive",
      });
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

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

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
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            readOnly={!fileName}
            placeholder={
              fileName
                ? "Compose something awesome..."
                : "Please Specify Document Name first"
            }
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
            <Button
              variant="outline"
              className="py-0 px-1"
              onClick={togglePreview}
            >
              <X className="" />
            </Button>
          </div>
        </div>
        <div className="h-full">
          <div
            dangerouslySetInnerHTML={{ __html: value }}
            className="custom-preview"
          ></div>
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
