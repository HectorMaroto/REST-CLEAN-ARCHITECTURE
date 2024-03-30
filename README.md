# REST-CLEAN-ARCHITECTURE

> [!NOTE]
> Tech Stack: TypeScript, Node.js, Express, MongoDB

> [!TIP]
> To run the app
```npm run dev```

To simulate API requests I used Postman, and Mongo Compass to manage the database.
I have implemented JWT for user's authentication and protect the server's routes.
To test the app, you can send get and post requests to the following routes:

```GET - /api/auth```
```POST - /api/auth/login```
```POST - /api/auth/register```

App's flow:

- You send a register request to the server
- The server validates user's credentials
- The server generates a token and sign it with a secret key (generated with openssl)
- The hashed jwt is sent with the linked user's info
- With that jwt in the request header we can send the GET request to get the database's users and the last registered user as 'token' from the protected route if database validates token's sign properly.


