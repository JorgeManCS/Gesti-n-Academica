var mongoose = require('mongoose');
var profesorSchema = new mongoose.Schema({
    "nombre" : String,
    "apellido": String,
    "email": String,
    "id": Number
});

mongoose.model('Profesor',profesorSchema);