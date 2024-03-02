import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation } from './schemas/translation.schemas';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel(Translation.name)
    private readonly translationModel: Model<Translation>,
  ) {}

  async create(message: string, lang: string, text: any): Promise<any> {
    const findMessage = await this.translationModel.findOne({
      message: message,
    });
    if (!findMessage) {
      const createdTranslation = new this.translationModel({
        message: message,
      });
      createdTranslation[lang] = text;
      return createdTranslation.save();
    }
    if (findMessage) {
      findMessage[lang] = text;
      await findMessage.save();
      return findMessage;
    }
    return 'Error';
  }

  async findAll(): Promise<object> {
    const translations = await this.translationModel.find();
    return {
      data: translations.map((translation) => ({
        id: translation._id,
        message: translation.message,
        uz: translation.uz ? translation.uz : null,
        ru: translation.ru ? translation.ru : null,
        en: translation.en ? translation.en : null,
        kr: translation.kr ? translation.kr : null,
      })),
    };
  }

  async findByLang(lang: string): Promise<any> {
    const translations = await this.translationModel.find();
    const obj = {};
    const result = [];
    translations.forEach((translation) => {
      obj[translation.message] = translation[lang] || null;
    });
    result.push(obj);
    return result[0];
  }

  async search(message: string): Promise<Translation[]> {
    const regex = new RegExp(message, 'i');
    const translations = await this.translationModel.find({
      message: { $regex: regex },
    });
    return translations.map((translation) => ({
      id: translation._id,
      message: translation.message,
      uz: translation.uz ? translation.uz : null,
      ru: translation.ru ? translation.ru : null,
      en: translation.en ? translation.en : null,
      kr: translation.kr ? translation.kr : null,
    }));
  }

  async update(id: string, key: string, translation: string): Promise<any> {
    const findTranslation = await this.translationModel.findById(id);
    if (!findTranslation) {
      throw new Error('Translation not found');
    }
    findTranslation[key] = translation
    await findTranslation.save();
    return findTranslation;
  }
}
