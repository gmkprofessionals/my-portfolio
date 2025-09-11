'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import ToolBar from './ToolBar';

interface TiptapProps {
  onContentChange?: (html: string) => void;
  initialContent?: string;
}

const Tiptap = ({ onContentChange, initialContent }: TiptapProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Underline,
      Link,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] border border-blue-500 rounded-sm bg-white p-6 outline-none',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onContentChange?.(html);
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className='prose' />
    </div>
  );
};

export default Tiptap;
