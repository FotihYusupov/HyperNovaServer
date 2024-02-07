import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class TranslationService {
  async getAllTranslations(): Promise<any[]> {
    const languages = ['uz', 'ru', 'en', 'kr']; // Language codes
    const directory = join(process.cwd(), '/locales');
    try {
      const translations = [];

      // Read translations from all JSON files
      const translationData = await Promise.all(
        languages.map(async (lang) => {
          const filePath = join(directory, `${lang}.json`);
          const data = await fs.readFile(filePath, 'utf8');
          return { language: lang, data: JSON.parse(data) };
        }),
      );

      // Get all unique keys across different JSON files
      const keys = [
        ...new Set(translationData.flatMap((entry) => Object.keys(entry.data))),
      ];

      // Construct translations for each key across different languages
      for (const key of keys) {
        const translationObject = { message: key };

        for (const translation of translationData) {
          const translationValue = translation.data[key];
          translationObject[translation.language] =
            translationValue !== undefined ? translationValue : null;
        }

        translations.push(translationObject);
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
