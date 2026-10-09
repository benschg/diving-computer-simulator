/**
 * Small Node/Express backend.
 *  - serves the production build (dist/) when NODE_ENV=production
 *  - /api/reference      -> list of research/reference markdown documents (docs/research)
 *  - /api/reference/:id  -> one markdown document
 *  - /api/dives          -> persisted simulated dive log (data/dives.json)
 */
import express, { type Request, type Response } from 'express';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const DIVES_FILE = path.join(DATA_DIR, 'dives.json');
const RESEARCH_DIR = path.join(ROOT, 'docs', 'research');
const PORT = Number(process.env.PORT ?? 3001);

interface StoredDive {
  id: string;
  createdAt: string;
  title: string;
  computerId: string;
  maxDepthM: number;
  durationS: number;
  samples: Array<{ t: number; d: number }>;
  events: Array<{ t: number; text: string }>;
}

const app = express();
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get('/api/reference', async (_req: Request, res: Response) => {
  const files = (await readdir(RESEARCH_DIR).catch(() => [] as string[])).filter((f) => f.endsWith('.md')).sort();
  res.json(files.map((f) => ({ id: f.replace(/\.md$/, ''), file: f })));
});

app.get('/api/reference/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id).replace(/[^a-z0-9-]/gi, '');
  try {
    const text = await readFile(path.join(RESEARCH_DIR, `${id}.md`), 'utf8');
    res.type('text/markdown').send(text);
  } catch {
    res.status(404).json({ error: 'not found' });
  }
});

async function loadDives(): Promise<StoredDive[]> {
  try {
    return JSON.parse(await readFile(DIVES_FILE, 'utf8')) as StoredDive[];
  } catch {
    return [];
  }
}

async function saveDives(dives: StoredDive[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DIVES_FILE, JSON.stringify(dives, null, 2));
}

app.get('/api/dives', async (_req: Request, res: Response) => {
  res.json(await loadDives());
});

app.post('/api/dives', async (req: Request, res: Response) => {
  const body = req.body as Partial<StoredDive>;
  if (!Array.isArray(body.samples) || typeof body.computerId !== 'string') {
    res.status(400).json({ error: 'samples[] and computerId are required' });
    return;
  }
  const dive: StoredDive = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    title: String(body.title ?? 'Simulated dive'),
    computerId: body.computerId,
    maxDepthM: Number(body.maxDepthM ?? 0),
    durationS: Number(body.durationS ?? 0),
    samples: body.samples.slice(0, 20000),
    events: Array.isArray(body.events) ? body.events.slice(0, 500) : [],
  };
  const dives = await loadDives();
  dives.unshift(dive);
  await saveDives(dives.slice(0, 200));
  res.status(201).json(dive);
});

app.delete('/api/dives/:id', async (req: Request, res: Response) => {
  const dives = await loadDives();
  const next = dives.filter((d) => d.id !== req.params.id);
  await saveDives(next);
  res.json({ removed: dives.length - next.length });
});

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(ROOT, 'dist');
  app.use(express.static(dist));
  app.get('/{*splat}', (_req: Request, res: Response) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
