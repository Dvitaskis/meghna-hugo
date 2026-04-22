import { JSONContent } from '@tiptap/react';

export const sampleInitialContent: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'Quarterly Planning Notes' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: "Type '/' for commands. This editor stores structured JSON and supports rich blocks." },
      ],
    },
    {
      type: 'taskList',
      content: [
        { type: 'taskItem', attrs: { checked: true }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Review pipeline metrics' }] }] },
        { type: 'taskItem', attrs: { checked: false }, content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Prepare leadership summary' }] }] },
      ],
    },
    {
      type: 'calloutBlock',
      attrs: { tone: 'info' },
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Use callouts to emphasize risks, decisions, or links.' }] }],
    },
    {
      type: 'toggleBlock',
      attrs: { summary: 'Implementation details' },
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hidden by default. Expand for additional notes.' }] }],
    },
  ],
};
