import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Column } from "./entities/column.entity";
import { AccessGuard } from "../guards/access.guard";
import { GuardsModule } from "../guards/guards.module";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [ColumnsController],
  providers: [ColumnsService, AccessGuard],
  imports: [
    TypeOrmModule.forFeature([Column]),
    GuardsModule,
    UsersModule
  ],
  exports: [
    ColumnsService,
  ]
})
export class ColumnsModule {}
