import {fetch as fetchPolyfill} from 'whatwg-fetch';

const _fetch = window.fetch ? window.fetch : fetchPolyfill;

const methods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD'
];

const request = {};

function processData(data) {
  if (!data) return null;

  const type = Object.prototype.toString.call(data);
  if (type === '[object Object]' || type === '[object Array]') {
    return JSON.stringify(data);
  }
  return data;
}

methods.forEach(method => {
  request[method.toLowerCase()] = (url, options) => {
    if (method === 'get' || method === 'head') {
      delete options.data;
    } else {
      if (options && options.data) {
        options.data = processData(options.data);
      }
    }
    return _fetch(url, {
      ...options,
      method
    }).then(checkStatus)
    .then(parseJSON);
  }
});

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

function parseJSON(response) {
  return response.json();
}

export default request;
