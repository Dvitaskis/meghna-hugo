import { Editor, Extension } from '@tiptap/core';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import tippy, { Instance, Props } from 'tippy.js';
import { ReactRenderer } from '@tiptap/react';
import { SlashMenu, SlashMenuItem } from '../ui/SlashMenu';

const commands = (editor: Editor): SlashMenuItem[] => [
  { title: 'Paragraph', keywords: ['text'], action: () => editor.chain().focus().setParagraph().run() },
  { title: 'Heading 1', keywords: ['h1', 'title'], action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
  { title: 'Heading 2', keywords: ['h2', 'subtitle'], action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { title: 'Heading 3', keywords: ['h3'], action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  { title: 'Bullet List', keywords: ['ul', 'list'], action: () => editor.chain().focus().toggleBulletList().run() },
  { title: 'Numbered List', keywords: ['ol', 'ordered'], action: () => editor.chain().focus().toggleOrderedList().run() },
  { title: 'Checklist', keywords: ['todo', 'task'], action: () => editor.chain().focus().toggleTaskList().run() },
  { title: 'Quote', keywords: ['blockquote'], action: () => editor.chain().focus().toggleBlockquote().run() },
  { title: 'Code Block', keywords: ['code'], action: () => editor.chain().focus().toggleCodeBlock().run() },
  { title: 'Divider', keywords: ['rule'], action: () => editor.chain().focus().setHorizontalRule().run() },
  { title: 'Toggle', keywords: ['collapse'], action: () => editor.chain().focus().setToggle('Details').run() },
  { title: 'Callout', keywords: ['note'], action: () => editor.chain().focus().setCallout().run() },
  {
    title: 'Table',
    keywords: ['rows', 'columns'],
    action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: 'Image Placeholder',
    keywords: ['image', 'media'],
    action: () => editor.chain().focus().insertImagePlaceholder().run(),
  },
];

const suggestion: Partial<SuggestionOptions> = {
  char: '/',
  startOfLine: true,

  items: ({ query, editor }) => {
    return commands(editor)
      .filter((item) => {
        const q = query.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.keywords.some((word) => word.includes(q));
      })
      .slice(0, 12);
  },

  render: () => {
    let component: ReactRenderer<{
      items: SlashMenuItem[];
      command: (item: SlashMenuItem) => void;
    }>;
    let popup: Instance<Props>[];

    return {
      onStart: (props) => {
        component = new ReactRenderer(SlashMenu, {
          props: {
            items: props.items,
            command: (item) => {
              item.action();
              props.command({ id: item.title });
            },
          },
          editor: props.editor,
        });

        if (!props.clientRect) return;

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props) {
        component.updateProps({
          items: props.items,
          command: (item) => {
            item.action();
            props.command({ id: item.title });
          },
        });

        if (!props.clientRect) return;
        popup[0].setProps({ getReferenceClientRect: props.clientRect });
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }
        return component.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

export const SlashCommand = Extension.create({
  name: 'slash-command',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...suggestion,
      }),
    ];
  },
});
