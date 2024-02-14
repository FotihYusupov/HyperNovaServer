import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Client {
  @Prop()
  title: string;

  @Prop()
  photoLink: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
