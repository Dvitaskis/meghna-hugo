import { Node, mergeAttributes } from '@tiptap/core';

export const ImagePlaceholder = Node.create({
  name: 'imagePlaceholder',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: '' },
      alt: { default: 'Image placeholder' },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="image-placeholder"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'image-placeholder', class: 'image-placeholder' }),
      HTMLAttributes.src ? ['img', { src: HTMLAttributes.src, alt: HTMLAttributes.alt }] : ['span', {}, 'Image block'],
    ];
  },

  addCommands() {
    return {
      insertImagePlaceholder:
        (attrs?: { src?: string; alt?: string }) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: { src: attrs?.src ?? '', alt: attrs?.alt ?? 'Image placeholder' } }),
    };
  },
});
