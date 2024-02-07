import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class TranslationService {
  async getAllTranslations(): Promise<any> {
    const languages = ['uz', 'kr', 'en', 'ru'];
    const translations = {};
    try {
      for (const lang of languages) {
        const file = join(process.cwd(), `/locales/${lang}.json`);
        const data = await fs.readFile(file, 'utf8');
        translations[lang] = JSON.parse(data);
      }
      return translations;
    } catch (err) {
      throw new Error(`Error reading translation files: ${err.message}`);
    }
  }

  async getTranslations(lang: string): Promise<any> {
    const file = join(process.cwd(), `/locales/${lang}.json`);
    try {
      const data = await fs.readFile(file, 'utf8');
      return data;
    } catch (err) {
      throw new Error(`Error reading file ${lang}.json: ${err.message}`);
    }
  }

  async addColumnsToJson(lang: string, requestPayload: any): Promise<any> {
    const file = join(process.cwd(), `locales/${lang}.json`);
    const data = readFile(file, 'utf8', (err, data) => {
      if (err) {
        return `Error reading file ${lang}.json`;
      }
      const jsonData = JSON.parse(data);
      jsonData[Object.keys(requestPayload)[0]] =
        Object.values(requestPayload)[0];
      writeFile(file, JSON.stringify(jsonData), (err) => {
        if (err) {
          return 'Error writing to file:';
        } else {
          return 'File has been written successfully.';
        }
      });
    });
    return data;
  }
}
