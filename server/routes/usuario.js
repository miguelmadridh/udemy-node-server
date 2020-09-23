const express = require("express");
const app = express();
const _ = require("underscore");
const Usuario = require("../model/usuario");
const bcrypt = require("bcrypt");

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.get("/usuario", (req, res) => {
  let desde = Number(req.query.desde || 0);
  let limite = Number(req.query.limite || 0);

  Usuario.find({estado:true}, "nombre email estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuario) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.count({estado:true}).exec((err, conteo) => {
        res.status(200).json({
          ok: true,
          usuario,
          conteo,
        });
      });
    });
});

app.post("/usuario", (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    id: body.id,
    nombre: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDb) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.status(200).json({
      ok: true,
      usuario: usuarioDb,
    });
  });
});

app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    {
      new: true, //devuelve el objeto actualizado
      runValidators: true, //aplica las validaciones del esquema del modelo
      context: "query", //necesario para las disparar las validaciones de mongoose-unique-validator
    },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/bL/:id", (req, res) => {
  let id = req.params.id;

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true, runValidators: true, context: "query" },
    (err, usuarioDelete) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuarioDelete,
      });
    }
  );
});

app.delete("/usuario/:id", (req, res) => {
  let id = req.params.id;

  Usuario.findByIdAndDelete(id, (err, usuarioDelete) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    if (usuarioDelete === null) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Usuario no encontrado",
        },
      });
    }

    res.json({
      ok: true,
      usuarioDelete,
    });
  });
});

module.exports = app;
