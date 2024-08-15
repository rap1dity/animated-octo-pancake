import { Module } from '@nestjs/common';
import { AccessGuard } from "./access.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'DEV',
      signOptions: { expiresIn: '30d' }
    })
  ],
  providers: [JwtAuthGuard, AccessGuard],
  exports: [JwtAuthGuard, JwtModule, AccessGuard],
})
export class GuardsModule {}
