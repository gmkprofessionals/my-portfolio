/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
  Heading1, Heading2, Heading3,
  Pilcrow, Bold, Italic, Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Image as ImageIcon, Link as LinkIcon,
} from 'lucide-react';

const ToolBar = ({ editor }: any) => {

  if (!editor) return null;
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const handleImageUpload = async () => {

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'image_upload'); 

      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // 🔁 Replace
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          editor.chain().focus().setImage({ src: data.secure_url, alt: file.name }).run();
        } else {
          alert('Upload failed. No image URL returned.');
        }
      } catch (err) {
        console.error(err);
        alert('Image upload failed.');
      }
    };
  };

  return (
    <div className="control-group">
      <div className="button-group flex flex-wrap gap-1 mb-3">
        <button type="button" title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`btnLeft ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}>
          <Heading1 size={18} />
        </button>
        <button type="button" title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`btnLeft ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}>
          <Heading2 size={18} />
        </button>
        <button type="button" title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`btnLeft ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}>
          <Heading3 size={18} />
        </button>
        <button type="button" title="Paragraph" onClick={() => editor.chain().focus().setParagraph().run()}
          className={`btnLeft ${editor.isActive('paragraph') ? 'is-active' : ''}`}>
          <Pilcrow size={18} />
        </button>
        <button type="button" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}
          className={`btnLeft ${editor.isActive('bold') ? 'is-active' : ''}`}>
          <Bold size={18} />
        </button>
        <button type="button" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`btnLeft ${editor.isActive('italic') ? 'is-active' : ''}`}>
          <Italic size={18} />
        </button>
        <button type="button" title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`btnLeft ${editor.isActive('strike') ? 'is-active' : ''}`}>
          <Strikethrough size={18} />
        </button>
        <button type="button" title="Highlight" onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`btnLeft ${editor.isActive('highlight') ? 'is-active' : ''}`}>
          <Highlighter size={18} />
        </button>
        <button type="button" title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btnLeft ${editor.isActive('bulletList') ? 'is-active' : ''}`}>
          <List size={18} />
        </button>
        <button type="button" title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btnLeft ${editor.isActive('orderedList') ? 'is-active' : ''}`}>
          <ListOrdered size={18} />
        </button>
        <button type="button" title="Insert Link" onClick={setLink}
          className={`btnLeft ${editor.isActive('link') ? 'is-active' : ''}`}>
          <LinkIcon size={18} />
        </button>
        <button type="button" title="Upload Image" onClick={handleImageUpload}
          className="btnLeft">
          <ImageIcon size={18} />
        </button>
        <button type="button" title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`btnLeft ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}>
          <AlignLeft size={18} />
        </button>
        <button type="button" title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`btnLeft ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}>
          <AlignCenter size={18} />
        </button>
        <button type="button" title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`btnLeft ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}>
          <AlignRight size={18} />
        </button>
        <button type="button" title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`btnLeft ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}>
          <AlignJustify size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
