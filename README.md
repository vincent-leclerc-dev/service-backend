# Documentation <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [Techinals informations](#techinals-informations)
  - [Stack](#stack)
- [Prerequisites](#prerequisites)
  - [Code quality](#code-quality)
    - [Lint](#lint)
    - [Unit tests](#unit-tests)
    - [Husky](#husky)
    - [Run](#run)
      - [with build](#with-build)
      - [with watch mode](#with-watch-mode)
      - [with watch and debug mode](#with-watch-and-debug-mode)
      - [Docker](#docker)

## Techinals informations

### Stack

- NestJS with Fastify
- MongoDB with mongoose
- Docker with compose

## Prerequisites

- [Node.js and npm](https://nodejs.org/en/download/)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [NestJS cli](https://docs.nestjs.com/)
- [Docker Desktop](https://docs.docker.com/get-docker/)

### Code quality

#### Lint

#### Unit tests

#### Husky

#### Run

##### with build

```bash
npm start
```

##### with watch mode

```bash
npm run start:dev
```

##### with watch and debug mode

```bash
npm run start:debug
```

##### Docker

``` bash
docker-compose build
docker-compose up
```
