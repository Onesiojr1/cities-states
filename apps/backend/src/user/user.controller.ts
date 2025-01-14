import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { changeRoleDto } from './dto/user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(":id")
  async getUserProfile(@Param("id") id: string) {
    return await this.userService.findById(id);
  }

  @Put("/role/:id")
  async changeUserRole(@Param("id") id: string, @Body() dto: changeRoleDto) {
    return await this.userService.changeRole(id, dto.roleId);
  }
}
