import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInteractions } from './InteractionsContext';

function getUniqueSelector(target: Element, root?: Element | null): string {
  // Build a simple unique selector path relative to the slide container
  const parts: string[] = [];
  let el: Element | null = target;
  const limit = 8;
  while (el && el !== root && parts.length < limit) {
    const tag = el.tagName.toLowerCase();
    const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : '';
    let selector = `${tag}${id}`;
    if (!id) {
      // tag:nth-child index among same tag siblings
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === el!.tagName);
        const idx = siblings.indexOf(el);
        selector += `:nth-of-type(${idx + 1})`;
      }
    }
    parts.unshift(selector);
    el = el.parentElement;
  }
  return parts.join(' > ');
}

const Panel: React.FC<{
  slideId: string;
  anchor: { x: number; y: number } | null;
  targetEl: Element | null;
  onClose: () => void;
}> = ({ slideId, anchor, targetEl, onClose }) => {
  const { getInteractionIdsForSlide, getStats, getBoundInteractionForSelector, bindSelectorToInteraction } = useInteractions();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selector = useMemo(() => (targetEl ? getUniqueSelector(targetEl, targetEl.closest('[data-slide-root="true"]')) : ''), [targetEl]);
  const bound = useMemo(() => (selector ? getBoundInteractionForSelector(slideId, selector) : null), [selector, slideId, getBoundInteractionForSelector]);
  const ids = getInteractionIdsForSlide(slideId);

  useEffect(() => {
    if (bound && ids.includes(bound)) setSelectedId(bound);
  }, [bound, ids]);

  const stats = selectedId ? getStats(slideId, selectedId) : null;

  const style: React.CSSProperties = anchor
    ? { position: 'fixed', top: anchor.y + 8, left: anchor.x + 8, zIndex: 1000 }
    : { display: 'none' };

  return (
    <div style={style} className="max-w-sm rounded-lg shadow-lg border border-gray-300 bg-white text-gray-900 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm">Interactions for this spot</div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
      </div>

      <div className="mb-2 text-xs break-words">
        <div className="text-gray-500">Selector:</div>
        <div className="font-mono">{selector || '(unknown element)'}</div>
      </div>

      <div className="mb-2">
        <label className="text-xs text-gray-600">Interaction</label>
        <select
          className="w-full text-sm border rounded px-2 py-1"
          value={selectedId || ''}
          onChange={e => setSelectedId(e.target.value || null)}
        >
          <option value="">Select interaction...</option>
          {ids.map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>
      </div>

      {selectedId && (
        <button
          className="mb-2 w-full text-xs bg-indigo-600 text-white rounded px-2 py-1 hover:bg-indigo-700"
          onClick={() => selector && bindSelectorToInteraction(slideId, selector, selectedId)}
        >
          Bind to this element
        </button>
      )}

      <div className="text-xs">
        {selectedId ? (
          <>
            <div className="font-semibold mb-1">Stats for {selectedId}</div>
            {stats && (
              <div className="space-y-1">
                <div>Count: {stats.count || 0}</div>
                {stats.type === 'number' && (
                  <>
                    <div>Avg: {Number(stats.avg).toFixed(2)}</div>
                    <div>Min: {stats.min}</div>
                    <div>Max: {stats.max}</div>
                  </>
                )}
                {stats.type === 'boolean' && (
                  <>
                    <div>True: {stats.true}</div>
                    <div>False: {stats.false}</div>
                  </>
                )}
                {stats.type === 'string' && stats.top && (
                  <div>
                    Top values:
                    <ul className="list-disc ml-5">
                      {stats.top.map((t: any) => (
                        <li key={t.value}>{t.value}: {t.freq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-500">Pick an interaction to view stats</div>
        )}
      </div>
    </div>
  );
};

export const SlideInspector: React.FC<{
  slideRootRef: React.RefObject<HTMLDivElement>;
  slideId: string;
  enabled: boolean;
}> = ({ slideRootRef, slideId, enabled }) => {
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const [targetEl, setTargetEl] = useState<Element | null>(null);
  const localRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = slideRootRef.current;
    if (!root || !enabled) return;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as Element;
      setTargetEl(target);
      setAnchor({ x: e.clientX, y: e.clientY });
    };

    root.addEventListener('click', handleClick, true);
    return () => {
      root.removeEventListener('click', handleClick, true);
    };
  }, [slideRootRef, enabled]);

  useEffect(() => {
    if (!slideRootRef.current) return;
    // Mark root for selector calculation
    slideRootRef.current.setAttribute('data-slide-root', 'true');
  }, [slideRootRef]);

  if (!enabled) return null;

  return (
    <div ref={localRef}>
      <Panel
        slideId={slideId}
        anchor={anchor}
        targetEl={targetEl}
        onClose={() => setAnchor(null)}
      />
    </div>
  );
}; 

// Adding a default export component to fix Next.js build error
const SlideInspectorComponent: React.FC = () => {
  return (
    <div>
      <h1>Slide Inspector</h1>
      <p>This is a inspector component for slide management.</p>
    </div>
  );
};

export default SlideInspectorComponent; 