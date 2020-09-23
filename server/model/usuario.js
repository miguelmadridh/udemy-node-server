const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


let Schema = mongoose.Schema;

let usuariosValidos ={
    values: ['ADMIN_ROLE','USER_ROLE'],
    messaage:'{value} no es un usuario valido'
}
let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre dde usuario es requerido"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El email es requerido"],
  },
  password: {
    type: String,
    required: [true, "El pass es requerido"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum:usuariosValidos
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
usuarioSchema.plugin(uniqueValidator, {
  message: '{PATH} el email debe de ser unico',
});


usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
module.exports = mongoose.model("Usuario", usuarioSchema);
