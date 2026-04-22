import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export type SlashMenuItem = {
  title: string;
  keywords: string[];
  action: () => void;
};

type Props = {
  items: SlashMenuItem[];
  command: (item: SlashMenuItem) => void;
};

export const SlashMenu = forwardRef<{ onKeyDown: (props: { event: KeyboardEvent }) => boolean }, Props>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }

        if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }

        if (event.key === 'Enter') {
          const item = items[selectedIndex];
          if (item) {
            command(item);
            return true;
          }
        }

        return false;
      },
    }));

    if (!items.length) {
      return <div className="slash-menu">No commands found</div>;
    }

    return (
      <div className="slash-menu" role="menu" aria-label="Slash command menu">
        {items.map((item, idx) => (
          <button
            className={`slash-menu-item ${idx === selectedIndex ? 'active' : ''}`}
            key={item.title}
            onClick={() => command(item)}
            role="menuitem"
            type="button"
          >
            {item.title}
          </button>
        ))}
      </div>
    );
  },
);

SlashMenu.displayName = 'SlashMenu';
