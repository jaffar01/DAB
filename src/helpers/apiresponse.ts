export const apiResponse = (status, response = {}) => {
  let statusCode = 200;
  let apiStatus = true;

  if (typeof status === 'boolean') {
    apiStatus = status;
  } else {
    statusCode = status.code || 200;
    apiStatus = status.status;
  }

  const result = {
    status: apiStatus,
    ...response,
  };
  return result;
};
