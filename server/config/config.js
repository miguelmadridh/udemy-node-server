//=======================
//PORT
//=======================

process.env.PORT = process.env.PORT || 3001;

//=======================
//ENVIROMENT
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//=======================
//BASE DE DATOS
//=======================

let urlDB;
// if (process.env.NODE_ENV === "dev") {
//   urlDB = "mongodb://localhost:27017/cafe";
// } else {
//   urlDB =
//     "mongodb+srv://miguelmadridh:lBNSRZ2VQKHXoBR5@cluster0.qvkoh.mongodb.net/cafe";
// }

urlDB =
"mongodb+srv://miguelmadridh:lBNSRZ2VQKHXoBR5@cluster0.qvkoh.mongodb.net/cafe";
process.env.urlDB = urlDB;