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
import { VacancyService } from './vacancy.service';
import { CreateVacancy } from './dto/create-vacancy.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  getVacancies(): Promise<object> {
    return this.vacancyService.getVacancies();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  createVacancy(
    @Body()
    createVacancy: CreateVacancy,
  ): Promise<object> {
    console.log(createVacancy);
    return this.vacancyService.createVacancy(createVacancy);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  updateVacancy(
    @Param('id')
    id: string,
    @Body()
    createVacancy: CreateVacancy,
  ): Promise<object> {
    return this.vacancyService.updateVacancy(id, createVacancy);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  deleteVacancy(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.vacancyService.deleteVacancy(id);
  }
}
