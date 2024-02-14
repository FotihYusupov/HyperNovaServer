import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import { Portfolio } from './schemas/portfolio.schema';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<Portfolio>,
  ) {}

  async getPortfolio(): Promise<object> {
    const portfolio = await this.portfolioModel.find();
    return portfolio;
  }

  async createPortfolio(
    portfolioDto: CreatePortfolioDto,
    file: File & { buffer: Buffer; originalname: string },
  ): Promise<object> {
    const { originalname, buffer } = file;
    const imagePath = `./uploads/${originalname}`;
    fs.writeFileSync(imagePath, buffer);
    const data = {
      title: portfolioDto.title,
      link: portfolioDto.link,
      photoLink: `${process.env.URL}${originalname}`,
    };
    const portfolio = await this.portfolioModel.create(data);
    return portfolio;
  }

  async updatePortfolio(
    id: string,
    portfolioDto: CreatePortfolioDto,
    file: File & { buffer: Buffer; originalname: string },
  ): Promise<object> {
    if (file) {
      const { originalname, buffer } = file;
      const imagePath = `./uploads/${originalname}`;
      fs.writeFileSync(imagePath, buffer);
      const data = {
        title: portfolioDto.title,
        link: portfolioDto.link,
        photoLink: `${process.env.URL}${originalname}`,
      };
      const portfolio = await this.portfolioModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return portfolio;
    }
    const data = {
      title: portfolioDto.title,
      link: portfolioDto.link,
    };
    const portfolio = await this.portfolioModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return portfolio;
  }

  async deletePortfolio(id: string): Promise<string> {
    await this.portfolioModel.findByIdAndDelete(id);
    return 'Portfolio deleted';
  }
}
