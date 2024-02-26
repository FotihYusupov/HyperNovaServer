import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy } from './schema/vacancy.schema';
import { CreateVacancy } from './dto/create-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy.name)
    private readonly vacancyModel: Model<Vacancy>,
  ) {}

  async getVacancies(): Promise<object> {
    const vacancies = await this.vacancyModel.find();
    return { data: vacancies };
  }

  async createVacancy(createVacancy: CreateVacancy): Promise<object> {
    const vacancy = await this.vacancyModel.create(createVacancy);
    return { data: vacancy };
  }

  async updateVacancy(
    id: string,
    createVacancy: CreateVacancy,
  ): Promise<object> {
    const vacancy = await this.vacancyModel.findByIdAndUpdate(
      id,
      createVacancy,
    );
    return { data: vacancy };
  }

  async deleteVacancy(id: string): Promise<string> {
    await this.vacancyModel.findByIdAndDelete(id);
    return 'Vacancy deleted';
  }
}
