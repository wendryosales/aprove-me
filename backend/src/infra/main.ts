import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { EnvService } from "./env/env.service";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(EnvService).get("PORT");

  // https://docs.nestjs.com/pipes#global-scoped-pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(PORT);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
