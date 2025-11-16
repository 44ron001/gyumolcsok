CREATE DATABASE IF NOT EXISTS fruits
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE fruits;

CREATE TABLE IF NOT EXISTS fruits (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, color VARCHAR(50) NOT NULL, price DECIMAL(5,2) NOT NULL);

INSERT INTO fruits (name, color, price) VALUES
('Alma', 'Piros', 250.00),
('Banán', 'Sárga', 320.00),
('Körte', 'Zöld', 280.50),
('Narancs', 'Narancssárga', 399.99),
('Szőlő', 'Lila', 520.00);