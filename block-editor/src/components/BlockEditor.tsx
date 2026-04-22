import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import clsx from 'clsx';
import { BubbleToolbar } from '../editor/ui/BubbleToolbar';
import { CalloutBlock } from '../editor/extensions/CalloutBlock';
import { ToggleBlock } from '../editor/extensions/ToggleBlock';
import { ImagePlaceholder } from '../editor/extensions/ImagePlaceholder';
import { SlashCommand } from '../editor/extensions/SlashCommand';
import { BlockActionsMenu } from '../editor/ui/BlockActionsMenu';
import { ChecklistShortcut } from '../editor/extensions/ChecklistShortcut';

export type BlockEditorProps = {
  value?: JSONContent;
  onChange?: (value: JSONContent) => void;
  onSave?: (value: JSONContent) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  onImageInsertRequest?: () => Promise<{ src: string; alt?: string } | null>;
};

const emptyDocument: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

export const BlockEditor = ({
  value,
  onChange,
  onSave,
  readOnly = false,
  autoFocus = false,
  className,
  placeholder = "Type '/' for commands…",
  onImageInsertRequest,
}: BlockEditorProps) => {
  const editor = useEditor({
    autofocus: autoFocus,
    editable: !readOnly,
    content: value ?? emptyDocument,
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
      }),
      HorizontalRule,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading';
          if (node.type.name === 'codeBlock') return 'Write code…';
          return placeholder;
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ToggleBlock,
      CalloutBlock,
      ImagePlaceholder,
      SlashCommand,
      ChecklistShortcut,
    ],
    editorProps: {
      attributes: {
        class: 'block-editor-prosemirror',
      },
      handleDOMEvents: {
        keydown: (_, event) => {
          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
            event.preventDefault();
            onSave?.(editor?.getJSON() ?? emptyDocument);
            return true;
          }
          return false;
        },
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      onChange?.(updatedEditor.getJSON());
    },
  });

  const handleInsertImage = async () => {
    if (!editor || !onImageInsertRequest) return;
    const result = await onImageInsertRequest();
    if (result) {
      editor.chain().focus().insertImagePlaceholder(result).run();
    }
  };

  if (!editor) return null;

  return (
    <section className={clsx('block-editor-shell', className)} aria-label="Block editor">
      {!readOnly && <BlockActionsMenu editor={editor} />}
      {!readOnly && <button type="button" className="image-hook-button" onClick={handleInsertImage}>Insert image placeholder</button>}
      {!readOnly && <BubbleToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </section>
  );
};
