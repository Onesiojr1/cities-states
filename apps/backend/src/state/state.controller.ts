import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { StateDto } from './dto/state.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PermissonGuard } from '../auth/guards/permissions.guard';
import { PermissionsEnum } from '../auth/permissions.enum';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.CreateState])
  @Post()
  async createState(@Body() dto: StateDto) {
    const state = await this.stateService.verifyUniqueState(dto.acronym);
    if(state) throw new BadRequestException('State acronym already exists');
    return await this.stateService.createState(dto);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.ReadState])
  @Get()
  async getAllStates() {
    return await this.stateService.getAllStates();
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.ReadState])
  @Get('/:id')
  async getStateById(@Param('id') id: string) {
    return await this.stateService.getStateById(id);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.EditState])
  @Put('/:id')
  async updateState(@Param('id') id: string, @Body() dto: StateDto) {
    return await this.stateService.updateState(id, dto);
  }

  @UseGuards(JwtGuard, PermissonGuard)
  @SetMetadata('permissions', [PermissionsEnum.DeleteState])
  @Delete('/delete/:id')
  async deleteState(@Param('id') id: string) {
    return await this.stateService.deleteState(id);
  }
}
