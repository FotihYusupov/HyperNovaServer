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
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getPortfolio(): Promise<object> {
    return this.portfolioService.getPortfolio();
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createPortfolio(
    @Body() portfolioDto: CreatePortfolioDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.portfolioService.createPortfolio(portfolioDto, image);
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updatePortfolio(
    @Param('id')
    id: string,
    @Body() portfolioDto: CreatePortfolioDto,
    @UploadedFile() image: any,
  ): Promise<object> {
    return this.portfolioService.updatePortfolio(id, portfolioDto, image);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deletePortfolio(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.portfolioService.deletePortfolio(id);
  }
}
