/** Sliding-window ascent-rate estimator. Positive rate = ascending (depth decreasing). */
export class AscentRateMeter {
  private samples: Array<{ t: number; d: number }> = [];

  constructor(private readonly windowS = 10) {}

  reset(): void {
    this.samples = [];
  }

  push(tS: number, depthM: number): void {
    this.samples.push({ t: tS, d: depthM });
    const cutoff = tS - this.windowS;
    while (this.samples.length > 2 && this.samples[0].t < cutoff) this.samples.shift();
  }

  /** Vertical speed in m/min over the window (ascent positive, descent negative). */
  rateMPerMin(): number {
    if (this.samples.length < 2) return 0;
    const first = this.samples[0];
    const last = this.samples[this.samples.length - 1];
    const dt = last.t - first.t;
    if (dt <= 0) return 0;
    return ((first.d - last.d) / dt) * 60;
  }
}
