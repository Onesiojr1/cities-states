import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StateController],
  providers: [StateService, PrismaService, JwtService]
})
export class StateModule {}
