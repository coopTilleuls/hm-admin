import {it, describe, expect, inject, beforeEachProviders} from '@angular/core/testing';
import {ConfigService} from './Config.service';

describe('Config service', () => {

  beforeEachProviders(() => ConfigService);

  describe('hookMeIfYouCan', () => {

    it('should be hookable with available values', inject([ConfigService], (configService) => {
      let defaultConfig = {
        api: {
          baseUrl: 'http://localhost:8000'
        },
        nonAvailableHook: 'foo'
      };

      configService.hookMeIfYouCan(defaultConfig);
      expect(configService.api.baseUrl).toBe('http://localhost:8000');
      expect(configService['nonAvailableHook']).toBeUndefined();
    }));

  });
});
