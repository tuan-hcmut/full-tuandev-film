module.exports = (res, data, token, message, statusCode) => {
  res.status(statusCode || 200).json({
    token,
    data: data,
    message: message,
  });
};
