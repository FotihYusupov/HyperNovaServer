import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Translation {
  @Prop()
  key: string;

  @Prop()
  valueUz: string;

  @Prop()
  valueEn: string;

  @Prop()
  valueRu: string;

  @Prop()
  valueKr: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
