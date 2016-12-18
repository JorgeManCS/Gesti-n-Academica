var mongoose = require('mongoose');
var asignaturaSchema = new mongoose.Schema({
    "nombre" : String,
    "curso": String,
    "id": Number
});

mongoose.model('Asignatura',asignaturaSchema);