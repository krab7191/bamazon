/* Challenge 3 - - need to use alias, join and group by */

/* GETS EVERYTHING!! darn */

SELECT departments.department_id, products.department_name, departments.over_head_costs, products.product_sales  FROM products INNER JOIN departments ON (products.department_name = departments.department_name) ORDER BY departments.department_id;

/* GET TOTAL PRODUCT SALES FROM PRODUCTS TABLE - OK good */
SELECT department_name, SUM(price) AS total FROM products GROUP BY department_name;
___
 |
 ^

/* this gets all but total profit column -- getting somewhere */
select departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_sales FROM departments INNER JOIN products ON (departments.department_name = products.department_name) ORDER BY departments.department_id;

/* NEED TO subtract the sum of sales from overheads for last column */
/* Got it */
SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_id;