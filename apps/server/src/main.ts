import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const corsOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8080",
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    process.env.CLIENT_URL?.replace("http://", "https://"),
    process.env.ADMIN_URL?.replace("http://", "https://")
  ].filter((o): o is string => Boolean(o));
  app.enableCors({ origin: corsOrigins });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  await app.listen(4000);
}

bootstrap();
