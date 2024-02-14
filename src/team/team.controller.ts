import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getTeam(): Promise<object> {
    return this.teamService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createTeam(
    @Body() teamDto: CreateTeamDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.teamService.createTeam(teamDto, image);
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateTeam(
    @Param('id')
    id: string,
    @Body() teamDto: CreateTeamDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.teamService.updateTeam(id, teamDto, image);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteTeam(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.teamService.deleteTeam(id);
  }
}
