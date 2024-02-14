import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { Team } from './schemas/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
  ) {}

  async getAll(): Promise<Team[]> {
    const team = await this.teamModel.find();
    return team;
  }

  async createTeam(
    teamDto: CreateTeamDto,
    file: File & { buffer: Buffer; originalname: string },
  ): Promise<object> {
    const { originalname, buffer } = file;
    const imagePath = `./uploads/${originalname}`;
    fs.writeFileSync(imagePath, buffer);
    const data = {
      position: teamDto.position,
      level: teamDto.level,
      tools: teamDto.tools,
      photoLink: `${process.env.URL}${originalname}`,
    };
    const team = await this.teamModel.create(data);
    return team;
  }

  async updateTeam(
    id: string,
    teamDto: CreateTeamDto,
    file: File & { buffer: Buffer; originalname: string },
  ): Promise<object> {
    if (file) {
      const { originalname, buffer } = file;
      const imagePath = `./uploads/${originalname}`;
      fs.writeFileSync(imagePath, buffer);
      const data = {
        position: teamDto.position,
        level: teamDto.level,
        tools: teamDto.tools,
        photoLink: `${process.env.URL}${originalname}`,
      };
      const team = await this.teamModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return team;
    }
    const data = {
      position: teamDto.position,
      level: teamDto.level,
      tools: teamDto.tools,
    };
    const team = await this.teamModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return team;
  }

  async deleteTeam(id: string): Promise<string> {
    await this.teamModel.findByIdAndDelete(id);
    return 'Team deleted';
  }
}
