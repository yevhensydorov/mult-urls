const fetch = require("node-fetch");

module.exports = function requestMultipleUrls(urls) {
  return Promise.all(
    urls.map(url =>
      fetch(url)
        .then(checkStatus)
        .then(parseJSON)
        .catch(error => `There was a problem with request, ${error}`)
    )
  );
};

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(
      new Error(
        JSON.stringify({
          status: response.status,
          error: response.statusText,
          url: response.url
        })
      )
    );
  }
}

function parseJSON(response) {
  return {
    status: response.statusText,
    output: response.json(),
    statusCode: response.status,
    url: response.url
  };
}
