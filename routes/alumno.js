var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//Alumnos............................................................................................................................................................

router.get('/AlumnoCreate', function(req,res,next){
    res.render('AlumnoCreate');
})


router.post('/AlumnoCreate', function(req, res, next){
    var Alumno = mongoose.model('Alumno');
    
    var nombre = req.body.nombre;
    var apellido = req.body.apellidos;
    var email = req.body.email;
    var id= req.body.id;

    var alumno = new Alumno ({
        "nombre": nombre,
        "apellido": apellido,
        "email": email,
        "id": id
    });
    alumno.save(alumno, function(error, datos){
        if(!error){
             res.render('AlumnoCreate', {"alumnos":datos});
         }else{
             res.send('ERROR!');
         }
    });
});

router.get('/AlumnoRead', function(req, res, next){
    var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
        if(!error){
            res.render('AlumnoRead', {"alumnos":datos});
        }
    });
});
router.get('/AlumnoDelete', function(req,res, next){
     var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
         if(!error){
             res.render('AlumnoDelete', {"alumnos":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/AlumnoDelete', function(req,res, next){
     var id= req.body.id;
     var Alumno = mongoose.model('Alumno');

     Alumno.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/AlumnoDelete');
        }else{
            res.send("Error: Alumno no borrado");
        }
     });
 });

router.get('/AlumnoUpdate', function(req,res, next){
     var Alumno = mongoose.model('Alumno');
     Alumno.find({}, function(error, datos){
         if(!error){
             res.render('AlumnoUpdateList', {"alumnos":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 
router.post('/AlumnoUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/AlumnoUpdateList');
    }else{
        if(req.body.nombre && req.body.apellidos && req.body.email && req.body.id){
         var alumno = {
                "id" : req.body.id ,
                "nombre": req.body.nombre,
                "apellido": req.body.apellidos,
                "email":req.body.email
            };
            var Alumno = mongoose.model('Alumno');
            Alumno.update({"_id":req.body._id}, alumno, function(error, datos){
                if(!error){
                    res.redirect('/AlumnoUpdateList')
                }else{
                    res.render('Error');
                }
            })
        }else{
        var Alumno = mongoose.model('Alumno');
            Alumno.findOne({"_id": req.body._id},{},function(error, datos){
                if(!error){
                    res.render('AlumnoUpdateForm',{alumno:datos});
                }else{
                    //Nunca llegamos aquí salvo con peticiones con CURL
                    res.redirect('/AlumnoUpdateList');
                }   
            });
        }
    }
});
module.exports = router;