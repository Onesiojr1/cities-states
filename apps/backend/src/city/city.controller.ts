import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { cityDto } from './dto/city.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PermissonGuard } from '../auth/guards/permissions.guard';
import { PermissionsEnum } from '../auth/permissions.enum';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.CreateCity])
  @Post()
  async createCity(@Body() dto: cityDto) {
    return await this.cityService.createCity(dto);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.ReadCity])
  @Get()
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.ReadCity, PermissionsEnum.ReadState])
  @Get('/state/:id')
  async getAllCitiesByState(@Param('id') id: string) {
    return await this.cityService.getAllCitiesByState(id);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.ReadCity])
  @Get('/:id')
  async getCityById(@Param('id') id: string) {
    return await this.cityService.getCityById(id);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.EditCity])
  @Put('/:id')
  async updateCity(@Param('id') id: string, @Body() dto: cityDto) {
    return await this.cityService.updateCity(id, dto);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.DeleteCity])
  @Delete('/delete/:id')
  async deleteCity(@Param('id') id: string) {
    return await this.cityService.deleteCity(id);
  }
}
