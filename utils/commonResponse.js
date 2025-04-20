const sendResponse = (
  res,
  status,
  message,
  statusCode,
  data = null,
  errorDetails = null,
  action
) => {
  const response = {
    status: status,
    message: message,
    statusCode: statusCode,
    data: data,
    errorDetails: errorDetails,
    timestamp: new Date().toISOString(),
    action: action || "API Request",
  };
  if (status === "error" && !errorDetails) {
    res.errorDetails = {
      code: "500",
      description: "Internal Server Error",
    };
    res.status(500).json(response);
  } else {
    if (status === "success") {
      res.status(200).json(response);
    } else {
      res.status(400).json(response);
    }
  }
};

module.exports =  sendResponse ;
