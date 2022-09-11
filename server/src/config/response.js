module.exports = (res, data, message, statusCode) => {
  res.status(statusCode).json({
    data: data,
    message: message,
  });
};
