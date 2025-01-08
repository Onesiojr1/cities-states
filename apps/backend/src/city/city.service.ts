import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { cityDto } from './dto/city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async createCity(dto: cityDto) {
    return await this.prisma.city.create({
      data: { ...dto }
    })
  }

  async getAllCities() {
    return await this.prisma.city.findMany()
  }

  async getAllCitiesByState(stateId: string) {
    return await this.prisma.city.findMany({
      where: { stateId }
    })
  }

  async getCityById(id: string) {
    return await this.prisma.city.findUnique({
      where: { id }
    })
  }

  async updateCity(id: string, dto: cityDto) {
    return await this.prisma.city.update({
      where: { id },
      data: { ...dto }
    })
  }

  async deleteCity(id: string) {
    return await this.prisma.city.delete({
      where: { id }
    })
  }
}
