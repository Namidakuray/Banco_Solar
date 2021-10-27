
# Información general:
- Curso: DESARROLLO DE APLICACIONES FULL STACK JAVASCRIPT TRAINEE
- Autor: Mario Flores Cruz
- Módulo: 07 - Acceso a base de datos con NodeJS
- Evaluación: Prueba final de módulo - Banco solar
- Lenguajes: [JavaScript,SQL]
- Tecnologías: [NodeJs,Pg,dotenv]

## Descripción:
El Banco Solar acaba de decidir invertir una importante suma de dinero para contratar un equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de transferencias.

El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en éstos, realizar transferencias de saldos entre ellos.

>Las rutas que deberás crear son las siguientes:
>- / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
>- /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
>- /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
>- /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
>- /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
>- /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe
ocupar una transacción SQL en la consulta a la base de datos.
>- /transferencias GET: Devuelve todas las transferencias almacenadas en la base de
datos en formato de arreglo.

## Requerimientos:
1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos.
2. Usar transacciones SQL para realizar el registro de las transferencias.
3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL.
4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones callbacks para condicionar las funciones del servidor.
5. Devolver correctamente los códigos de estado según las diferentes situaciones.


## Instrucciones:
- Primero, se debe de habilitar un archivo en la raiz de nombre ".env", dentro se debe ingresar la siguiente información:
---
DB_HOST={host de la DDBB (en nuestro caso sería: localhost)}

DB_PORT={puerto de la DDBB (en nuestro caso sería: 5432)}

DB_USER={usuario con el cual se conectará a la DDBB}

DB_PASS={contraseña del usuario registrado anteriormente}

DB_NAME={Nombre de la DDBB}

---
>Nota: la información se registra de forma literal a continuación del signo "=", es decir, no se debe declarar el "tipo" de dato, utilizar el archivo adjunto a modo de ejemplo.

- Segundo, iniciar el paquete de modulos de node, a modo de descargar las dependencias.
- Tercero, iniciar el servidor con el comando personalizado "npm run dev".
- Una vez creada la ddbb y configurado el archivo ".env", las tablas se generan de forma automática con el btn "Iniciar test".
- Ya terminadas las pruebas, se puede limpiar la ddbb por medio del btn "Eliminar tablas".
