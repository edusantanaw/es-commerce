export interface senderEmail {
  sender: (email: string) => Promise<string>;
  config: () => void;
}
