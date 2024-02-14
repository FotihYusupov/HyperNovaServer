import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Portfolio {
  @Prop()
  title: string;

  @Prop()
  photoLink: string;

  @Prop()
  link: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
