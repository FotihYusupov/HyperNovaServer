import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { Translation } from './schemas/translation.schemas';

@Controller('translations')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post(':lang')
  create(
    @Param('lang') lang: string,
    @Body() translation: any,
  ): Promise<Translation> {
    return this.translationService.create(
      Object.keys(translation)[0],
      lang,
      Object.values(translation)[0],
    );
  }

  @Get()
  findAll(): Promise<Translation[]> {
    return this.translationService.findAll();
  }

  @Get('search/:message')
  search(@Param('message') message: string): Promise<Translation[]> {
    return this.translationService.search(message);
  }

  @Get(':lang')
  findById(@Param('lang') lang: string): Promise<Translation> {
    return this.translationService.findByLang(lang);
  }

  @Put('update')
  update(@Body() translation: Partial<any>): Promise<Translation> {
    return this.translationService.update(
      translation.id,
      translation.lang,
      translation.translation,
    );
  }
}
