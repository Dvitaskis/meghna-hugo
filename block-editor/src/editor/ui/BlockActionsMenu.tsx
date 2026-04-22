import { Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
};

export const BlockActionsMenu = ({ editor }: Props) => {
  return (
    <div className="block-actions" aria-label="Block actions">
      <button type="button" aria-label="Duplicate block" onClick={() => editor.chain().focus().insertContent(editor.state.selection.content().content.toJSON()).run()}>
        Duplicate
      </button>
      <button type="button" aria-label="Delete block" onClick={() => editor.chain().focus().deleteSelection().run()}>
        Delete
      </button>
      <button type="button" aria-label="Move block up" onClick={() => editor.commands.keyboardShortcut('ArrowUp')}>
        Move ↑
      </button>
      <button type="button" aria-label="Move block down" onClick={() => editor.commands.keyboardShortcut('ArrowDown')}>
        Move ↓
      </button>
      <button type="button" aria-label="Turn into heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        Turn into H2
      </button>
    </div>
  );
};
