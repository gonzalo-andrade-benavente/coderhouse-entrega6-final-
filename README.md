````
npm install
````

## Update
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
