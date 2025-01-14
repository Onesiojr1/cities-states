import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDTO } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(role: CreateRoleDTO) {
    return this.prisma.roles.create({ data: { ...role } });
  }

  async getRoleById(id: string) {
    return this.prisma.roles.findUnique({ where: { id } });
  }

  async getAllRoles() {
    return this.prisma.roles.findMany()
  }

  async updateRole(id: string, role: CreateRoleDTO) {
    return this.prisma.roles.update({ where: { id }, data: { ...role } });
  }

  async deleteRole(id: string) {
    return this.prisma.roles.delete({ where: { id } });
  }

  async getPermissionsByRole(id: string) {
    return this.prisma.roles.findUnique({ where: { id }, select: { permissions: true } });
  }
}
