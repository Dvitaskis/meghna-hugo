import { Node, mergeAttributes } from '@tiptap/core';

export const CalloutBlock = Node.create({
  name: 'calloutBlock',
  group: 'block',
  content: 'paragraph+',
  defining: true,

  addAttributes() {
    return {
      tone: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-tone') || 'info',
        renderHTML: (attributes) => ({ 'data-tone': attributes.tone }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="callout-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'callout-block', class: 'callout-block' }),
      ['div', { class: 'callout-icon', 'aria-hidden': 'true' }, '💡'],
      ['div', { class: 'callout-content' }, 0],
    ];
  },

  addCommands() {
    return {
      setCallout:
        () =>
        ({ commands }) =>
          commands.setNode(this.name),
    };
  },
});
