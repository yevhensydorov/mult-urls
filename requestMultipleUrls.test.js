jest.mock("node-fetch");
const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");

const requestMultipleUrls = require("./index");

test("requestMultipleUrls calls fetch right times with args and have right amount of responses", async () => {
  const urls = [
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
    "https://httpstat.us/403",
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
    "https://httpstat.us/500"
  ];

  fetch.mockReturnValue(Promise.resolve(new Response("something")));

  const response = await requestMultipleUrls(urls);

  expect(fetch).toHaveBeenCalledTimes(5);

  urls.map(url => {
    expect(fetch).toHaveBeenCalledWith(url);
  });

  expect(response).toHaveLength(5);
});

test("requestMultipleUrls calls fetch with empty array and return empty array(nothing)", async () => {
  fetch.mockReturnValue(Promise.resolve(new Response("something")));

  const expected = ["Something"];

  await requestMultipleUrls([]);

  expect.not.arrayContaining(expected);
});

test("requestMultipleUrls calls fetch with not valid urls", async () => {
  const notValidUrls = [1, 2, 3, "random"];

  const expected = [
    "There was a problem with request, TypeError: Only absolute URLs are supported",
    "There was a problem with request, TypeError: Only absolute URLs are supported",
    "There was a problem with request, TypeError: Only absolute URLs are supported",
    "There was a problem with request, TypeError: Only absolute URLs are supported"
  ];

  fetch.mockReturnValue(
    Promise.reject(new TypeError("Only absolute URLs are supported"))
  );

  const response = await requestMultipleUrls(notValidUrls);

  expect(response).toStrictEqual(expected);
});
