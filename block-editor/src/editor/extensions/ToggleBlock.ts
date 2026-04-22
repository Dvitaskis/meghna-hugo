import { Node, mergeAttributes } from '@tiptap/core';

export const ToggleBlock = Node.create({
  name: 'toggleBlock',
  group: 'block',
  content: 'paragraph+',
  defining: true,

  addAttributes() {
    return {
      summary: {
        default: 'Toggle',
        parseHTML: (element) => element.getAttribute('data-summary') || 'Toggle',
        renderHTML: (attributes) => ({ 'data-summary': attributes.summary }),
      },
      open: {
        default: false,
        parseHTML: (element) => element.hasAttribute('open'),
        renderHTML: (attributes) => (attributes.open ? { open: 'open' } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'details[data-type="toggle-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'details',
      mergeAttributes(HTMLAttributes, { 'data-type': 'toggle-block', class: 'toggle-block' }),
      ['summary', { contenteditable: 'false' }, HTMLAttributes.summary || 'Toggle'],
      ['div', { class: 'toggle-content' }, 0],
    ];
  },

  addCommands() {
    return {
      setToggle:
        (summary = 'Toggle') =>
        ({ commands }) =>
          commands.setNode(this.name, { summary, open: true }),
    };
  },
});
