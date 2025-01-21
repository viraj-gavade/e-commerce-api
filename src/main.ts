import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import 'dotenv/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.JWT_SECRET)
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
