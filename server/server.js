const express = require("express");
const bodyParser = require('body-parser');
const hbs = require("hbs");

const path = require("path");

const {mongoose} = require("./db/mongoose.js");
const {Url} = require("./models/urlShortener.js");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.redirect("/urls")
})

app.get("/urls", (req, res) => {
  Url.find()
     .then(doc => {
       res.render("url.hbs", {
         urls: doc
       })
     }, e => {
       res.status(404).send(e);
     })
})

app.get("/urls/new", (req, res) => {
  res.render("create.hbs")
})

app.post("/urls", (req, res) => {
  const url = new Url ({
    originalUrl: req.body.originalUrl,
    shortenedUrl: req.body.shortenedUrl
  })
  url.save()
    .then(doc => {
      res.redirect("/");
    }, e => {
      res.status(404).send(e);
    })
})

app.get("/:short", (req, res) => {
  const short = req.params.short;
  //could use findOne
  Url.find({shortenedUrl: short})
    .then(doc => {
      console.log(doc[0].originalUrl);
      res.redirect(doc[0].originalUrl);
    }, e => {
      res.status(404).send(e);
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
})
