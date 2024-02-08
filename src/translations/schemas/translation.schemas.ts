import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Translation {
  @Prop()
  message: string;

  @Prop()
  uz: string;

  @Prop()
  en: string;

  @Prop()
  ru: string;

  @Prop()
  kr: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
