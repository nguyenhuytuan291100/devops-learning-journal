type UrlRecord = { url: string; createdAt: number };

export class InMemoryUrlStore {
  private urlMap: Record<string, UrlRecord> = {};

  save(code: string, url: string): void {
    this.urlMap[code] = { url, createdAt: Date.now() };
  }

  exists(code: string): boolean{
    return !this.urlMap[code];
  }

  findUrl(code: string):string | null{
    return this.urlMap[code]?.url ?? null;
  }

  getOriginalUrlUnsafe(code: string): string{
    return this.urlMap[code]?.url || '';
  }
}
