import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StateModule } from './state/state.module';

@Module({
  imports: [StateModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
