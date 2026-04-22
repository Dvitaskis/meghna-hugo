import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    calloutBlock: {
      setCallout: () => ReturnType;
    };
    toggleBlock: {
      setToggle: (summary?: string) => ReturnType;
    };
    imagePlaceholder: {
      insertImagePlaceholder: (attrs?: { src?: string; alt?: string }) => ReturnType;
    };
  }
}
