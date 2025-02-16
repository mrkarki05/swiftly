const handleError = (err, req, res, next) => {};
const clientError = (statusCode, message) => {
  let error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
export { handleError, clientError };
