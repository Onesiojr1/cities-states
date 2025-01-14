import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async createRole(@Body() dto: CreateRoleDTO) {
    return this.rolesService.createRole(dto);
  }

  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get('/:id')
  async getRoleById(@Param('id') id: string) {
    return this.rolesService.getRoleById(id);
  }

  @Put('/:id')
  async updateRole(@Param('id') id: string, @Body() dto: CreateRoleDTO) {
    return this.rolesService.updateRole(id, dto);
  }

  @Delete('/delete/:id')
  async deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }

  @Get('/:id/permissions')
  async getPermissionsByRole(@Param('id') id: string) {
    return this.rolesService.getPermissionsByRole(id);
  }
}
