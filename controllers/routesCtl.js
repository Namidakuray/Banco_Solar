
const PoolSingleton = require("../database/poolDB");
let pool = PoolSingleton.getInstance();

const url = require("url");
const {
	initBank,
	deleteTables,

	newTransaction,
    getTransaction,
	insertAcc,
	editAcc,
	getAcc,
	deleteAcc,
} = require("../database/dbCtl");

const newAcc = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", async () => {
		let response = Object.values(JSON.parse(body));
        let nombre = response[0];
        let balance = response[1];
		try {
			await insertAcc(pool, nombre, balance);
			res.statusCode = 201;
			res.end();
		} catch (error) {
			res.statusCode = 500;
			console.log(error);
			res.end();
		}
	});
};

const getAccs = async (res) => {
	try {
		const consSql = await getAcc(pool);
		res.statusCode = 200;
		res.end(JSON.stringify(consSql));
	} catch (error) {
		res.statusCode = 500;
		console.log(error);
		res.end();
	}
};

const putAcc = (req, res) => {
	const parametros = url.parse(req.url, true).query;
	const id = parametros.id;
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", async () => {
		try {
			let response = Object.values(JSON.parse(body));
            let name = response[0];
            let balance = response[1];
			await editAcc(pool, name, balance, id);
			res.statusCode = 203;
			res.end(console.log("Información actualizada con éxito"));
		} catch (error) {
			res.statusCode = 500;
			res.end(console.log("Error al actualizar: ", error));
		}
	});
};

const delAcc = async (req, res) => {
	const parametros = url.parse(req.url, true).query;
	const id = parametros.id;
    console.log(parametros);
	try {
		await deleteAcc(pool, id);
		res.statusCode = 200;
		res.end(console.log("Registro eliminado con éxito"));
	} catch (error) {
		res.statusCode = 500;
		res.end(console.log("Error al procesar la petición: ", error));
	}
};

const newTrans = async (req, res) => {
    let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", async () => {
		let response = Object.values(JSON.parse(body));
        let receptor=response[1];
        let emisor=response[0];
        let monto=response[2];
		try {
			let jsonRes = await newTransaction(pool, receptor, emisor, monto);
			res.statusCode = 201;
            //console.log("NEWTRANS routesCtl: ", jsonRes);
            res.end(JSON.stringify(jsonRes));
		} catch (error) {
			res.statusCode = 500;
			console.log("Error al procesar la transacción: ",error);
			res.end();
		}
	});
}
const getTrans = async (res) => {
	try {
		const consSql = await getTransaction(pool);
		res.statusCode = 200;
        //console.log("GET TRANS routesCtl: ",consSql);
		res.end(JSON.stringify(consSql));
	} catch (error) {
		res.statusCode = 500;
		console.log("GetTRANS ERROR: ",error);
		res.end();
	}
};

const initAll = async (res) => {
	try {
		await initBank(pool);
		res.statusCode = 201;
		res.end();
	} catch (error) {
		res.statusCode = 500;
		console.log("routesCtl.initAll ERROR: ",error);
		res.end();
	}
}
const deleteAll = async (res) => {
	try {
		await deleteTables(pool);
		res.statusCode = 200;
		res.end();
	} catch (error) {
		res.statusCode = 500;
		console.log("routesCtl.initAll ERROR: ",error);
		res.end();
	}
}

module.exports = {
	newAcc,
	getAccs,
	putAcc,
	delAcc,
    newTrans,
    getTrans,
	initAll,
	deleteAll,
};
