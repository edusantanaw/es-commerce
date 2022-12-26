export interface activeUseCase {
  active: (userId: string, key: string) => Promise<void>;
}
