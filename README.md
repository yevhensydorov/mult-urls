# mult-urls-request

Small JavaScript package that is able to fetch multiple urls

[![npm (scoped)](https://img.shields.io/npm/v/@yevhensydorov/mult-urls.svg)](https://www.npmjs.com/package/yevhensydorov/mult-urls)

Fetch multiple urls and return their content in a promise

## Install

```
$ npm install @yevhensydorov/mult-urls
```

## Link to npm

https://www.npmjs.com/package/@yevhensydorov/mult-urls

## Usage

```js
const requestMultipleUrls = require("@yevhensydorov/mult-urls");

const urls = [
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://httpstat.us/403",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
  "https://httpstat.us/500"
];

/* Return json with data to index route */
router.get("/", function(req, res, next) {
  const data = requestMultipleUrls(urls)
    .then(urlContent => urlContent)
    .then(json => {
      return res.json(json);
    });
});
```

It will return a response in the next format

```js
[
    {
        "status": "OK",
        "output": Promise {
                    { data: { items: [Array] }, timeGenerated: '2019-11-15T11:07:58' }
                  },
        "statusCode": 200,
        "url": "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json"
    },
    "There was a problem with request, Error: {\"status\":403,\"error\":\"Forbidden\",\"url\":\"https://httpstat.us/403\"}",
    {
        "status": "OK",
        "output": Promise {
                    { data: { items: [Array] }, timeGenerated: '2019-11-15T11:08:17' }
                  },
        "statusCode": 200,
        "url": "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json"
    },
    {
        "status": "OK",
        "output": Promise {
                    { data: { items: [Array] }, timeGenerated: '2019-11-15T10:30:00' }
                  },
        "statusCode": 200,
        "url": "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json"
    },
    "There was a problem with request, Error: {\"status\":500,\"error\":\"Internal Server Error\",\"url\":\"https://httpstat.us/500\"}"
]
```

So, content of each url will be in the `output` property of each iterable object, e.g `"output": Promise { { data: { items: [Array] }, timeGenerated: '2019-11-15T10:30:00' } }`

## Choice of dependencies

There are 3 packages which helped me to develop this library: `node-fetch`(https://www.npmjs.com/package/node-fetch), `fetch-mock`(https://www.npmjs.com/package/fetch-mock) and `jest`(https://jestjs.io/en).

### node-fetch

I used Node fetch for being able to use library in server side applications. Otherwise it won’t work because fetch is available from the box just in browsers.
Second option was to pass `fetch` argument to the function invokation, e.g `requestMultipleUrls(urls, fetch).then(......)`

### fetch-mock

I’ve used fetch-mock for tdd reasons. It gave me an opportunity to test library functionality without creating any server side application. I can run fetch-mock with `node mocked.js` and it gives me response in console. Run the fetch-mock: `node mocked.js`

### jest

I was using Jest for creating couple of tests. There are tests for fetch, response and error handling. To run the tests `npm run test`

## Error handling

There is error handling in the library. If response status of url is NOT OK, it will do `Promise.reject` and show message in the format:
`js'There was a problem with request, Error: {"status":403,"error":"Forbidden","url":"https://httpstat.us/403"}'`
I’ve chosen to return error object in the stringify json format with next properties: `status`, `statusText` and `request url`.

If response is OK, function returns object with next properties: `response text status`, `Promise with data in json format`, `response status code` and `request url`.
