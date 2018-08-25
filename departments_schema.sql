
/* Create the departments table */
create TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name varchar (100) NOT NULL UNIQUE, /* only need one line per dept, thus unique */
    over_head_costs DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (department_id)
);

/* populate the table with the departments created in the products table */
insert into departments (department_name, over_head_costs)
values ('networking', 10000);

insert into departments (department_name, over_head_costs)
values ('entertainment', 4600);

insert into departments (department_name, over_head_costs)
values ('PPE', 14900);

insert into departments (department_name, over_head_costs)
values ('DIY', 480);

insert into departments (department_name, over_head_costs)
values ('electrical', 5500);

insert into departments (department_name, over_head_costs)
values ('networking', 2700);