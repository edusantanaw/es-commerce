import { createClient } from "redis";
import { cache } from "../../protocols/cache/cache";

const client = createClient();

export class Cache implements cache {
  async get<T>(key: string) {
    const data = await client.get(key);
    if (data) {
      const response: T[] = JSON.parse(data);
      return response;
    }
    return null;
  }

  async set<T>(data: T[], key: string) {
    await client.set(key, JSON.stringify(data), { EX: 21600 }); // 6 hours
    return;
  }

  async update<T>(data: T[], key: string) {
    await this.remove(key);
    await client.set(key, JSON.stringify(data), { EX: 21600 });
    return;
  }

  async remove(key: string) {
    await client.del(key);
    return;
  }
}
