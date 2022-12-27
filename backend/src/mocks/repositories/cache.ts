export class CacheSpy {
  data: any[] | null = null;
  async get<T>(key: string) {
    return this.data;
  }
  async set<T>(data: T[], key: string) {
    this.data;
    return;
  }
  async update<T>(data: T[], key: string) {
    this.data;
    return;
  }
  async remove(key: string) {
    return;
  }
}
