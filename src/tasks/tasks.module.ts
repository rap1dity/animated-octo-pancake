import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { GuardsModule } from "../guards/guards.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { ColumnsModule } from "../columns/columns.module";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    GuardsModule,
    ColumnsModule
  ],
  exports: [
    TasksService,
  ]
})
export class TasksModule {}
