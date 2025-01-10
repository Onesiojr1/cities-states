import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { cityDto } from './dto/city.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('city')
// @UseGuards(JwtGuard)
export class CityController {
  constructor(private cityService: CityService) {}

  @Post()
  async createCity(@Body() dto: cityDto) {
    return await this.cityService.createCity(dto);
  }

  @Get()
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @Get('/state/:id')
  async getAllCitiesByState(@Param('id') id: string) {
    return await this.cityService.getAllCitiesByState(id);
  }

  @Get('/:id')
  async getCityById(@Param('id') id: string) {
    return await this.cityService.getCityById(id);
  }

  @Put('/:id')
  async updateCity(@Param('id') id: string, @Body() dto: cityDto) {
    return await this.cityService.updateCity(id, dto);
  }

  @Delete('/delete/:id')
  async deleteCity(@Param('id') id: string) {
    return await this.cityService.deleteCity(id);
  }
}
