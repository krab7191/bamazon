/* log in via root mysql user to set up server environment safely */
create DATABASE bamazon;
GRANT ALL PRIVILEGES ON bamazon.* TO 'karsten'@'localhost';
FLUSH PRIVILEGES;
/* \q */
/* ----------------- READY ----------------*/


/* Delete the DB if it exists */
drop database if exists bamazon;

/* Re-create it */
create DATABASE bamazon;

/* use the newly created DB for future queries */
use bamazon;

/* Create the products table */
create TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL(10, 2) default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

/* -- Populate with some items -- */
insert into products (product_name, department_name, price, stock_quantity)
values ("Router", "networking", 34.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Bluetooth Adaptor", "entertainment", 12.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Smart Network Switch", "networking", 3.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("NAS Hard Drive", "PPE", 109.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Raspberry Pi", "DIY", 39.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Wifi Range Extender", "networking", 12.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("UPS", "electrical", 69.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Drone", "PPE", 128.56, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Cryptocurrency GPU rig", "PPE", 8000.00, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Spam", "food", 3.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Eggs", "food", 1.29, 100);