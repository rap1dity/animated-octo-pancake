import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from "./users/entities/users.entity";
import { ColumnsModule } from './columns/columns.module';
import { Column } from "./columns/entities/column.entity";
import { GuardsModule } from './guards/guards.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { Task } from "./tasks/entities/task.entity";
import { Comment } from "./comments/entities/comment.entity";

@Module({
controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Column, Task, Comment],
      autoLoadEntities: true,
      synchronize: true
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    GuardsModule,
    TasksModule,
    CommentsModule
  ],
})
export class AppModule {}