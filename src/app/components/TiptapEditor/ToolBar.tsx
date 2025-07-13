'use client';
import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Heading1, Heading2, Heading3, Pilcrow, Bold, Italic,
  Strikethrough, Highlighter, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered,
  Image as ImageIcon, Link as LinkIcon,
} from 'lucide-react';

interface ToolBarProps {
  editor: Editor | null;
}

const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
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
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      try {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData }
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

  const btnClass = (active: boolean) =>
    `btnLeft ${active ? 'is-active' : ''}`;

  return (
    <div className="control-group">
      <div className="button-group flex flex-wrap gap-1 mb-3">
        <button type="button" title="Heading 1"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={btnClass(editor.isActive('heading', { level: 1 }))}>
          <Heading1 size={18} />
        </button>
        <button type="button" title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive('heading', { level: 2 }))}>
          <Heading2 size={18} />
        </button>
        <button type="button" title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive('heading', { level: 3 }))}>
          <Heading3 size={18} />
        </button>
        <button type="button" title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={btnClass(editor.isActive('paragraph'))}>
          <Pilcrow size={18} />
        </button>
        <button type="button" title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}>
          <Bold size={18} />
        </button>
        <button type="button" title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}>
          <Italic size={18} />
        </button>
        <button type="button" title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive('strike'))}>
          <Strikethrough size={18} />
        </button>
        <button type="button" title="Highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={btnClass(editor.isActive('highlight'))}>
          <Highlighter size={18} />
        </button>
        <button type="button" title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive('bulletList'))}>
          <List size={18} />
        </button>
        <button type="button" title="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive('orderedList'))}>
          <ListOrdered size={18} />
        </button>
        <button type="button" title="Insert Link" onClick={setLink}
          className={btnClass(editor.isActive('link'))}>
          <LinkIcon size={18} />
        </button>
        <button type="button" title="Upload Image" onClick={handleImageUpload}
          className="btnLeft">
          <ImageIcon size={18} />
        </button>
        <button type="button" title="Align Left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={btnClass(editor.isActive({ textAlign: 'left' }))}>
          <AlignLeft size={18} />
        </button>
        <button type="button" title="Align Center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={btnClass(editor.isActive({ textAlign: 'center' }))}>
          <AlignCenter size={18} />
        </button>
        <button type="button" title="Align Right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={btnClass(editor.isActive({ textAlign: 'right' }))}>
          <AlignRight size={18} />
        </button>
        <button type="button" title="Justify"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={btnClass(editor.isActive({ textAlign: 'justify' }))}>
          <AlignJustify size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToolBar;