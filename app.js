const request = require("request");
const requestResponseData = require("./requests.js");

const getTemperature  = () => {
    // access_key=45ee8c7f72cb0559e8512198e9458efe
    // http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=London

    let parsedData;

    const temperatureURL = "http://api.weatherstack.com/current?access_key=45ee8c7f72cb0559e8512198e9458efe&query=London&unit=m";

    request({ url: URL, json: true }, (error, response, body) => {
        if (error) console.log(`Error message: ${error}`);

        // console.log(`Status: ${response && response.statusCode}`);
        // console.log(`Body: ${body}`);

        if (response.statusCode == 200) {
            parsedData = body;
            // console.log(parsedData);

            console.log(`The current temperature in ${body.location.name} is ${body.current.temperature} and it feels like it's ${body.current.feelslike}`);
        } 
    });
}
 
function init() {
    // getTemperature();
    requestResponseData.getGeoLocationData("london", (error, data) => {
        console.log("Error: ", error);
        console.log("Data: ", data);
    });
}

init();