import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StateDto } from './dto/state.dto';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async createState(dto: StateDto) {
    return await this.prisma.state.create({
      data: { ...dto}
    })
  }

  async getAllStates() {
    return await this.prisma.state.findMany()
  }

  async getStateById(id: string) {
    return await this.prisma.state.findUnique({
      where: { id }
    })
  }

  async updateState(id: string, dto: StateDto) {
    return await this.prisma.state.update({
      where: { id },
      data: { ...dto }
    })
  }

  async deleteState(id: string) {
    return await this.prisma.state.delete({
      where: { id }
    })
  }
}
