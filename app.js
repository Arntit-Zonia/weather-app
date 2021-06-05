const requestResponseData = require("./requestData.js");

requestResponseData.getTemperature("athens", (error, data) => {
    console.log("Error: ", error);
    console.log("Data: ", data);
});

requestResponseData.getGeoLocationData("london", (error, data) => {
    console.log("Error: ", error);
    console.log("Data: ", data);
});