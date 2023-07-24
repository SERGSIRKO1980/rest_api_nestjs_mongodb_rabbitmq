import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/exception.filter';
import { mainlogger } from './middlewars/main.logger.middlewar';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(mainlogger);
  await app.listen(3000);
}
bootstrap();
