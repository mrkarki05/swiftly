const handleError = (err, req, res, next) => {
  console.log(err.name);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const fieldName = err.keyValue;
    message = Object.keys(fieldName)[0] + " already exists";
  }
  if (err.name === "ValidationError") {
    statusCode = 400;
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
const clientError = (statusCode, message) => {
  let error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
export { handleError, clientError };
