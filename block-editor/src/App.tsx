import { useMemo, useState } from 'react';
import { JSONContent } from '@tiptap/react';
import { BlockEditor } from './components/BlockEditor';
import { sampleInitialContent } from './data/sampleContent';
import { exportHTML, exportMarkdown, serializeJSON } from './editor/utils/serialization';

function App() {
  const [value, setValue] = useState<JSONContent>(sampleInitialContent);
  const [readOnly, setReadOnly] = useState(false);

  const prettyJSON = useMemo(() => JSON.stringify(value, null, 2), [value]);

  return (
    <main className="page">
      <header className="header">
        <h1>BlockEditor Integration Example</h1>
        <div className="header-actions">
          <button onClick={() => setReadOnly((current) => !current)} type="button">
            {readOnly ? 'Switch to edit mode' : 'Switch to read-only'}
          </button>
          <button
            type="button"
            onClick={() => {
              const serialized = serializeJSON(value);
              window.alert(`Saved JSON length: ${serialized.length}`);
            }}
          >
            Mock Save
          </button>
        </div>
      </header>

      <BlockEditor
        value={value}
        onChange={setValue}
        onSave={(nextValue) => setValue(nextValue)}
        readOnly={readOnly}
        autoFocus
        onImageInsertRequest={async () => {
          const src = window.prompt('Mock image URL');
          if (!src) return null;
          return { src, alt: 'Inserted from image hook' };
        }}
      />

      <section className="exports">
        <h2>Live JSON</h2>
        <pre>{prettyJSON}</pre>

        <h2>Quick exports</h2>
        <p>HTML export is available through the helper utility and editor instance.</p>
        <p>Markdown export is plain-text style for now: {exportMarkdown(null) || 'requires editor instance'}</p>
        <p>HTML export sample: {exportHTML(null) || 'requires editor instance'}</p>
      </section>
    </main>
  );
}

export default App;
