import type { ComponentType } from 'react';
import type { ComputerCore } from '../sim/core';
import type { ComputerSettings } from '../sim/types';

export interface ButtonSpec {
  id: string;
  label: string;
  /** what a short press does (shown as a tooltip) */
  short: string;
  /** what a long press does */
  long?: string;
}

export interface ConservatismOption {
  value: number;
  label: string;
  description: string;
}

export interface ReferenceNote {
  topic: string;
  text: string;
  source: { title: string; url: string; page?: string };
}

export interface DisplayProps {
  fw: ComputerCore;
}

export interface ComputerDefinition {
  id: string;
  brand: string;
  model: string;
  tagline: string;
  category: 'generic' | 'entry' | 'mid' | 'watch';
  algorithm: string;
  summary: string;
  buttons: ButtonSpec[];
  conservatism: ConservatismOption[];
  /** O2 % range the computer accepts in nitrox mode */
  o2Range: [number, number];
  create: (settings: ComputerSettings) => ComputerCore;
  Display: ComponentType<DisplayProps>;
  reference: ReferenceNote[];
  /** rendered width of the skin in px (height follows the skin) */
  width: number;
}
