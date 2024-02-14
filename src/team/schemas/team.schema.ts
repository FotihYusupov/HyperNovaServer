import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Team {
  @Prop()
  position: string;

  @Prop()
  photoLink: string;

  @Prop()
  level: string;

  @Prop()
  tools: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
