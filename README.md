````
npm install
````

## Loggers, gzip y análisis de performance
<ul>
    <li>Incorporar al proyecto de servidor de trabajo la compresión gzip.</li>
    <li>Luego implementar loggueo (con alguna librería vista en clase <b>Winston</b>) que registre lo siguiente:
        <ul>
         <li>Loggear todos los niveles a consola (info, warning y error)</li>
         <li>Registrar sólo los logs de warning a un archivo llamada warn.log</li>
         <li>Enviar sólo los logs de error a un archivo llamada error.log</li>
        </ul>
    </li>
    <li> node --prof index.js -p 5000  </li>
    <li> node --prof-process isolate-0x1046a5000-45282-v8.log > result_prof.txt </li>
    <li> artillery quick --count 20 -n 50 "http://localhost:5000/info" > result_artillery.txt </li>
    <li> 0x index.js -p 5000 </li>
    <li> curl -X GET "http://localhost:5000/info" </li>
    <li> Informe pdf ./Practica Logger.pdf</li>


</ul>

## Update Servidor con balance de carga
<ul>
    <li>Se agregan los script dev-fork y dev-cluster según lo solicitado en la consigna.</li>
    <li>Agregar en la vista info el número de cpu's.</li>
    <li>Ejecutar en modo fork y cluster, se ejecuta correctamente y se generan 4 workers ya que mi portatil tiene 4 cpu's.</li>
    <li>Ejecutar el servidor utilizando forever, se crean los scripts dev-forever1/dev-forever2/dev-forever3 obtiendo los resultados esperados.</li>    
    <li>Ejecutar el servidor utilizando PM2, se crean los scripts dev-pm2-f/dev-pm2-c</li>
    <li>La ruta es /api/randoms?cant=5</li>
    <li>Nginx: <b>npm run dev-pm2-c</b> para la redirección de la API modo cluster. </li>
    <li>Como es Linux, se sube en la carpeta ngnix el archivo nginx.conf y default.</li>
    <li>Se crean lso scripts 
        <ul>
            <li>npm run dev-pm2-c2: Inicia cluster de servidores escuchando en el puerto 8082</li>
            <li>npm run dev-pm2-c3: Inicia cluster de servidores escuchando en el puerto 8083</li>
            <li>npm run dev-pm2-c4: Inicia cluster de servidores escuchando en el puerto 8084</li>
            <li>npm run dev-pm2-c5: Inicia cluster de servidores escuchando en el puerto 8085</li>
        </ul>
    </li>
</ul>



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
