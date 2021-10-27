const { Pool } = require("pg");
require('dotenv').config();

/* (1.) Utilizar el paquete pg para conectarse a PostgreSQL */
const config = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
    max: 20,
    min: 5,
    idleTimeoutMillis: 15000,
    connectionTimeoutMillis: 2000,
};

const Singleton = (function () {
    let instance;
    function createInstance() {
        var classObj = new Pool(config);
        return classObj;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                console.log("Crea Pool");
            }
            else {
                console.log("Ya existe Pool");
            }
            return instance;
        },
    };
})();

module.exports = Singleton;