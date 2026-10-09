import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Simulation } from './sim/simulation';
import { SimProvider } from './sim/store';
import './styles.css';

const sim = new Simulation();
if (import.meta.env.DEV) (window as unknown as { __sim: Simulation }).__sim = sim;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimProvider sim={sim}>
      <App />
    </SimProvider>
  </StrictMode>,
);
