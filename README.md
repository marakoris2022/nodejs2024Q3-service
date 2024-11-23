# Home Library Service.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/marakoris2022/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

Server is running on http://localhost:4000
Swagger UI available at http://localhost:4000/doc

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# Prerequisites / Docker

Docker - Download & Install Docker.
Docker Compose - (обычно устанавливается вместе с Docker Desktop).

## Running application (with Docker)

1. Сборка и запуск контейнеров
   Убедитесь, что Docker установлен и работает. Затем выполните команды:

```
docker-compose up --build
```

2. Доступ к приложению
   После запуска контейнеров, приложение будет доступно по адресу:

API: http://localhost:4000
Swagger: http://localhost:4000/doc

3. Остановка контейнеров
   Для остановки контейнеров выполните:

```
docker-compose down
```

## Testing (with Docker)

Для запуска тестов в Docker-контейнере (без авторизации):

```
docker exec -it <container_id> npm run test
```

Для тестов с авторизацией:

```
docker exec -it <container_id> npm run test:auth
```
