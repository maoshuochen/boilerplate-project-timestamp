// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// empty date params
app.get("/api", function (req, res) {
    date = new Date();
    utc = date.toUTCString();
    unix = date.getTime();
    console.log({ date, utc, unix });
    res.json({ unix, utc });
});

// timestape convert
app.get("/api/:date", function (req, res) {
    console.log(req.params.date);
    let date = req.params.date;
    let unix, utc;

    if (date instanceof Date) {
        //valid date
        utc = date.toUTCString();
        unix = date.getTime();
    } else if (!isNaN(date)) {
        //unix to date
        unix = parseInt(date);
        date = new Date(unix);
        utc = date.toUTCString();
    } else {
        //try to convert
        date = new Date(date);
        utc = date.toUTCString();
        unix = date.getTime();
    }

    console.log({ date, utc, unix });
    if (utc == "Invalid Date") {
        console.log("Error");
        res.json({
            error: "Invalid Date",
        });
    } else {
        res.json({ unix, utc });
    }
});

// listen for requests :)
var listener = app.listen(3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
