````
npm install
````

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
