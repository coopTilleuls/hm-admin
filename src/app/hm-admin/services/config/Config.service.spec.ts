import { it, describe, expect, inject, beforeEach, beforeEachProviders } from '@angular/core/testing';
import { ConfigService } from './Config.service';

describe('Config service', () => {

  beforeEachProviders(() => ConfigService);

  describe('setConfiguration', () => {

    it('should be hookable with available values', inject([ConfigService], (configService) => {
      let defaultConfig = {
        api: {
          baseUrl: 'http://localhost:8000'
        }
      };

      configService.setConfiguration(defaultConfig);
      expect(configService.api.baseUrl).toBe('http://localhost:8000');
    }));

  });

  describe('getRecursive', () => {

    let config: any;

    beforeEach(() => {
      config = {
        api: {
          baseUrl: 'http://localhost:8000'
        }
      };
    });

    it('should find value by parsing configuration key by key', inject([ConfigService], (configService) => {
      expect(configService.getRecursive(['api', 'baseUrl'], config)).toEqual('http://localhost:8000');
    }));

    it('should send null when nothing is found', inject([ConfigService], (configService) => {
      expect(configService.getRecursive(null, config)).toBe(null);
      expect(configService.getRecursive([], config)).toBe(null);
      expect(configService.getRecursive(['apis', 'baseUrl'], config)).toBe(null);
    }));

  });

  describe('get', () => {

    it('should ask for configuration parsing', inject([ConfigService], (configService) => {
      spyOn(configService, 'getRecursive').and.returnValue('http://localhost:8000');

      let result = configService.get('api.baseUrl');

      expect(configService.getRecursive).toHaveBeenCalledWith(['api', 'baseUrl']);
      expect(result).toEqual('http://localhost:8000');
    }));

    it('should return null by default', inject([ConfigService], (configService) => {
      spyOn(configService, 'getRecursive');

      let result = configService.get();

      expect(configService.getRecursive).not.toHaveBeenCalled();
      expect(result).toBe(null);
    }));

  });

});
