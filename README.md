````
npm install
````

## sqlite3 and mysql (docker)
Tuve que usar mysql2 con knex

````
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=coderhouse -e MYSQL_DATABASE=coderhouse -p 3306:3306 -d mysql
````