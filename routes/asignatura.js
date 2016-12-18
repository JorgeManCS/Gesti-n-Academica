var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Asignaturas............................................................................................................................................................

router.get('/AsignaturaCreate', function(req,res,next){
    res.render('AsignaturaCreate');
})


router.post('/AsignaturaCreate', function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');
    
    var nombre = req.body.nombre;
    var curso = req.body.curso;
    var id= req.body.id;

    var asignatura = new Asignatura({
        "nombre": nombre,
        "curso" : curso,
        "id": id
    });
    asignatura.save(asignatura, function(error, datos){
        if(!error){
             res.redirect('/AsignaturaCreate')
         }else{
             res.send('ERROR!');
         }
    });
});

router.get('/AsignaturaRead', function(req, res, next){
    var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
        if(!error){
            res.render('AsignaturaRead', {"asignaturas":datos});
        }
    });
});
router.get('/AsignaturaDelete', function(req,res, next){
     var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
         if(!error){
             res.render('AsignaturaDelete', {"asignaturas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/AsignaturaDelete', function(req,res, next){
     var id= req.body.id;
     var Asignatura = mongoose.model('Asignatura');

     Asignatura.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/AsignaturaDelete');
        }else{
            res.send("Error: Asignatura no borrada");
        }
     });
 });

router.get('/AsignaturaUpdate', function(req,res, next){
     var Asignatura = mongoose.model('Asignatura');
     Asignatura.find({}, function(error, datos){
         if(!error){
             res.render('AsignaturaUpdateList', {"asignaturas":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 
router.post('/AsignaturaUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/AsignaturaUpdateList');
    }else{
        if(req.body.nombre && req.body.curso && req.body.id){
         var asignatura = {
                "id" : req.body.id ,
                "nombre": req.body.nombre,
                "curso": req.body.curso
            };
            var Asignatura = mongoose.model('Asignatura');
            Asignatura.update({"_id":req.body._id}, asignatura, function(error, datos){
                if(!error){
                    res.redirect('/AsignaturaUpdateList')
                }else{
                    res.render('Error');
                }
            })
        }else{
        var Asignatura = mongoose.model('Asignatura');
            Asignatura.findOne({"_id": req.body._id},{},function(error, datos){
                if(!error){
                    res.render('AsignaturaUpdateForm',{asignatura:datos});
                }else{
                    res.redirect('/AsignaturaUpdateList');
                }   
            });
        }
    }
});
module.exports = router;