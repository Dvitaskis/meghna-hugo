# BlockEditor (React + TypeScript + TipTap)

A reusable, production-oriented Notion-style block editor component for internal tools.

## Setup

```bash
cd block-editor
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
npm run preview
```

## File structure

```txt
block-editor/
  src/
    components/
      BlockEditor.tsx
    data/
      sampleContent.ts
    editor/
      extensions/
        CalloutBlock.ts
        ChecklistShortcut.ts
        ImagePlaceholder.ts
        SlashCommand.ts
        ToggleBlock.ts
        commands.d.ts
      ui/
        BlockActionsMenu.tsx
        BubbleToolbar.tsx
        SlashMenu.tsx
      utils/
        serialization.ts
    App.tsx
    main.tsx
    styles.css
```

## `BlockEditor` API

- `value?: JSONContent`
- `onChange?: (value: JSONContent) => void`
- `onSave?: (value: JSONContent) => void` (bound to Cmd/Ctrl + S)
- `readOnly?: boolean`
- `autoFocus?: boolean`
- `placeholder?: string`
- `className?: string`
- `onImageInsertRequest?: () => Promise<{src: string; alt?: string} | null>`

## Data helpers

`src/editor/utils/serialization.ts`:
- `serializeJSON`
- `deserializeJSON`
- `exportHTML`
- `exportMarkdown` (plain-text approximation, easy to swap with richer serializer)

## How to integrate into an existing app

1. Copy `src/components/BlockEditor.tsx` and `src/editor/*` modules into your app.
2. Ensure TipTap dependencies from `package.json` are installed.
3. Keep editor state in the parent container and pass `value` + `onChange`.
4. Persist JSON in your backend (recommended) and hydrate with `value`.
5. Hook `onSave` to your API mutation command.
6. Connect `onImageInsertRequest` to your upload modal or media service.

## Known limitations

- Drag-and-drop block reordering is not yet implemented.
- Markdown export is currently a text-based approximation.
- Toggle summary editing is static by default; promote to a node view for inline summary editing if needed.

## Next improvements

- Add drag-and-drop using `@dnd-kit` + ProseMirror position mapping.
- Add richer color palettes and keyboard-only slash menu sections.
- Add server-side sanitization and schema versioning for long-term persistence.
- Add collaborative mode later via TipTap Collaboration + Hocuspocus/Yjs.

## Collaboration extension plan (later)

- Add Yjs document transport in a separate `collab` module.
- Replace local `value` state with CRDT provider state.
- Keep editor schema stable and versioned to avoid migration issues.
- Add presence cursors + user awareness with low-frequency sync.
