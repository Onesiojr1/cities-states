import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StateService } from './state.service';
import { StateDto } from './dto/state.dto';

@Controller('state')
export class StateController {
  constructor(private stateService: StateService) {}

  @Post()
  async createState(@Body() dto: StateDto) {
    const state = await this.stateService.verifyUniqueState(dto.acronym);
    if(state) throw new BadRequestException('State acronym already exists');
    return await this.stateService.createState(dto);
  }

  @Get()
  async getAllStates() {
    return await this.stateService.getAllStates();
  }

  @Get('/:id')
  async getStateById(@Param('id') id: string) {
    return await this.stateService.getStateById(id);
  }

  @Put('/:id')
  async updateState(@Param('id') id: string, @Body() dto: StateDto) {
    return await this.stateService.updateState(id, dto);
  }

  @Delete('/delete/:id')
  async deleteState(@Param('id') id: string) {
    return await this.stateService.deleteState(id);
  }
}
