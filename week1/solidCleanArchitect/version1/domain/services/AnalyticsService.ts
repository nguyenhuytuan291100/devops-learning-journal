type ClickLog = { at: number; userAgent: string };

export class AnalyticsService {
  private clickLogs: Record<string, ClickLog[]> = {};

  recordClick(code: string, userAgent: string): void {
    const now = Date.now();
    if (!this.clickLogs[code]) this.clickLogs[code] = [];
    this.clickLogs[code].push({ at: now, userAgent });
  }

  totalClicks(code: string): number {
    return (this.clickLogs[code] ?? []).length;
  }

  topUserAgents(code: string, topN = 3): Array<[string, number]> {
    const logs = this.clickLogs[code] ?? [];
    const counts: Record<string, number> = {};
    for (const l of logs) counts[l.userAgent] = (counts[l.userAgent] || 0) + 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN);
  }

  countInWindow(code: string, windowMs: number): number {
    const now = Date.now();
    const since = now - windowMs;
    return (this.clickLogs[code] ?? []).filter((l) => l.at >= since).length;
  }
}
