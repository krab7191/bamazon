drop database if exists bamazon;

create DATABASE bamazon;

use bamazon;

create TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (60) NOT NULL,
    department_name VARCHAR(60) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);