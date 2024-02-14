import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Vacancy {
  @Prop()
  title: string;

  @Prop()
  price: string;

  @Prop()
  description: string;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
