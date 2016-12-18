var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//profesores............................................................................................................................................................

router.get('/ProfesorRead', function(req, res, next){
    var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
        if(!error){
            res.render('ProfesorRead', {"profesores":datos});
        }
    });
});
router.get('/ProfesorCreate', function(req,res,next){
    res.render('ProfesorCreate');
})


router.post('/ProfesorCreate', function(req, res, next){
    var Profesor = mongoose.model('Profesor');
    
    var nombre = req.body.nombre;
    var apellido = req.body.apellidos;
    var email = req.body.email;
    var id= req.body.id;

    var profesor = new Profesor ({
        "nombre": nombre,
        "apellido": apellido,
        "email": email,
        "id": id
    });
    profesor.save(profesor, function(error, datos){
        if(!error){
             res.render('ProfesorCreate', {"profesores":datos});
         }else{
             res.send('ERROR!');
         }
    });
});
router.get('/ProfesorDelete', function(req,res, next){
     var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
         if(!error){
             res.render('ProfesorDelete', {"profesores":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 router.post('/ProfesorDelete', function(req,res, next){
     var id= req.body.id;
     var Profesor = mongoose.model('Profesor');

     Profesor.remove({"_id": id}, function (error, datos){
        if(!error){
            res.redirect('/ProfesorDelete');
        }else{
            res.send("Error: Profesor no borrado");
        }
     });
 });

 router.get('/ProfesorUpdate', function(req,res, next){
     var Profesor = mongoose.model('Profesor');
     Profesor.find({}, function(error, datos){
         if(!error){
             res.render('ProfesorUpdateList', {"profesores":datos});
         }else{
             res.send('ERROR!');
         }
     })
});
 
router.post('/ProfesorUpdate', function(req, res, nexy){
    if(req.body._id===undefined){
        res.redirect('/ProfesorUpdateList');
    }else{
        if(req.body.nombre && req.body.apellidos && req.body.email && req.body.id){
         var profesor = {
                "id" : req.body.id ,
                "nombre": req.body.nombre,
                "apellido": req.body.apellidos,
                "email":req.body.email
            };
            var Profesor = mongoose.model('Profesor');
            Profesor.update({"_id":req.body._id}, profesor, function(error, datos){
                if(!error){
                    res.redirect('/ProfesorUpdateList')
                }else{
                    res.render('Error');
                }
            })
        }else{
        var Profesor = mongoose.model('Profesor');
            Profesor.findOne({"_id": req.body._id},{},function(error, datos){
                if(!error){
                    res.render('ProfesorUpdateForm',{profesor:datos});
                }else{
                    //Nunca llegamos aquí salvo con peticiones con CURL
                    res.redirect('/ProfesorUpdateList');
                }   
            });
        }
    }
});
module.exports = router;