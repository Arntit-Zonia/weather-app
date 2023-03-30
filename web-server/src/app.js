const express = require("express");
const path = require("path");
const hbs = require("hbs");

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
        title: "Weather"
    }

    res.render("index", hbsViewData);
});

app.get("/about", (req, res) => {
    const hbsViewData = {
        title: "About Section"
    }

    res.render("about", hbsViewData);
});

app.get("/help", (req, res) => {
    const hbsViewData = {
        title: "Help Section"
    }

    res.render("help", hbsViewData);
});

app.get("/weather", (req, res) => {
    res.send(weatherData);
});

app.get("/help/*", (req, res) => {
    const errorData = {
        errorTitle: "Error 404: Couldn't find help Article!"
    }

    res.render("error", errorData);
});

app.get("*", (req, res) => {
    const errorData = {
        errorTitle: "Error 404: Couldn't find page!"
    }

    res.render("error", errorData);
});

app.listen(port, () => console.log(`Server ${port} is running!`));