import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [StateModule, CityModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
