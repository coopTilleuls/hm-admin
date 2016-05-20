import {it, describe, expect, inject, beforeEachProviders} from '@angular/core/testing';
import {CoreDefinitionService} from './CoreDefinition.service';

export function main() {
  describe('Core Definition Service', () => {

    beforeEachProviders(() => { return [CoreDefinitionService]; });

    describe('getCoreDefinition', () => {

      it('should return an Observable with definition and write to LocalStorage', inject(
        [CoreDefinitionService], (coreDefinitionService) => {
          let definition;
          let defaultConfig = {
            api: {
              baseUrl: 'http://localhost:8000',
              definitionUrl: 'https://www.w3.org/ns/hydra/core'
            },
            nonAvailableHook: 'foo'
          };
          definition = coreDefinitionService.getCoreDefinition(defaultConfig.api.definitionUrl);
          expect(definition.title).toBe('hydra:title');
        }));

    });
    describe('Get from localStorage with valide localstorahe', () => {

      it('should return an object with definition', inject(
        [CoreDefinitionService], (coreDefinitionService) => {
          let definition;
          let defaultConfig = {
            api: {
              baseUrl: 'http://localhost:8000',
              definitionUrl: 'https://www.w3.org/ns/hydra/core'
            },
            nonAvailableHook: 'foo'
          };
          coreDefinitionService.getCoreDefinition(defaultConfig.api.definitionUrl);
          definition = coreDefinitionService.getCacheCoreDefinition();
          expect(definition.title).toBe('hydra:title');
        }));

    });
    describe('Get from localStorage with wrong localstorage', () => {

      it('should return an object with definition', inject(
        [CoreDefinitionService], (coreDefinitionService) => {
          let definition;
          definition = coreDefinitionService.getCacheCoreDefinition();
          expect(definition.title).toBeUndefined();
        }));

    });
  });
}
