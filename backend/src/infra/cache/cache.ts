import { createClient } from "redis";
import { cache } from "../../protocols/cache/cache";
import { fork } from "child_process";

export const client = createClient();
client.connect();

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
    await client.set(key, JSON.stringify(data), { EX: 1000 }); // 1 hours
    return;
  }

  async update<T>(data: T[], key: string) {
    // const child = fork("./src/children_process/updateCache.ts");
    // child.send({ type: type, key: key }); // update cache in second plan
    await this.remove(key);
    await this.set(data, key);
    return;
  }

  async remove(key: string) {
    await client.del(key);
    return;
  }
}
