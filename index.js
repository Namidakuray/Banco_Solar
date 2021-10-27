const http = require('http');
const fs = require('fs').promises;
const {
	newAcc,
	getAccs,
	putAcc,
	delAcc,
    newTrans,
    getTrans,
	initAll,
	deleteAll,
} = require("./controllers/routesCtl");

port=3000;
http
    .createServer(async(req, res)=>{

        /* ● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba. */
        if(req.url=="/"){
            res.setHeader('Content-Type', 'text/html')
            let redPromiseFs=await fs.readFile('./web/index.html',{encoding: 'utf8'})
            res.end(redPromiseFs);
        }
        /* ● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL. */
        if(req.url=="/usuario" && req.method=="POST"){
            try {
                newAcc(req,res);
            } catch (error) {console.log("http error: ", error)}
        }
        /* ● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza. */
        if(req.url.startsWith("/usuario") && req.method=="PUT"){
            try {
                putAcc(req,res)
            } catch (error) {console.log("http error: ", error)}
        }
        /* ● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina . */
        if(req.url.startsWith("/usuario") && req.method=="DELETE"){
            try {
                delAcc(req,res)
            } catch (error) {console.log("http error: ", error)}
        }
        /* ● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos. */
        if(req.url=="/transferencia" && req.method=="POST"){
            try {
                newTrans(req,res)
            } catch (error) {console.log("http error: ", error)}
        }
        /* ● /usuarios GET: Devuelve todos los usuarios registrados con sus balances. */
        if(req.url=="/usuarios"){
            try {
                getAccs(res)
            } catch (error) {console.log("http error: ", error)}
        }
        /* ● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo. */
        if(req.url=="/transferencias"){
            try {
                getTrans(res)
            } catch (error) {console.log("http error: ", error)}
        }
        /* [Funcionalidad adicional] */
        if(req.url=="/api/initialization"){
            try {
                initAll(res)
            } catch (error) {console.log("http error: ", error)}
        }
        if(req.url=="/api/finalization"){
            try {
                deleteAll(res)
            } catch (error) {console.log("http error: ", error)}
        }
    }).listen(port,()=>{console.log('Server on port: ', port)})