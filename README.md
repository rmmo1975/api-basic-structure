# api-basic-structure
Another example of API using express, mongodb and typescript where I used many of the interesting structures I've been found. You can find more in https://github.com/mwanago.

## Set up the development environment
  1. Install dependencies `yarn install`
  2. Generate `.env` file to setup the development environment variables: `cp .env.example .env`
  3. Generate `.env.test` file to setup the testing environment variables: `cp .env.example .env`

## Environment variables
| Variable                            | Purpose                                           |
|  ---                                |  ---                                              |
| HTTP_PORT                           | Sets the api port - default 3000                  |
| MONGO_USER                          | mongodb user                                      |
| MONGO_PASSWORD                      | mongodb password                                  |
| MONGO_PATH                          | mongodb connection string                         |
| MONGO_DB                            | database name                                     |
| JWT_SECRET                          | json web token secret                             |
