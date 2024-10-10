import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for Quill

const RichTextEditor = () => {
  const [value, setValue] = useState('');

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

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules} 
        formats={formats} 
        placeholder="Compose something awesome..."
      />
    </div>
  );
};

export default RichTextEditor;
