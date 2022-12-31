console.log("Update cache", process.pid);
import { Cache } from "../infra/cache/cache";
import { ProductRepository } from "../infra/repositories/productRepository";

process.once("message", async ({ type, key }) => {
  let queue = [];
  if (queue.length > 0) return;
  queue.push(key);
  await UpdateChache(type as string, key as string);
  queue = [];
});

async function UpdateChache(type: string, key: string) {
  console.log(key);
  const cache = new Cache();
  await cache.remove(key);
  const productRepository = new ProductRepository();
  const method = repos[type];
  const data = await method(productRepository);
  await cache.set<unknown>(data, key);
  return;
}

const repos: any = {
  loadAll: async (repo: any) => {
    const prods = await repo.loadAll();
    return prods;
  },
};
