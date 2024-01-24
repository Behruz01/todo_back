import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './api/todo/todo.module';
import { TodoEntity } from './infra/entities/todo.entity';
import "dotenv/config"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DB_URL,
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      entities: [TodoEntity]
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
