var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alumno = mongoose.model("Alumno");
var alumno = new Alumno;

var Asignatura = mongoose.model("Asignatura");
var asignatura = new Asignatura;

var matriculaSchema = new mongoose.Schema({
    "id":Number,
    "alumno":{type: Schema.Types.Object, ref:"Alumno"},
    "asignatura":{type: Schema.Types.Object, ref:"Asignaura"},
    "fecha_inicio": Date,
    "fecha_fin": Date
});

mongoose.model('Matricula', matriculaSchema)