# Authentication API

A lightweight Node.js based authentication API

## Installation

```
git clone https://github.com/sakshamsaxena/authAPI.git
cd authAPI
npm install
```

## Usage

API is served by an Express Server at port 3000. Start the server by `npm start`

## API

### POST `/register`

* POST Data (application/json) : name, email, password
* Returns : `201` in case of successful registration and `403` in case of any failure.

### POST `/login`

* POST Data (application/json) : email, password
* Returns : `200` in case of successful login with a JWT and `403` in case of any failure.

### POST `/forgot`

* POST Data (application/json) : email
* Returns : `200` in case of successful password reset and `403` in case of any failure. The new password shall be emailed but currently that's pending.

## License

[MIT](./LICENSE.txt)
