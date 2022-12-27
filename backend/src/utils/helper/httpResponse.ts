function badRequest(error: { message: string }) {
  return {
    statusCode: 400,
    body: error.message,
  };
}

function unauthorized(error: { message: string }) {
  return {
    statusCode: 401,
    body: error.message,
  };
}

function server(error: unknown) {
  return {
    statusCode: 400,
    body: error,
  };
}

function notContent(name: string) {
  return {
    statusCode: 204,
    body: `${name} not found!`,
  };
}
function success(data: any) {
  return {
    statusCode: 200,
    body: data,
  };
}

export { badRequest, notContent, server, success, unauthorized };
