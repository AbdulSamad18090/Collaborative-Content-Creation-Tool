import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill so it only loads in the browser
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = () => {
  const [value, setValue] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure this code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align', 'script'
  ];

  // Render only if ReactQuill is loaded (i.e., on the client side)
  return (
    <div>
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
  );
};

export default RichTextEditor;
