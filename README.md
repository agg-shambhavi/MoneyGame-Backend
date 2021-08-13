# 📈💰 MoneyGame: Backend
Backend for the MoneyGame project

## 🛠 Implemented the following functionalities:

- Registration & Login
- Returning a jwt-Token on Login/Registration
- Verification of jwt-Token validity
- Buying transaction
- Selling Transaction
- Viewing all transactions made by a user

## 🎯 API Endpoints
Following is a brief about routes of endpoints and their expected inputs:

1. `/auth/register `: For registering a new user. <br>
   Input: <br>
   `{ "first_name": "Jane", "last_name": "Doe", "email": "janed@abc.com", "password": "password" }`<br>
   This returns a jwt Token.
2. `/auth/login` : For logging in. <br>
   Input: <br>
   `{ "email": "janed@abc.com", "password": "password" }`<br>
   This returns a jwt Token.
3. `/auth/is-verify` : Veifies if jwt Token is valid or not. Insert `token` as key and jwt Token as value in request header. Returns `true` or `false`. A middleware is used for this purpose called as `authorize`. I used this middleware in other places too.
4. `/dashboard` : `GETS` the `(first_name, last_name, registration_date, user_email)` of the user. This route also uses `authorize`, hence requires jwt token key-value pair in the header.
5. `/transaction/buy`: Endpoint for buying stock. Uses authorize as middleware.Returns successful message. <br>
   Inputs: <br>
   `{ "stock_symbol": " AEGIS LOGIS ", "qty": 4, "date": "2021-2-17" }`
6. `/transaction/sell`: Endpoint for buying stock. Uses authorize as middleware. Returns successful message. Quantities are saved in negative. <br>
   Inputs: <br>
   `{ "stock_symbol": " AEGIS LOGIS ", "qty": 4, "date": "2021-2-18" }`
7. `/transaction/all`: Endpoint for showing all transactions by the user. Uses authorize as middleware. Returns `stock_symbol, stock_name, transaction_date, qty, transaction_type, eod_price` of each transaction.

## 👩‍🏭 Getting started with developement
* Download the dependencies:
```bash
> npm install
```
* Start the developement server:
```bash
>  npm start
```
## 📜 License
This project is released under a free and open-source software license, Apache License 2.0 or later ([LICENSE](LICENSE) or https://www.apache.org/licenses/LICENSE-2.0). The documentation is also released under a free documentation license, namely the [GFDL v1.3](https://www.gnu.org/licenses/fdl-1.3.en.html) license or later.
