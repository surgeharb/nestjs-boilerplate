import * as dotenv from 'dotenv';
import * as fs from 'fs';

import TRANSLATIONS from './strings';
import { join } from 'path';

export class ConfigService {
  private readonly DEFAULT_MESSAGE = 'MESSAGE';
  private readonly envConfig: { [key: string]: string };

  private readonly toArabicNumber =
    (num: string) => String.fromCharCode(num.charCodeAt(0) + 1584)

  private readonly modifyNumbers =
    (str: string) => str.replace(/\d/g, this.toArabicNumber)

  /** Float Decimal Digits Limit */
  public readonly decimalDigits = 2;

  constructor() {
    const envConfig = dotenv.parse(fs.readFileSync('.env'));
    process.env.DEV_DBHOST = envConfig.DEV_DBHOST;
    process.env.NODE_ENV = envConfig.NODE_ENV;

    const TO_ROOT = '../../../';
    const ENV_PATH = join(__dirname, TO_ROOT, `config/env/${process.env.NODE_ENV}.env`);

    this.envConfig = dotenv.config({ path: ENV_PATH }).parsed || {};

    // Development Local Computer Testing -> Connection to Dev Database
    if (process.env.DEV_DBHOST && process.env.DEV_DBHOST !== 'undefined' && process.env.NODE_ENV === 'development') {
      this.envConfig.MONGODB_URI = this.envConfig.MONGODB_URI.replace('localhost', envConfig.DEV_DBHOST);
    }
  }

  public isProduction() {
    return (process.env.NODE_ENV === 'production');
  }

  public getEnv(key: string): string {
    return this.envConfig[key];
  }

  public translate(identifier: string, lang: string = 'en', params?: any): string {
    if (TRANSLATIONS[identifier]) {
      if (typeof params === 'string' || typeof params === 'number') {
        params = [params];
      } else if (!Array.isArray(params)) {
        params = [];
      }

      // Fill parameters array in string
      let result = TRANSLATIONS[identifier][lang] || this.DEFAULT_MESSAGE;

      params.forEach((param: any, index: number) => {
        result = result.replace(`\${${index + 1}}`, param);
      });

      if (lang === 'ar') {
        // using _x_x_ in place of # because '#' character do not work to match the hex number
        const ignoreHex = /\b(?!_x_x_(?=([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})))\b\S+/g;
        result = result.replace('#', '_x_x_').replace(ignoreHex, this.modifyNumbers).replace('_x_x_', '#');
      }

      return result;
    }

    return this.DEFAULT_MESSAGE;
  }
}
