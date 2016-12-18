var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Impartir................................................................................................................
router.get('/ImpartirCreate', function(req,res,next){
    var Profesor = mongoose.model('Profesor');
    var Asignatura = mongoose.model('Asignatura');
    Profesor.find({}, function (error, datos){
        Asignatura.find({}, function(error, data){
            res.render('ImpartirCreate', {"profesores":datos, "asignaturas":data});
        })
    })
})
router.post('/ImpartirCreate', function(req, res, next){
    var Impartir = mongoose.model('Impartir');
    var Profesor = mongoose.model('Profesor');
    var Asignatura = mongoose.model('Asignatura');
    Profesor.findOne({"_id": req.body.profesor},function(error, datos){
        var profesor = datos;
        Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
            var asignatura = data;           
             var impartir= new Impartir({
                "id": req.body.id,
                "profesor": profesor,
                "horas": req.body.horas,
                "fecha_inicio": new Date(req.body.fecha_inicio),
                "fecha_fin": new Date(req.body.fecha_fin),
                "asignatura": asignatura
            });
        impartir.save(impartir, function(error, datos){
            if(!error){
                res.redirect('/ImpartirCreate');
            }
        });      
      }); 
   });
});
router.get('/ImpartirRead', function(req, res, next){
   var Impartir = mongoose.model('Impartir');
     Impartir.find({}, function(error, datos){
         if(!error){
             res.render('ImpartirRead', {"imparticiones":datos});
        }
    });
});
router.get('/ImpartirDelete', function(req,res, next){
     var Impartir = mongoose.model('Impartir');
     Impartir.find({}, function(error, datos){
         if(!error){
             res.render('ImpartirDelete', {"imparticiones":datos});
         }else{
             res.send('ERROR!');
         }
     })
});

router.post('/ImpartirDelete', function(req,res, next){
     var id= req.body.id;
     var Impartir = mongoose.model('Impartir');

     Impartir.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/ImpartirDelete');
        }else{
            res.send("Error: Imparticion no borrada");
        }
     });
 });
  router.get('/ImpartirUpdateList', function(req,res, next){
     var Impartir = mongoose.model('Impartir');
     Impartir.find({}, function(error, datos){
         if(!error){
             res.render('ImpartirUpdateList', {"imparticiones":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/ImpartirUpdateList', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/ImpartirUpdateList');
    }else{
        if( req.body.id && req.body.fecha_fin && req.body.fecha_inicio && req.body.horas){ 
            var Profesor = mongoose.model('Profesor');
            var Asignatura = mongoose.model('Asignatura');
            
            Profesor.findOne({"_id": req.body.profesor},function(error, datos){
                var profesor = datos;
                Asignatura.findOne({"_id": req.body.asignatura},function(error, data){
                    var asignatura = data; 
                    var impartir= {
                        "id": req.body.id,
                        "profesor": profesor,
                        "horas": req.body.horas,
                        "fecha_inicio": new Date(req.body.fecha_inicio),
                        "fecha_fin": new Date(req.body.fecha_fin),
                        "asignatura": asignatura
                };
                var Impartir = mongoose.model('Impartir');
                Impartir.update({"_id":req.body._id}, impartir, function(error, datos){
                    if(!error){
                        res.redirect('/ImpartirUpdateList');
                    }else{
                        res.render('Error');
                    }
                })
            });
         });           
        }else{
        var Impartir = mongoose.model('Impartir');
        var Profesor = mongoose.model('Profesor');
        var Asignatura = mongoose.model('Asignatura');    
        Impartir.findOne({"_id": req.body._id},{},function(error, datos){
                Profesor.find({},function(error, data){
                    Asignatura.find({}, function(error, dt){
                    if(!error){
                    res.render('ImpartirUpdateForm',{"impartir":datos, "profesores":data, "asignaturas": dt});
                }else{
                    //Nunca llegamos aquí salvo con peticiones con CURL
                    res.redirect('/ImpartirUpdateList');
                }
                })   
                })       
            });
        }
    }
 });
module.exports = router;
