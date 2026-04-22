import { Extension, wrappingInputRule } from '@tiptap/core';

export const ChecklistShortcut = Extension.create({
  name: 'checklist-shortcut',

  addInputRules() {
    const taskListType = this.editor.schema.nodes.taskList;
    if (!taskListType) return [];

    return [
      wrappingInputRule({
        find: /^\[(?: |x)?\]\s$/,
        type: taskListType,
      }),
    ];
  },
});
