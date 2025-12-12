USE my_cash;


-- The hashed password is: 12345
INSERT INTO users (username, email, password, first_name, last_name,
                   currency_code)
VALUES ('john_doe', 'user1@example.com',
        '$2b$10$zqLO0i3EQRoj5FEn20RwDeiEkDNY016NsCwhwMT.yb3xSc6rnjgZy', 'John',
        'Doe', 'USD'),
       ('sarah_smith', 'user2@example.com',
        '$2b$10$zqLO0i3EQRoj5FEn20RwDeiEkDNY016NsCwhwMT.yb3xSc6rnjgZy', 'Sarah',
        'Smith', 'USD'),
       ('mike_johnson', 'user3@example.com',
        '$2b$10$zqLO0i3EQRoj5FEn20RwDeiEkDNY016NsCwhwMT.yb3xSc6rnjgZy', 'Mike',
        'Johnson', 'USD');

-- Insert 100 transactions for the 3 users (mixed incomes and outgoings)
INSERT INTO transactions (user_id, amount, description, type,
                          status)
VALUES

-- User 1 (john_doe) - Incomes
(1, 2500.00, 'Monthly Salary', 'INCOMES', 'PENDING'),
(1, 300.00, 'Freelance Project', 'INCOMES', 'COMPLETED'),
(1, 150.00, 'Investment Dividends', 'INCOMES', 'FAILED'),
(1, 2500.00, 'Monthly Salary', 'INCOMES', 'COMPLETED'),
(1, 200.00, 'Bonus Payment', 'INCOMES', 'COMPLETED'),

-- User 1 (john_doe) - Outgoings
(1, 1200.00, 'Rent Payment', 'OUTGOING', 'COMPLETED'),
(1, 85.50, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(1, 45.00, 'Electricity Bill', 'OUTGOING', 'COMPLETED'),
(1, 60.00, 'Internet Bill', 'OUTGOING', 'FAILED'),
(1, 35.75, 'Gas Station', 'OUTGOING', 'COMPLETED'),
(1, 120.00, 'Restaurant Dinner', 'OUTGOING', 'COMPLETED'),
(1, 89.99, 'Netflix Subscription', 'OUTGOING', 'COMPLETED'),
(1, 75.30, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(1, 45.00, 'Mobile Phone Bill', 'OUTGOING', 'PENDING'),
(1, 150.00, 'Shopping Mall', 'OUTGOING', 'FAILED'),
(1, 1200.00, 'Rent Payment', 'OUTGOING', 'PENDING'),
(1, 92.40, 'Grocery Shopping', 'OUTGOING', 'PENDING'),
(1, 45.00, 'Electricity Bill', 'OUTGOING', 'FAILED'),
(1, 60.00, 'Internet Bill', 'OUTGOING', 'PENDING'),
(1, 42.50, 'Gas Station', 'OUTGOING', 'FAILED'),

-- User 2 (sarah_smith) - Incomes
(2, 2200.00, 'Monthly Salary', 'INCOMES', 'COMPLETED'),
(2, 180.00, 'Freelance Writing', 'INCOMES', 'COMPLETED'),
(2, 100.00, 'Online Course Sales', 'INCOMES', 'COMPLETED'),
(2, 2200.00, 'Monthly Salary', 'INCOMES', 'FAILED'),
(2, 250.00, 'Consulting Work', 'INCOMES', 'PENDING'),

-- User 2 (sarah_smith) - Outgoings
(2, 950.00, 'Rent Payment', 'OUTGOING', 'COMPLETED'),
(2, 65.80, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(2, 35.00, 'Water Bill', 'OUTGOING', 'COMPLETED'),
(2, 55.00, 'Internet Bill', 'OUTGOING', 'COMPLETED'),
(2, 28.90, 'Public Transport', 'OUTGOING', 'COMPLETED'),
(2, 85.00, 'Hair Salon', 'OUTGOING', 'COMPLETED'),
(2, 12.99, 'Spotify Subscription', 'OUTGOING', 'COMPLETED'),
(2, 70.45, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(2, 40.00, 'Mobile Phone Bill', 'OUTGOING', 'PENDING'),
(2, 120.00, 'Gym Membership', 'OUTGOING', 'PENDING'),
(2, 950.00, 'Rent Payment', 'OUTGOING', 'PENDING'),
(2, 68.30, 'Grocery Shopping', 'OUTGOING', 'PENDING'),
(2, 35.00, 'Water Bill', 'OUTGOING', 'PENDING'),
(2, 55.00, 'Internet Bill', 'OUTGOING', 'PENDING'),
(2, 32.50, 'Public Transport', 'OUTGOING', 'FAILED'),

-- User 3 (mike_johnson) - Incomes
(3, 3200.00, 'Monthly Salary', 'INCOMES', 'COMPLETED'),
(3, 450.00, 'Contract Work', 'INCOMES', 'COMPLETED'),
(3, 200.00, 'Stock Dividends', 'INCOMES', 'COMPLETED'),
(3, 3200.00, 'Monthly Salary', 'INCOMES', 'FAILED'),
(3, 300.00, 'Side Project', 'INCOMES', 'FAILED'),

-- User 3 (mike_johnson) - Outgoings
(3, 1400.00, 'Mortgage Payment', 'OUTGOING', 'COMPLETED'),
(3, 110.25, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(3, 75.00, 'Electricity Bill', 'OUTGOING', 'COMPLETED'),
(3, 70.00, 'Internet Bill', 'OUTGOING', 'COMPLETED'),
(3, 55.80, 'Gas Station', 'OUTGOING', 'COMPLETED'),
(3, 150.00, 'Home Insurance', 'OUTGOING', 'COMPLETED'),
(3, 15.99, 'Amazon Prime', 'OUTGOING', 'COMPLETED'),
(3, 95.60, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(3, 60.00, 'Mobile Phone Bill', 'OUTGOING', 'COMPLETED'),
(3, 200.00, 'Car Payment', 'OUTGOING', 'COMPLETED'),
(3, 1400.00, 'Mortgage Payment', 'OUTGOING', 'COMPLETED'),
(3, 105.75, 'Grocery Shopping', 'OUTGOING', 'COMPLETED'),
(3, 75.00, 'Electricity Bill', 'OUTGOING', 'COMPLETED'),
(3, 70.00, 'Internet Bill', 'OUTGOING', 'COMPLETED'),
(3, 48.90, 'Gas Station', 'OUTGOING', 'FAILED'),

-- User 1 - More transactions
(1, 25.00, 'Coffee Shop', 'OUTGOING', 'COMPLETED'),
(1, 45.00, 'Lunch with Colleagues', 'OUTGOING', 'COMPLETED'),
(1, 30.00, 'Uber Ride', 'OUTGOING', 'COMPLETED'),
(1, 80.00, 'Movie Tickets', 'OUTGOING', 'COMPLETED'),
(1, 120.00, 'Amazon Purchase', 'OUTGOING', 'COMPLETED'),
(1, 35.00, 'Pharmacy', 'OUTGOING', 'FAILED'),
(1, 65.00, 'Book Store', 'OUTGOING', 'PENDING'),
(1, 28.00, 'Coffee Shop', 'OUTGOING', 'PENDING'),
(1, 50.00, 'Team Lunch', 'OUTGOING', 'FAILED'),

-- User 2 - More transactions
(2, 22.50, 'Coffee Shop', 'OUTGOING', 'COMPLETED'),
(2, 35.00, 'Lunch Meeting', 'OUTGOING', 'COMPLETED'),
(2, 25.00, 'Taxi Ride', 'OUTGOING', 'COMPLETED'),
(2, 60.00, 'Concert Tickets', 'OUTGOING', 'COMPLETED'),
(2, 95.00, 'Online Shopping', 'OUTGOING', 'COMPLETED'),
(2, 28.00, 'Pharmacy', 'OUTGOING', 'PENDING'),
(2, 45.00, 'Stationery', 'OUTGOING', 'FAILED'),
(2, 24.00, 'Coffee Shop', 'OUTGOING', 'PENDING'),
(2, 40.00, 'Client Lunch', 'OUTGOING', 'COMPLETED'),

-- User 3 - More transactions
(3, 30.00, 'Coffee Shop', 'OUTGOING', 'COMPLETED'),
(3, 60.00, 'Business Dinner', 'OUTGOING', 'COMPLETED'),
(3, 35.00, 'Ride Sharing', 'OUTGOING', 'COMPLETED'),
(3, 100.00, 'Sports Event', 'OUTGOING', 'COMPLETED'),
(3, 150.00, 'Electronics Store', 'OUTGOING', 'FAILED'),
(3, 42.00, 'Pharmacy', 'OUTGOING', 'COMPLETED'),
(3, 75.00, 'Home Decor', 'OUTGOING', 'PENDING'),
(3, 32.00, 'Coffee Shop', 'OUTGOING', 'FAILED'),
(3, 70.00, 'Networking Event', 'OUTGOING', 'COMPLETED'),

(1, 400.00, 'Tax Refund', 'INCOMES', 'PENDING'),
(2, 180.00, 'Freelance Project', 'INCOMES', 'PENDING'),
(3, 500.00, 'Bonus Payment', 'INCOMES', 'PENDING');


-- Insert records into incomes table (for all income transactions)
INSERT INTO incomes (transaction_id, source, is_taxable, amount, income_type)
VALUES
-- User 1 Incomes
(1, 'Tech Company Inc', TRUE, 4200.00, 'salary'),
(2, 'Freelance Client A', TRUE, 1200.00, 'freelance'),
(3, 'Investment Portfolio', TRUE, 400.00, 'investment'),
(4, 'Tech Company Inc', TRUE, 5400.00, 'salary'),
(5, 'Tech Company Inc', TRUE, 600.00, 'bonus'),

-- User 2 Incomes
(21, 'Marketing Agency', TRUE, 8000.00, 'salary'),
(22, 'Content Writing Client', TRUE, 20.00, 'freelance'),
(23, 'Online Course Platform', TRUE, 900.00, 'business'),
(24, 'Marketing Agency', TRUE, 2300.00, 'salary'),
(25, 'Business Consulting', TRUE, 500.00, 'consulting'),

-- User 3 Incomes
(41, 'Software Corp', TRUE, 12300.00, 'salary'),
(42, 'Contract Client B', TRUE, 900.00, 'contract'),
(43, 'Stock Investments', TRUE, 4000.00, 'investment'),
(44, 'Software Corp', TRUE, 4110.00, 'salary'),
(45, 'Side Project Client', TRUE, 258.00, 'freelance');

-- Insert records into outgoings table (for all outgoing transactions)
INSERT INTO outgoings (transaction_id, is_essential, outgoing_type)
VALUES
-- User 1 Outgoings
(6, TRUE, 'housing'),
(7, TRUE, 'food'),
(8, TRUE, 'utilities'),
(9, TRUE, 'utilities'),
(10, TRUE, 'transport'),
(11, FALSE, 'dining'),
(12, FALSE, 'entertainment'),
(13, TRUE, 'food'),
(14, TRUE, 'utilities'),
(15, FALSE, 'shopping'),
(16, TRUE, 'housing'),
(17, TRUE, 'food'),
(18, TRUE, 'utilities'),
(19, TRUE, 'utilities'),
(20, TRUE, 'transport'),
(46, FALSE, 'dining'),
(47, FALSE, 'dining'),
(48, FALSE, 'transport'),
(49, FALSE, 'entertainment'),
(50, FALSE, 'shopping'),
(51, TRUE, 'healthcare'),
(52, FALSE, 'shopping'),
(53, FALSE, 'dining'),
(54, FALSE, 'dining'),

-- User 2 Outgoings
(26, TRUE, 'housing'),
(27, TRUE, 'food'),
(28, TRUE, 'utilities'),
(29, TRUE, 'utilities'),
(30, TRUE, 'transport'),
(31, FALSE, 'personal_care'),
(32, FALSE, 'entertainment'),
(33, TRUE, 'food'),
(34, TRUE, 'utilities'),
(35, TRUE, 'health'),
(36, TRUE, 'housing'),
(37, TRUE, 'food'),
(38, TRUE, 'utilities'),
(39, TRUE, 'utilities'),
(40, TRUE, 'transport'),
(55, FALSE, 'dining'),
(56, FALSE, 'dining'),
(57, FALSE, 'transport'),
(58, FALSE, 'entertainment'),
(59, FALSE, 'shopping'),
(60, TRUE, 'healthcare'),
(61, FALSE, 'shopping'),
(62, FALSE, 'dining'),
(63, FALSE, 'dining'),

-- User 3 Outgoings
(64, TRUE, 'housing'),
(65, TRUE, 'food'),
(66, TRUE, 'utilities'),
(67, TRUE, 'utilities'),
(68, TRUE, 'transport'),
(69, TRUE, 'insurance'),
(70, FALSE, 'shopping'),
(71, TRUE, 'food'),
(72, TRUE, 'utilities'),
(73, TRUE, 'transport'),
(74, TRUE, 'housing'),
(75, TRUE, 'food'),
(76, TRUE, 'utilities'),
(77, TRUE, 'utilities'),
(78, TRUE, 'transport'),
(79, FALSE, 'dining'),
(80, FALSE, 'dining'),
(81, FALSE, 'transport'),
(82, FALSE, 'entertainment'),
(83, FALSE, 'shopping'),
(84, TRUE, 'healthcare'),
(85, FALSE, 'shopping'),
(86, FALSE, 'dining'),
(87, FALSE, 'dining');