import { Editor, JSONContent } from '@tiptap/react';

export const serializeJSON = (value: JSONContent): string => JSON.stringify(value);

export const deserializeJSON = (value: string): JSONContent => {
  try {
    return JSON.parse(value) as JSONContent;
  } catch {
    return { type: 'doc', content: [{ type: 'paragraph' }] };
  }
};

export const exportHTML = (editor: Editor | null): string => editor?.getHTML() ?? '';

export const exportMarkdown = (editor: Editor | null): string => {
  if (!editor) return '';
  return editor.getText({ blockSeparator: '\n\n' });
};
