import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Import styles
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill so it only loads in the browser
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PDFGenerator = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [isClient, setIsClient] = useState(false);

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

  const generatePDF = async () => {
    // Create a temporary element to render the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = editorHtml;

    // Set styles to match Quill editor
    tempElement.style.padding = "20px";
    tempElement.style.fontFamily = "Arial, sans-serif"; // Adjust this if necessary
    tempElement.style.lineHeight = "1.5";

    // Append the temporary element to the body for rendering
    document.body.appendChild(tempElement);

    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });

    try {
      // Use html2canvas to capture the temporary element
      const canvas = await html2canvas(tempElement, { scale: 2 }); // Increase scale for better quality
      const imgData = canvas.toDataURL("image/png");

      // Calculate PDF dimensions based on canvas size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = doc.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add the image to the PDF
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add more pages if the content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the generated PDF
      doc.save("document.pdf");
    } catch (error) {
      console.error("Error generating PDF: ", error);
    } finally {
      // Clean up the temporary element
      document.body.removeChild(tempElement);
    }
  };

  return (
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
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
