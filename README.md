# bamazon
An application which implements a set of command line tools for digital storefront management.

`node bamazonCustomer.js` allows a user to view and 'purchase' items.

`bamazonManager.js` allow a 'manager' to  view and update inventory.

`bamazonSupervisor.js` allows a 'supervisor' to view net department revenue and create new departments.


## Technologies used
* Javascript (of course :D)

* mysql

* NodeJS & NPM (Modules: inquirer, mysql, cli-table)

## Testing

You need mysql and node installed to make this work. There is some additional database setup required.

* Unless you want to set up your own server environment and change all of the .js files, you need to make a user named karsten with password 'cheese'. But first login as root.

`mysql -u root -p` --> Enter your password

`CREATE USER 'karsten'@'localhost' IDENTIFIED BY 'cheese';`

* Then copy/paste the schema.sql and departments_schema.sql files.

* To verify you can run the following:

`use bamazon;`
`show tables;`

![alt text](https://github.com/krab7191/bamazon/blob/master/screenshots/mysql-verify.png "Tables created")

* When your database is ready, just run one the files with node:

`node bamazonCustomer.js`
`node bamazonManager.js`
`node bamazonSupervisor.js`

