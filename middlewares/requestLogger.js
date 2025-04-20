const logRequestResponse = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log("Request:", {
      method: req.method,
      url: req.originalUrl,
      body: body,
    });

    console.log("Response:", body);
    originalSend.call(this, body);
  };

  next();
};

module.exports = { logRequestResponse };
