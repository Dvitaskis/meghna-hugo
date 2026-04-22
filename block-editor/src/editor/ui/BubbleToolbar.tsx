import { BubbleMenu, Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
};

export const BubbleToolbar = ({ editor }: Props) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
      <div className="bubble-toolbar" role="toolbar" aria-label="Inline formatting toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}>U</button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'active' : ''}>{'</>'}</button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={editor.isActive('link') ? 'active' : ''}
        >
          Link
        </button>
        <button onClick={() => editor.chain().focus().setColor('#2563eb').run()}>Blue</button>
        <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#fde68a' }).run()}>Highlight</button>
      </div>
    </BubbleMenu>
  );
};
