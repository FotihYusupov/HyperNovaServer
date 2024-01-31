import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('json')
export class TranslationController {
  constructor(private readonly jsonService: TranslationService) {}

  @Get(':lang')
  async getTranslations(
    @Param('lang')
    lang: string,
  ): Promise<any> {
    return this.jsonService.getTranslations(lang);
  }

  @Post('add-columns/:lang')
  async addColumnsToAllJSON(
    @Body()
    requestPayload: any,
    @Param('lang')
    lang: string,
  ): Promise<string> {
    try {
      this.jsonService.addColumnsToJson(lang, requestPayload);
      return 'File has been written successfully.';
    } catch (error) {
      throw new Error('Failed to add columns to JSON files.');
    }
  }
}
