const express = require("express");
const path = require("path");
const hbs = require("hbs");

const { getTemperature, getGeoLocationData } = require("../../requestData");

const app = express();
const port = 3000;

const publicDirPath = path.join(__dirname, "../public");
const viewDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Handlebars dynamic view engine setup
app.set("view engine", "hbs");

// Handlebars views dir setup
app.set("views", viewDirPath);

// Handlebars path setup
hbs.registerPartials(partialsDirPath);

// Sets static dir
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  const hbsViewData = {
    name: "Arntit",
    job: "Developer",
    title: "Weather",
  };

  res.render("index", hbsViewData);
});

app.get("/about", (req, res) => {
  const hbsViewData = {
    title: "About Section",
  };

  res.render("about", hbsViewData);
});

app.get("/help", (req, res) => {
  const hbsViewData = {
    title: "Help Section",
  };

  res.render("help", hbsViewData);
});

app.get("/weather", (req, res) => {
  const {
    query: { address },
  } = req;

  if (!isNaN(parseFloat(address))) {
    return res.send({error: "Enter a valid address"})
  }

  if (!address) {
    return res.send({ error: "You must provide an address" });
  }

  getTemperature(address, (error, temperatureData) => {
    getGeoLocationData(address, (error, geoLocationData) => {
        if (error) {
            return res.send({ error: "provide a valid location" });
        }
        
        res.send({
          forecast: temperatureData,
          location: geoLocationData,
          address,
        });
    });
  });

});

app.get("/help/*", (req, res) => {
  const errorData = {
    errorTitle: "Error 404: Couldn't find help Article!",
  };

  res.render("error", errorData);
});

app.get("*", (req, res) => {
  const errorData = {
    errorTitle: "Error 404: Couldn't find page!",
  };

  res.render("error", errorData);
});

app.listen(port, () => console.log(`Server ${port} is running!`));
