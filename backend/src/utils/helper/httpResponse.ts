class HttpResponse {
  badRequest(error: { message: string }) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  unauthorized(error: { message: string }) {
    return {
      statusCode: 401,
      body: error,
    };
  }
}

export default new HttpResponse();
