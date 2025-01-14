import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [StateModule, CityModule, UserModule, AuthModule, RolesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
