-- Create database
CREATE DATABASE IF NOT EXISTS my_cash;
USE my_cash;

-- Users table
CREATE TABLE IF NOT EXISTS users (
                                     id INT PRIMARY KEY AUTO_INCREMENT,
                                     username VARCHAR(50) UNIQUE NOT NULL,
                                     email VARCHAR(100) UNIQUE NOT NULL,
                                     password VARCHAR(100) NOT NULL,
                                     first_name VARCHAR(50),
                                     last_name VARCHAR(50),
                                     currency_code VARCHAR(3) DEFAULT 'USD',
                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                     INDEX idx_users_email (email),
                                     INDEX idx_users_username (username)
);


-- Main transactions table (parent table for both incomes and outgoings)
CREATE TABLE IF NOT EXISTS transactions (
                                            id INT PRIMARY KEY AUTO_INCREMENT,
                                            user_id INT NOT NULL,
                                            amount DECIMAL(15, 2) NOT NULL,
                                            description VARCHAR(255) NOT NULL,
                                            transaction_date DATE NOT NULL,
                                            type ENUM('INCOMES', 'OUTGOING') NOT NULL,
--                               is_recurring BOOLEAN DEFAULT FALSE,
--                               recurrence_pattern ENUM('daily', 'weekly', 'monthly', 'yearly') NULL,
--                               next_recurrence_date DATE NULL,
                                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                            INDEX idx_transactions_user (user_id),
                                            INDEX idx_transactions_date (transaction_date),
                                            INDEX idx_transactions_type (type)
--                               INDEX idx_transactions_recurring (is_recurring)
);


-- Incomes table (specialization of transactions)
CREATE TABLE IF NOT EXISTS incomes (
                                       id INT PRIMARY KEY AUTO_INCREMENT,
                                       transaction_id INT NOT NULL,
                                       source VARCHAR(100) NOT NULL,
                                       is_taxable BOOLEAN DEFAULT TRUE,
                                       amount DECIMAL(15, 2) DEFAULT 0.00,
                                       income_type VARCHAR(50) DEFAULT 'regular', -- e.g., salary, bonus, investment, etc.
                                       FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
                                       INDEX idx_incomes_source (source),
                                       INDEX idx_incomes_type (income_type)
);

-- outgoings (transaction_id, is_essential, vendor, location, outgoing_type)
-- Outgoings table (specialization of transactions)
CREATE TABLE IF NOT EXISTS outgoings (
                                         id INT PRIMARY KEY AUTO_INCREMENT,
                                         transaction_id INT NOT NULL,
                                         is_essential BOOLEAN DEFAULT FALSE,
                                         outgoing_type VARCHAR(50) DEFAULT 'general', -- e.g., food, transport, entertainment, etc.
                                         FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
                                         INDEX idx_outgoings_essential (is_essential),
                                         INDEX idx_outgoings_type (outgoing_type)
);