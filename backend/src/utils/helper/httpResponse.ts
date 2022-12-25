class HttpResponse {
  badRequest(error: { message: string }) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }

  unauthorized(error: { message: string }) {
    return {
      statusCode: 401,
      body: error.message,
    };
  }

  catch(error: unknown) {
    return {
      statusCode: 400,
      body: error,
    };
  }
  success(data: any) {
    return {
      statusCode: 200,
      body: data,
    };
  }
}

export default new HttpResponse();
