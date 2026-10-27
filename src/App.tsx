import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

// The CLI may install the component into this configured folder.
// Restart Vite after installing the authentic component.
const componentFiles = import.meta.glob<Record<string, unknown>>(
  './components/originkit/ui/*.{tsx,jsx}'
);

type Loaded = { Component: ComponentType; error: string | null };

function useCursorRingField(): Loaded {
  const [loaded, setLoaded] = useState<Loaded>({ Component: () => null, error: null });
  useEffect(() => {
    const matched = Object.entries(componentFiles).find(([path]) =>
      /\/cursor-ring-field\.(tsx|jsx)$/.test(path)
    );
    if (!matched) {
      setLoaded({ Component: () => null, error: 'not-installed' });
      return;
    }
    let active = true;
    matched[1]().then((module) => {
      if (!active) return;
      const candidate = module.default ?? module.CursorRingField ??
        Object.entries(module).find(([key]) => /cursor.*ring.*field/i.test(key))?.[1];
      const valid = typeof candidate === 'function' ||
        (typeof candidate === 'object' && candidate !== null);
      setLoaded(valid ? { Component: candidate as ComponentType, error: null } : {
        Component: () => null,
        error: 'The component installed, but its export name needs to be mapped in src/App.tsx.'
      });
    }).catch(() => {
      if (active) setLoaded({ Component: () => null, error: 'Component could not be loaded. See browser console.' });
    });
    return () => { active = false; };
  }, []);
  return loaded;
}

export default function App() {
  const { Component, error } = useCursorRingField();
  return (
    <main className="shell">
      <header className="topbar">
        <div className="logo"><span className="logo-mark" /> ORIGINKIT <span className="logo-muted">/ LAB</span></div>
        <a href="https://www.originkit.dev/docs/components" target="_blank" rel="noreferrer">Documentation <span aria-hidden="true">↗</span></a>
      </header>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="tag"><span className="dot"/> INTERACTIVE COMPONENT / 001</div>
        <h1 id="hero-heading">Cursor <em>Ring Field.</em></h1>
        <p className="lede">A dedicated canvas for Originkit's motion component. Move your cursor to explore once it's installed.</p>
        <div className="stage" aria-label="Cursor Ring Field demo area">
          {error ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">◎</span>
              <h2>{error === 'not-installed' ? 'Ready for installation' : 'Setup needs attention'}</h2>
              <p>{error === 'not-installed' ? 'This repository is a starter. Install the authentic Originkit component with the command below; this canvas will automatically display it.' : error}</p>
              <code>npm run install:component</code>
            </div>
          ) : <Component />}
          <span className="stage-label">LIVE COMPONENT CANVAS</span>
        </div>
        <div className="footer-line"><span>REACT + VITE + TYPESCRIPT</span><span>BUILT FOR EXPERIMENTATION</span></div>
      </section>
    </main>
  );
}
