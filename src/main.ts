import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import * as serverless from 'serverless-http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.JWT_SECRET); // Log your JWT_SECRET to check if it's set properly

  // Use cookie parser middleware
  app.use(cookieParser());

  // Initialize the app but do not listen on a port
  await app.init();

  // Use serverless-http to adapt the app for serverless
  const handler = serverless(app.getHttpAdapter().getInstance());

  // Export the handler for serverless function
  module.exports.handler = handler;
}

bootstrap().then(() => {
  console.log("Serverless handler initialized");
});
