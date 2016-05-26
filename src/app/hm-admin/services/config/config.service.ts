import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  api: any = {};

  /**
   * Complete the default configuration with external one
   *
   * @param config
   * @private
   */
  hookMeIfYouCan(config: any): void {
    for (let key in config) {
      if (config.hasOwnProperty(key) && this.hasOwnProperty(key)) {
        this[key] = config[key];
      }
    }
  }
};
