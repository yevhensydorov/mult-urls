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

requestMultipleUrls([1, 2, 3, "random"]).then(function(data) {
  console.log(data);
});

// Unmock.
fetchMock.reset();
