import { marked } from 'marked';
import { useEffect, useMemo, useState } from 'react';
import { COMPUTERS } from '../computers/registry';

interface DocEntry {
  id: string;
  file: string;
}

const DOC_TITLES: Record<string, string> = {
  padi: 'PADI: eLearning simulator, teaching points, RDP, emergency deco',
  suunto: 'Suunto Zoop Novo / D4i / D5 manuals',
  shearwater: 'Shearwater Peregrine / Perdix 2 / Teric manuals',
  'oceanic-aqualung': 'Oceanic Veo 4.0, Geo 4.0 and Aqua Lung i300C manuals',
  'mares-cressi': 'Mares Puck Pro+ and Cressi Leonardo manuals',
  'garmin-scubapro': 'Garmin Descent and Scubapro Galileo manuals (partial)',
};

export function ReferencePage() {
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [docId, setDocId] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/reference')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))))
      .then((list: DocEntry[]) => setDocs(list))
      .catch(() => setError('The reference API is not running (start it with `npm run dev`).'));
  }, []);

  useEffect(() => {
    if (!docId) return;
    setMarkdown('');
    fetch(`/api/reference/${docId}`)
      .then((r) => r.text())
      .then(setMarkdown)
      .catch(() => setMarkdown('Could not load the document.'));
  }, [docId]);

  const html = useMemo(() => (markdown ? (marked.parse(markdown, { async: false }) as string) : ''), [markdown]);

  return (
    <div className="page wide">
      <h2>Reference</h2>
      <p className="muted">
        Every behaviour in the simulator is traced to a manual page or an official source. The short notes below are built into each computer; the full
        research documents (with quotations and page numbers) are served by the Node API from <code>docs/research</code>.
      </p>
      <div className="ref-grid">
        {COMPUTERS.filter((c) => c.reference.length > 0).map((c) => (
          <section key={c.id} className="panel">
            <div className="panel-head">
              <h3>
                {c.brand} {c.model}
              </h3>
              <span className="muted">{c.algorithm}</span>
            </div>
            <dl className="ref-list">
              {c.reference.map((r) => (
                <div key={r.topic} className="ref-item">
                  <dt>{r.topic}</dt>
                  <dd>
                    {r.text}{' '}
                    <a href={r.source.url} target="_blank" rel="noreferrer" className="ref-source">
                      {r.source.title}
                      {r.source.page ? `, ${r.source.page}` : ''}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <section className="panel docs">
        <div className="panel-head">
          <h3>Research documents</h3>
          {error && <span className="muted">{error}</span>}
        </div>
        <div className="controls-row">
          {docs.map((d) => (
            <button key={d.id} className={`chip ${docId === d.id ? 'is-on' : ''}`} onClick={() => setDocId(d.id)}>
              {DOC_TITLES[d.id] ?? d.id}
            </button>
          ))}
        </div>
        {docId && <article className="markdown" dangerouslySetInnerHTML={{ __html: html || '<p class="muted">Loading…</p>' }} />}
      </section>
    </div>
  );
}
