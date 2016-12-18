var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Matriculas............................................................................................................................................................
router.get('/MatriculaCreate', function(req,res,next){
    var Alumno = mongoose.model('Alumno');
    var Asignatura = mongoose.model('Asignatura');
    Alumno.find({}, function (error, datos){
        Asignatura.find({}, function(error, data){
            res.render('MatriculaCreate', {"alumnos":datos, "asignaturas":data});
        })
    })
})


router.post('/MatriculaCreate', function(req, res, next){
    var Matricula = mongoose.model('Matricula');
    var Alumno = mongoose.model('Alumno');
    var Asignatura = mongoose.model('Asignatura');
    
    Alumno.findOne({"_id":req.body.alumno}, function(error, datos){
        var alumno = datos;
        Asignatura.findOne({"_id":req.body.asignatura}, function(error, data){
            var asignatura = data;
            var matricula = new Matricula({
            "id": req.body.id,
            "alumno": alumno,
            "asignatura" : asignatura,
            "fecha_inicio": new Date(req.body.fecha_inicio),
            "fecha_fin" : new Date(req.body.fecha_fin)
            });

            matricula.save(matricula, function(error, datos){
                if(!error){
                     res.redirect('/MatriculaCreate');
                }
            });
        });
    });
});

router.get('/MatriculaRead', function(req, res, next){
    var Matricula = mongoose.model('Matricula');
     Matricula.find({}, function(error, datos){
        if(!error){
            res.render('MatriculaRead', {"matriculas":datos});
        }
    });
});

router.get('/MatriculaDelete', function(req,res, next){
     var Matricula = mongoose.model('Matricula');
     Matricula.find({}, function(error, datos){
         if(!error){
             res.render('MatriculaDelete', {"matriculas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
router.post('/MatriculaDelete', function(req,res, next){
     var id= req.body.id;
     var Matricula = mongoose.model('Matricula');

     Matricula.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/MatriculaDelete');
        }else{
            res.send("Error: Matricula no borrada");
        }
     });
});



router.get('/MatriculaUpdateList', function(req,res, next){
    var Matricula = mongoose.model('Matricula');
    Matricula.find({}, function(error, datos){
        if(!error){
            res.render('MatriculaUpdateList', {"matriculas":datos});
        }else{
            res.send('ERROR!');
        }
    })
})



router.post('/MatriculaUpdateList', function(req,res, nexy){
    if(req.body._id===undefined){
        res.redirect('/MatriculaUpdateList');
    }else{
        if(req.body.id && req.body.fecha_fin && req.body.fecha_inicio){
            var Alumno=mongoose.model('Alumno');
            var Asignatura = mongoose.model('Asignatura');
            
            Alumno.findOne({"_id":req.body.alumno},function(error, datos){
                var alumno = datos;
                Asignatura.findOne({"_id":req.body.asignatura},function(error,data){
                    var asignatura=data
                    var matricula = {
                        "id": req.body.id,
                        "alumno": alumno,
                        "asignatura":asignatura,
                        "fecha_inicio":new Date(req.body.fecha_inicio),
                        "fecha_fin":new Date(req.body.fecha_fin)
                    };
                var Matricula = mongoose.model('Matricula');
                Matricula.update({"_id":req.body._id},matricula, function(error, datos){
                    if(!error){
                        res.redirect('/MatriculaUpdateList');
                    }else{
                        res.render('Error');
                    }
                })
            })
        })
        }else{
            var Matricula = mongoose.model('Matricula');
            var Alumno = mongoose.model('Alumno');
            var Asignatura = mongoose.model('Asignatura');
            Matricula.findOne({"_id":req.body._id},{},function(error,datos){
                Alumno.find({}, function(error,data){
                    Asignatura.find({}, function(error, dt){
                        if(!error){
                    res.render('MatriculaUpdateForm',{"matricula":datos, "alumnos":data, "asignaturas": dt});
                            }else{
                    //Nunca llegamos aquí salvo con peticiones con CURL
                    res.redirect('/MatriculaUpdateList');
                        }
                    })
                })               
            });
        }
    }
});
module.exports = router;