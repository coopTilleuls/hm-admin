import {it, describe, expect, inject, beforeEachProviders} from '@angular/core/testing';
import {ConfigService} from './config.service';

export function main() {
  describe('Config service', () => {

    beforeEachProviders(() => { return [ConfigService]; });

    describe('hookMeIfYouCan', () => {

      it('should be hookable with available values', inject([ConfigService], (configService) => {
           let defaultConfig = {
             api: {
              baseUrl: 'http://localhost:8000'
              },
              nonAvailableHook: 'foo'
           };

           configService.hookMeIfYouCan(defaultConfig);
           expect(configService.api.url).toBe('http://localhost:8000');
           expect(configService['nonAvailableHook']).toBeUndefined();
         }));

    });
  });
};
