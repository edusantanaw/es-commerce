import { createClient } from "redis";
import { cache } from "../../protocols/cache/cache";
import { fork } from "child_process";
import { dirname } from "path";

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
    await client.set(key, JSON.stringify(data));
    await client.set(key + ":validate", JSON.stringify([]), { EX: 10 }); // 6 hours
    return;
  }

  async update<T>(data: T[], key: string) {
    await this.remove(key);
    const child = fork("./updateCache.ts");
    child.send({ data: data, key: key }); // update cache in second plan
    child.on("exit", () => console.log(`${key} cache updated!`));
    return;
  }

  async remove(key: string) {
    await client.del(key);
    return;
  }
}
