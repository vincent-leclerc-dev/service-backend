# Documentation <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [Techinals informations](#techinals-informations)
  - [Stack](#stack)
  - [Prerequisites](#prerequisites)
  - [Run Api Gateway](#run-api-gateway)
    - [with build](#with-build)
    - [with watch mode](#with-watch-mode)
    - [with watch and debug mode](#with-watch-and-debug-mode)
  - [Run events consumer](#run-events-consumer)
    - [with build](#with-build-1)
    - [with watch mode](#with-watch-mode-1)
    - [with watch and debug mode](#with-watch-and-debug-mode-1)

## Techinals informations

### Stack

- NestJS with Fastify
- MongoDB with mongoose
- Redis
- Docker with compose

### Prerequisites

- [Node.js and npm](https://nodejs.org/en/download/)
- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- [NestJS cli](https://docs.nestjs.com/)
- [Docker Desktop](https://docs.docker.com/get-docker/)

### Run Api Gateway

#### with build

```bash
npm start
```

#### with watch mode

```bash
npm run start:dev
```

#### with watch and debug mode

```bash
npm run start:debug
```

### Run events consumer

#### with build

```bash
npm start-consumer
```

#### with watch mode

```bash
npm run start-consumer:dev
```

#### with watch and debug mode

```bash
npm run start-consumer:debug
```
