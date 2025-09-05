import React, { useMemo, useState } from 'react';
import { useInteractions } from './InteractionsContext';

export const SlideAnalyticsPanel: React.FC<{
  slideId: string;
  onClose: () => void;
}> = ({ slideId, onClose }) => {
  const { getSlideSummary, getInteractionIdsForSlide, getStats } = useInteractions();
  const summary = getSlideSummary(slideId);
  const interactionIds = getInteractionIdsForSlide(slideId);
  const [selected, setSelected] = useState<string | null>(interactionIds[0] || null);

  const stats = useMemo(() => (selected ? getStats(slideId, selected) : null), [selected, slideId, getStats]);

  return (
    <div className="fixed right-6 top-16 z-[1000] w-[380px] max-h-[70vh] overflow-y-auto rounded-xl shadow-2xl border border-gray-300 bg-white text-gray-900">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="text-sm font-semibold">Slide Analytics</div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
      </div>

      <div className="p-4 space-y-4 text-sm">
        <div>
          <div className="text-gray-500">Slide</div>
          <div className="font-medium">{summary.slideTitle || slideId}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            <div className="text-xs text-gray-500">Participants</div>
            <div className="text-lg font-semibold">{summary.participants}</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            <div className="text-xs text-gray-500">Avg Time (ms)</div>
            <div className="text-lg font-semibold">{summary.timeSpent.avg ? Math.round(summary.timeSpent.avg) : '-'}</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            <div className="text-xs text-gray-500">Interactions</div>
            <div className="text-lg font-semibold">{summary.interactionIds.length}</div>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600">Interaction</label>
          <select
            className="w-full text-sm border rounded px-2 py-1"
            value={selected || ''}
            onChange={e => setSelected(e.target.value || null)}
          >
            {interactionIds.length === 0 && <option value="">No interactions</option>}
            {interactionIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        {selected && stats && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500">Stats for {selected}</div>
            <div className="bg-gray-50 border border-gray-200 rounded p-3">
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
          </div>
        )}
      </div>
    </div>
  );
}; 


// Adding a default export component to fix Next.js build error
const SlideAnalyticsPanelComponent: React.FC = () => {
  return (
    <div>
      <h1>Slide Analytics Panel</h1>
      <p>This is a analytics panel component for slide management.</p>
    </div>
  );
};

export default SlideAnalyticsPanelComponent; 