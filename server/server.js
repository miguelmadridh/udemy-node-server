require('./config/config')

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/usuario", (req, res) => {
  res.json("Get usuario");
});

app.post("/usuario", (req, res) => {
  let body = req.body;
  if (body.name === undefined) {
    res.status(400).json({
      ok: false,
      message: "el nombre es necsario",
    });
  } else {
    res.json({ persona: body });
  }
});

app.put("/usuario", (req, res) => {
  let id = req.params.id;
  res.json({ id });
});

app.delete("/usuario", (req, res) => {
  res.json("delete world");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto", process.env.PORT);
});
