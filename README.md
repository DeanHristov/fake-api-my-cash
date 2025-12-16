# Motivation

Simply, this project giving the BE part of [My Cash App](https://github.com/DeanHristov/vite-my-cash).
The second reason of this project is just to give you an overview whether or how
I do manage BE part with this set of technologies in scope of REST API.  

## Requirements

- [Node](https://nodejs.org/en/) `^v22.19.0`
- [NPM](https://www.npmjs.com/) `^10.9.3`
- [Docker](https://www.docker.com/) `Latest one`

## Installation

After confirming that your environment meets the
above [requirements](#requirements), it is time to clone the project
locally by doing the following:

```bash
$ git clone git@github.com:DeanHristov/fake-api-my-cash.git <project-name>
$ cd <project-name>
```

Before we proceed further we need create a few environment variables.
In order to do that you must create **~/.env** file within the root directory
of the project and copy-paste template below.

```dotenv
NODE_PORT=3002

API_VERSION=/api/v1

USE_COOKIE=false

# 1m = 60000
# 10m = 600000
# 1h = 3600000ms
JWT_EXPIRE=10m

# 1m = 60000ms
# 10m = 600000ms
# 1h = 3600000ms
JWT_COOKIE_EXPIRE=10m
JWT_SECRET=super-secret-word
```

## Running the app with Docker

The following steps are required only if want to run MySQL and the API within
Docker!
Feel free to skip next few steps in case you already have MySQL and NodeJS installed on
your machine, and
you do want to run the API without docker.
Ok, let us move further. In order to install, run and seed data into databases,
we will
use [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/).

Assuming you already passed [requirements](#requirements) above and now is time
to run the app.

1. In order to install and run locally the all infra, run the follow command

```bash
$ docker compose up -d
```

2. Now, we have all infra installed and running, but we do not have data. In
   order to do that
   we need to jump in DB container via bash and seed data.
    - Connect to MySQL container
        ```bash
        $ docker exec -it MySQL bash
        ```
    - Create a directory where we going to copy our DB schema and its mock data.
        ```bash
        $ mkdir ./work
        ```
    - Copy database schema - For this purpose you need make step back and run
      follow
      commands from the root directory of the project (The **host** location).
      ```bash
      $ docker cp ./src/data/mysql-db-schema.sql  MySQL:/work
      ``` 
    - Copy mock data
        ```bash
         $ docker cp ./src/data/mysql-db-seed.sql  MySQL:/work
        ```
    - Now jump back in the container bash
         ```bash
         $ docker exec -it MySQL bash
         ```
    - Go to working directory
         ```bash
         $ cd ./work/
         ```
    - Connect to MySQL (You should be in the container)
         ```bash
         $ mysql -u root -p # 12345
         ```
    - Creating the database
         ```bash
         $ source ./mysql-db-schema.sql
         ```
    - Seed its data
         ```bash
         $ source ./mysql-db-seed.sql
         ```

3. Stopping the app (+ its API and DB)

```bash
$ docker compose stop
```

4. Stops containers and removes containers, networks, volumes, and images

```bash
$ docker compose down
```

## Running the app without Docker

When you're done with the [Installation](#installation), run the following
command:

```bash
$ npm install # or yarn install
```

Running the app in **development** mode.

```bash
$ npm run start:dev
```

### Running the Project in production mode.

Firstly, build the app with the following command:

```bash
$ npm run build
```

Running the app in **development** mode.

```bash
$ npm start
```

## This repo comes with built-in functionality

- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution (hpp)
- Add headers for security (helmet)
- Use cors to make API public

Currently, there are three kinds of users.

| # | email             | pass  | 
|---|-------------------|-------| 
| 1 | user1@example.com | 12345 | 
| 2 | user2@example.com | 12345 |
| 3 | user3@example.com | 12345 | 

## Project Structure
The project structure presented in this boilerplate is **flatten**, where
functionality is grouped primarily by feature rather than the file type.

```

├── build                           # Auto-generated directory. Contains **production-ready** code.
│   └── *.js
│   └── [dir-name]                  # Sub directory
│       └── *.js
├── docs                            # Contains files in *.md format with documentation of each API route.
│   └── *.md                        # Represent a *.md with the route documentation.
├── src                             # Application source code is stored here.
│   ├── controllers                # A directory contains files that control the behavior of the routes.
│       └── *.ts                    # Controlling how the user interacts with a route.
│   ├── core                        # The core functionality is stored here.
│       └── *.ts                    # Usually, represent models.
│   ├── middlewares                 # A directory that contains files with expressjs-based middlewares.
│       └── *.ts                    # Each file contains a single middleware.
│   ├── routes                      # Contains files that represent endpoints (URIs) and respond to client requests.
│       └── *.ts                    # Represent a single endpoint.
│   ├── utils                       # A directory that contains utility files.
│       └── *.ts                    # A utility file - Common used functionality.
│   ├── mocks                       # A directory that could contain fake-data. It is used only for seeding the data.
│       └── *.json                  # A single unit, that contains fake data.
│   ├── App.ts                      # The entry point of the app.
├── .env                            # App-related ENV variables are stored here. MUST be created manually!
├── .env.example                    # A template which contains important variables for the app.
├── .eslintignore                   # Config file for ESLint
├── .eslintrc                       # Config file for ESLint
├── .gitignore                      # Config file for GIT
├── .prettierrc                     # Config file for Prettier
├── jest.config.js                  # Config file for Jestjs
├── nodemon.json                    # Config file for nodemon
├── package.json                    # The heart of the app. It holds important metadata about a project like scripts dependencies
├── package-lock.json               # Place where we control the dependencies
├── README.md                       # A documentation file
├── tsconfig.json                   # Config file for typescript
```

## Main tasks

All tasks automation are based
on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Tasks                     | Description                                    |
|---------------------------|------------------------------------------------|
| `npm run start:dev`       | Running the app in **dev** mode                |
| `npm run build`           | Building the code in **production-ready** mode |
| `npm run start`           | Running the app in **prod** mode               |
| `npm run test`            | Running the unit tests (by using jest)         |
| `npm run test:watch`      | Running the unit tests in "watch" mode         |
| `npm run prettier-format` | Code formatting                                |

## Used technologies

- NodeJS (v22+) - https://nodejs.org/en/
- TypeScript (v5+) - https://www.typescriptlang.org/
- ExpressJS (v5+) - https://expressjs.com/
- Git - https://git-scm.com/
- Docker - https://www.docker.com/
- MySQL - https://www.mysql.com/

## Made by

Author: [D. Hristov](https://github.com/DeanHristov) | Version: [1.0.0](/docs/)
