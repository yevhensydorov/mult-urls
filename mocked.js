const requestMultipleUrls = require("./index");
const fetchMock = require("fetch-mock");

// Mock the fetch() global to return a response
fetchMock.get(
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  { hello: "world" },
  {
    delay: 1000 // fake a slow network
  }
);

requestMultipleUrls([
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://httpstat.us/403",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
  "https://httpstat.us/500"
]).then(function(data) {
  console.log(data);
});

// Unmock.
fetchMock.reset();
