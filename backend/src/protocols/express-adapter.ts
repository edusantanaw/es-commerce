interface httpReponse {
  statusCode: number;
  body: any;
}

export interface Controller<T = any> {
  handle: (data: T) => Promise<any>;
}
