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

Example:

```
docker exec -it f6bb8a47e6c80939250e4bf4f0768ca91750e20e7b20c5c8250bab9b5e42e8de npm run test
```

Для тестов с авторизацией:

```
docker exec -it <container_id> npm run test:auth
```
