export interface activeUseCase {
  active: (userId: string, key: string) => Promise<boolean>;
}
