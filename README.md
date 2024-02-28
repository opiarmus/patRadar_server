# patRadar_server
This is the API server for the patRadar website.

## Run
To run the server, an environment file is needed, which is not included in the 
repository. It needs to contain the following variables:

```
PORT=[Port; e.g. 9998]
MONGO_DB_CS=[MongoDB_Connection_String; e.g. mongodb+srv://...]
```

To install the necessary packages:

`npm install`

To run the server:

`node ./server.js`

Alternatively, if "nodemon" is installed:

`npx nodemon ./server.js`
