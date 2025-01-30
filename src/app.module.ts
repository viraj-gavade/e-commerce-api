import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware  } from './auth/auth.middleware';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AdminMiddleware } from './auth/admin.midddleware';
@Module({
  imports: [PrismaModule, AuthModule, UserModule, OrderModule,OrderItemModule , OrderItemModule, ProductModule,CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/order','/user'); // Apply middleware to all routes or specific ones

      consumer
      .apply(AuthMiddleware,AdminMiddleware)
      .forRoutes('/category/panel/','/user/panel/',);
  }
}
