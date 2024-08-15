import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuardsModule } from "../guards/guards.module";
import { Comment } from "./entities/comment.entity";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    GuardsModule,
    TasksModule
  ]
})
export class CommentsModule {}
