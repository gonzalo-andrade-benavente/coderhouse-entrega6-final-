````
npm install
````
## Update Usando el objeto process

<ul>
    <li> Se utiliza el archivo .env (ya utilizado desde el inicio).</li>
    <li> Se instala yargs y se modifica el ficher config/index para que utilice args con el puerto. </li>
    <li> Se añade la rut /info con la informaciaón de la consigna.</li>
    <li> Se genera la ruta /api/randoms con fork no bloqueante, el único problema es que no se pueden hacer dos peticiones (igual al ejemplo visto en clase)</li>

</ul>

## Update Inicio de sesión
<ul>
    <li>Registros usuario y contraseña en MongoDb colección usuarios, se utiliza la librería bcryptjs.</li>
    <li>Login donde pide usuario y contraseña y realiza autenticación a través de passport local.</li>
    <li>Cada una de las vistas (logueo-registro) deberá tener un botón para ser redirigido a la otra.</li>
    <li>Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email y un botón para desloguearse.</li>
    <li>Se recargará cada 10 minutos y tras cada acceso se recargará ese tiempo.</li>
    <li>Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).</li>
</ul>


## Update Log-In por Formulario
<ul>
    <li> Se modifica la persistencia de datos y todo es en mongo, fijarse en el archivo .env</li>
    <li> Se crea el endpoint para faker </li>
    <li> Se normaliza la data según la consigna y se envía al front, es utiliza el CDN indicado para desnormalizar.</li>
    <li> Se agrega el manejo de session mediante MongoDB mediante llamadas asíncronas desde el Front al Backend.</li>
</ul>

## sqlite3 and mysql (docker)
Tuve que usar mysql2 con knex

## mysql
````
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=coderhouse -e MYSQL_DATABASE=coderhouse -p 3306:3306 -d mysql
docker exec -it some-mysql /bin/bash
mysql -u root -p 
````

## mongo
````
docker run --name some-mongo -p 27017:27017 -e MONGO_INITDB_DATABASE=coderhouse -e MONGO_INITDB_ROOT_USERNAME=coderhouse -e MONGO_INITDB_ROOT_PASSWORD=coderhouse -d mongo
````
