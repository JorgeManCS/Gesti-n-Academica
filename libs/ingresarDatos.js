function insertarDatos(base_datos, coleccion, fichero){
            var json;
            var MongoClient = require('mongodb').MongoClient;
            var urlConnection = 'mongodb://localhost:27017/'+base_datos;
            var fs = require('fs');
            
            if (!fichero){
                console.log('El fichero no existe');
                process.exit(1);
            }
            fs.readFile(fichero,'UTF-8', function(err, data){
                if(err)
                    throw err;
                json = JSON.parse(data);
                
            })
            
            MongoClient.connect(urlConnection, function(err, db) {
            console.log("Conectando correctamente con el servidor");
            db.admin().authenticate('root','bitnami',function(){
                var mycollection = db.collection(coleccion);
                mycollection.insert(json,function(error,result){
                    if(!error) {
                        console.log("Éxito :"+result.ops.length+" datos insertados");
                    } else {
                        console.log("No puede insertar los datos");
                    }
                        db.close();
                    });
                });
            });
}
module.exports = insertarDatos;