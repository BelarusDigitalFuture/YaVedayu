import axios from 'axios';

const getRequestOptions = (options) => {
  const requestOptions = {
    ...options,
    method: (options.method || 'GET').toUpperCase(),
    baseURL: "http://ec2-3-139-239-182.us-east-2.compute.amazonaws.com:3000/",
  };

  if (options.json) {
    requestOptions.headers['Content-Type'] = 'application/json';

    if (requestOptions.body) {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }
  }

  return requestOptions;
};

export function baseRequest(
  path,
  options = {},
) {
  const requestOptions = getRequestOptions(options);

  return axios(path, requestOptions).then((response) => {
    return response.data;
  }, (error) => {
    return error;
  });
}
