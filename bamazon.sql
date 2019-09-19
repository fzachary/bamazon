CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Redragon K552 Mechanical Gaming Keyboard", "Electronics", 27.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tribit XSound Go Bluetooth Speaker", "Electronics", 23.09, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Etekcity Digital Multifunctional Kitchen Scale", "Kitchen & Dining", 13.59, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Starbucks Refreshers With Coconut Water, Strawberry Lemonade, 12 Pack", "Grocery", 20.39, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hemp Oil, 1000 mg, 2 Pack", "Health and Household", 14.40, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Degree Men's Antipersperant/Deoderant Stick, Sport, 6 Pack", "Beauty & Personal Care" 10.76, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Suave Essentials Body Wash, Creamy Tropical Coconut, 6 Pack", "Beauty & Personal Care", 10.47, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ECOWISH Womens V Neck Leopard Print Tunic Long Sleeve Button Down Shirt", "Clothing, Shoes & Jewelry", 16.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Janmid Mens Casual Linen Shorts", "Clothing, Shoes & Jewelry", 12.74, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MLVOC Memory Foam Neck Travel Pillow", "Home & Kitchen", 18.69, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MAGIFIRE Baby Inflatable Play Mat", "Toys & Games", 11.89, 76);