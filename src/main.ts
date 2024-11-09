import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 4000;

  const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(PORT);
  console.log('Server is running on http://localhost:4000');
  console.log('Swagger UI available at http://localhost:4000/doc');
}
bootstrap();
