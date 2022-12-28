console.log("Update cache", process.pid);
import { Cache } from "./src/infra/cache/cache";

process.once("message", async (data, key) => {
  console.log(data, key);
  await UpdateChache(data as unknown[], key as string);
});

async function UpdateChache(data: unknown[], key: string) {
  const cache = new Cache();
  await cache.set<unknown>(data, key);
  return;
}
