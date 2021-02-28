CREATE DATABASE moneygame;
-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    registration_date DATE DEFAULT CURRENT_DATE,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);
CREATE TABLE nse_stocks(
    stock_symbol VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    stock_name VARCHAR(255) NOT NULL
);
CREATE TABLE nse_stocks_rate(
    stock_rate_id BIGSERIAL PRIMARY KEY,
    stock_symbol VARCHAR(255) REFERENCES nse_stocks(stock_symbol) NOT NULL,
    on_date DATE DEFAULT CURRENT_DATE,
    eod_price NUMERIC(10, 3) NOT NULL
);
CREATE TABLE transactions(
    transaction_id BIGSERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) NOT NULL,
    stock_symbol VARCHAR(255) REFERENCES nse_stocks(stock_symbol) NOT NULL,
    transaction_stock_rate_id BIGSERIAL REFERENCES nse_stocks_rate(stock_rate_id) NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    transaction_type VARCHAR(255) NOT NULL,
    transaction_qty SMALLINT CHECK (transaction_qty > 0)
);
COPY nse_stocks(stock_symbol, stock_name)
FROM 'G:\Moneygame\utility\nse_stocks.csv' DELIMITER ',' CSV HEADER;
COPY nse_stocks_rate(stock_symbol, eod_price, on_date)
FROM 'G:\Moneygame\utility\nse_stocks_rate_17.csv' DELIMITER ',' CSV HEADER;
COPY nse_stocks_rate(stock_symbol, eod_price, on_date)
FROM 'G:\Moneygame\utility\nse_stocks_rate_18.csv' DELIMITER ',' CSV HEADER;
COPY nse_stocks_rate(stock_symbol, eod_price, on_date)
FROM 'G:\Moneygame\utility\nse_stocks_rate_17.csv' DELIMITER ',' CSV HEADER;