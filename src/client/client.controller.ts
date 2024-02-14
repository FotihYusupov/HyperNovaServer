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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getClient(): Promise<object> {
    return this.clientService.getClient();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createClient(
    @Body() portfolioDto: CreateClientDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.clientService.createClient(portfolioDto, image);
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateClient(
    @Param('id')
    id: string,
    @Body() portfolioDto: CreateClientDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.clientService.updateClient(id, portfolioDto, image);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteClient(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.clientService.deleteClient(id);
  }
}
