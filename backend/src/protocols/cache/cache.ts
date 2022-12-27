export interface cache {
  get: <T>(key: string) => Promise<T[] | null>;
  set: <T>(data: T[], key: string) => Promise<void>;
  update: <T>(data: T[], key: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
}
