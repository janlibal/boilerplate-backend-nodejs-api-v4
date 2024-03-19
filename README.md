# Boilerplate API III.

## Introduction

Boilerplate API is a simple RESTful API boilerplate project built using Node.Js, Koa, TypeScript and Objection as ORM for a Postres database. As middleware is used JWT, CORS, Pino logger.

### What it contains

* Node.js (version 20.0.0. and higher)
* Npm (version 8.0.0. and higher)
* TypeScript 
* Koa framework
* Postgres (database) with objection
* Pino (logger)
* Jest (integration tests)

### Available Endpoints

* GET / – gets API info
* POST /api/v1/user – creates new user
* POST /api/v1/login – login (returns access token to access protected routes)

## Setup

### Requirements

* Node.js – 20 and higher
* Npm – 8 and higher
* Docker and docker-compose in order to launch Postgres and App 

### Setup And Start

* install dependencies: npm install
* run in development: npm run dev
* run in staging: launch app in docker on 8080

### Test

* npm run test

### Migrations

* create a new migration: npm run migration:make
* apply migration into DB in dev environment: npm run db-dev:migrate
* apply migration into DB in test environment: npm run db-test:migrate

### Seeding

* create a new seed: npm run seed:make
* apply seed into DB in dev environment: npm run db-dev:seed
* apply seed into DB in test environment: npm run db-test:seed

### Build

* build into /dist: npm run build


## Design

### Project Structure

* The project is written in TypeScript. When TS compiles, all subsequently JS files are in /dist
* The entry point for the server is /src/index.ts
* The app flow: server -> routes -> controllers -> operations -> repositories
* Middleware are in /src/middleware folder
* Database connection functions in /src/database
* Schemas for validation are in /src/validations
* Custom interfaces for TS types are in /src/interfaces
* Tests are in /tests folder

### API Design

The project structure is scalable following RESTful practices.

* The routes call controllers.
* The controllers choose operations to execute. No business logic runs in controllers.
* The operations handle the business logic and call database access in repositories.
* The repositories contain database access.

### Testing

This project contains API integration tests and those are achieved using Mocha as a test runner.
Tests are run against a test database running in docker.

### Authentication

Authentication is implemented using a jwt access token. When a user logs in, they are issued a token to perform authenticated requests.
