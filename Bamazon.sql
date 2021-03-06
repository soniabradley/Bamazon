DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE Products (
    ItemID INTEGER AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(50) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL (10,2) NOT NULL,
    StockQuantity INTEGER(10) NOT NULL,
    PRIMARY KEY (ItemID)
);

-- SELECT * bamazon_db.Products ?
SELECT * FROM Products;

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES ('Lavender Cloud', 'Paint', 49.99, 50),
        ('Sweet Violet', 'Paint', 39.99, 12),
        ('Siberian Iris', 'Paint', 59.99, 48),
        ('Petasites Japonicus', 'Plants', 9.99, 215),
        ('Astilboides Tabularis', 'Plants', 12.49, 116),
        ('Rheum Palmatum', 'Plants', 8.99, 10),
        ('Fruit-and-Nut Cookies', 'Food', 3.49, 73),
        ('Chocolate Monkey Bars', 'Food', 4.99, 112),
        ('Orange-Almond Bars', 'Food', 2.99, 60),
        ('Diamond Ring', 'Jewelry', 300.00, 1);



UPDATE 
INSERT