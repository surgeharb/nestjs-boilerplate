<h1>NestJS Boilerplate
  <a
    href="http://nestjs.com/"
    target="blank"
  >
    <img
      src="https://nestjs.com/img/logo_text.svg"
      width="65"
      alt="Nest Logo"
    />
  </a>
</h1>

## Start Guide

### Development Watch Run

- Create .env file `cp .env-sample.env .env` and set `NODE_ENV=development`
- Install dependencies: `npm install`
- Make Sure you have a running mongod instance using `mongod`
- Start the app using `nodemon` (app will run on port 3000 by default)
- Feel free to change the port in config/env/development.env

### Production Build Run

- Create .env file `echo NODE_ENV=production > .env`
- Change the port number in config/env/production.env
- Make Sure you have a running mongod instance using `mongod`
- Install [PM2](http://pm2.keymetrics.io/): `npm install pm2 -g`
- Install dependencies and start server: `npm run create:api`
- Watch Logs: `pm2 logs api`

### Production Deployment

- Setup your custom server by following [these instructions](https://medium.com/@sergeharb.175/launching-mean-stack-server-with-nginx-rehl-2d8d584990c3)
- `cd /path/to/project/root` then `npm restart`

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables using 'getEnv(key)' function from `.env`, `config/env/development.env` or `config/env/production.env`.

## Mongoose ODM integrated

[Mongoose](https://mongoosejs.com/) gives you possibility to use mongoDB.
Look at docs for more details.
[https://docs.nestjs.com/techniques/mongodb](https://docs.nestjs.com/techniques/mongodb)

## Authentication - JWT

Already preconfigured JWT authentication.
It's suggested to change current hashing private key to something more secure.
You can start use already working implementation of `Login` and `Registration`
endpoints.

## Generate Encryption Keys

#### You must generate new the private/public key pair as they are used to sign the secure Json Web Tokens (JWTs) for Users' Authentication!

```bash
# Navigate to config/keys where the default keys are stored
# Then delete the default keys to generate your own keys
$ cd config/keys && rm private.key && rm public.key

# Generate Private Key
$ openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048

# Extract Public Key from generated Private Key
$ openssl rsa -pubout -in private.key -out public.key
```

## Protected Endpoints

You can easily make an API restrict users access until a valid JWT authentication is provided in the `Headers` through `Authorization: Bearer TOKEN` by adding `@UseGuards(AuthGuard('jwt'))` as follows:

```typescript
@Get(':id')
@UseGuards(AuthGuard('jwt')) // <-- AuthGuard protecting this endpoint
async getUser(@Param('id') userId: string) {

  // Controller Logic goes here...

  return { user: userData };
}

// Navigate through full code in "src/users/users.controller.ts"
```

## API Documentation

```bash
# Register User
$ curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"Full Name","email":"user@test.com","password":"pass"}' \
  http://localhost:3000/v1/auth/register

# Login User
$ curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"user@test.com","password":"pass"}' \
  http://localhost:3000/v1/auth/login

# Consume Protected Endpoint
# Replace TOKEN with 'token' returned in Login/Register
$ curl --header "Authorization: Bearer TOKEN" \
  http://localhost:3000/v1/users/507f191e810c19729de860ea
```

## Further Development

Visit [NestJS](https://docs.nestjs.com/) Documentation Page for more information on how to achieve further development techniques and implementations. Or simply by contacting me at [me@sergeharb.com](mailto:me@sergeharb.com)

## Description

[NestJS](https://github.com/nestjs/nest) Boilerplate crafted with ❤️ by [Serge Harb](https://sergeharb.com).