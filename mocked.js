const requestMultipleUrls = require("./index");
const fetchMock = require("fetch-mock");

fetchMock.get(
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  { hello: "world" },
  {
    delay: 1000
  }
);

requestMultipleUrls([1, 2, 3, "random"]).then(function(data) {
  console.log(data);
});

fetchMock.reset();
