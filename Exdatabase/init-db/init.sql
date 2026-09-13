-- 1. Create Customers table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- 2. Create Products table
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    current_price DECIMAL(10, 2) NOT NULL,
    stock_qty INT NOT NULL
);

-- 3. Create Orders table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    order_date TIMESTAMP NOT NULL,
    customer_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- 4. Create Order_Items table
CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Import Data from CSVs (mapped to /data inside container)
COPY Customers(customer_id, name, email, password_hash)
FROM '/data/Customers.csv' DELIMITER ',' CSV HEADER;

COPY Products(product_id, sku, product_name, category, current_price, stock_qty)
FROM '/data/Products.csv' DELIMITER ',' CSV HEADER;

COPY Orders(order_id, order_date, customer_id, status)
FROM '/data/Orders.csv' DELIMITER ',' CSV HEADER;

COPY Order_Items(order_item_id, order_id, product_id, quantity, unit_price_at_purchase)
FROM '/data/Order_Items.csv' DELIMITER ',' CSV HEADER;
