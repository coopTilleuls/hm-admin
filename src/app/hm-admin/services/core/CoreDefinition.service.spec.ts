import {it, describe, expect, inject, beforeEach, beforeEachProviders, async} from '@angular/core/testing';
import {BaseRequestOptions, Http, ResponseOptions, Response} from '@angular/http';
import {provide} from '@angular/core';
import {MockBackend} from '@angular/http/testing';
import {CoreDefinitionService} from './CoreDefinition.service';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import {ConfigService} from '../config/Config.service';

describe('Core Definition Service', () => {

  beforeEachProviders(() => {
    return [
      CoreDefinitionService,
      provide(ConfigService, {
        useValue: {
          api: {
            definitionUrl: 'http://localhost:8001'
          }
        }
      }),
    ];
  });

  describe('loadDefinitions', () => {

    it('should ask for definitions', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({}));

      cds.loadDefinitions();

      expect(cds.getDefinitions).toHaveBeenCalled();
    }));

    it('should store definitions to local storage', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({}));
      spyOn(localStorage, 'setItem');

      cds.loadDefinitions();

      expect(localStorage.setItem).toHaveBeenCalledWith('definitions', '{}');
    }));

    it('should dispatch definitions', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({
        'required': 'hydra:required'
      }));

      cds.loadDefinitions();

      cds.definitions.subscribe(definitions => {
        expect(definitions.required).toEqual('hydra:required');
      });
    }));

    it('should accept string as definition', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({
        'required': 'hydra:required'
      }));
      spyOn(cds, 'add');

      cds.loadDefinitions();

      expect(cds.add).toHaveBeenCalledWith('required', 'hydra:required', {});
    }));

    it('should accept object with @id as definition', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({
        'property': {
          '@id': 'hydra:property'
        }
      }));
      spyOn(cds, 'add');

      cds.loadDefinitions();

      expect(cds.add).toHaveBeenCalledWith('property', 'hydra:property', {});
    }));

    it('should reject object without @id as definition', inject([CoreDefinitionService], (cds) => {
      spyOn(cds, 'getDefinitions').and.returnValue(Observable.of({
        'cc:license': {
          '@type': '@id'
        }
      }));
      spyOn(cds, 'add');

      cds.loadDefinitions();

      expect(cds.add).not.toHaveBeenCalled();
    }));

  });
  
  describe('getDefinitions', () => {

    beforeEachProviders(() => {
      return [
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
          useFactory: (backend, defaultOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        })
      ];
    });


    it('should dispatch local storage definitions', inject([CoreDefinitionService], (cds) => {
      spyOn(localStorage, 'getItem').and.returnValue('{"property":"hydra:property"}');

      const obs = cds.getDefinitions();

      expect(localStorage.getItem).toHaveBeenCalled();
      obs.subscribe(definitions => {
        expect(definitions.property).toEqual('hydra:property');
      })
    }));

    it('should dispatch context api definitions', async(inject([CoreDefinitionService, MockBackend, ConfigService], (cds, api, config) => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      api.connections.subscribe(c => {
        expect(c.request.url).toBe('http://localhost:8001');
        let response = new ResponseOptions({
          body: {
            '@context': {
              'property': 'hydra:property'
            },
            'fakeValue': 'hydra:fakeValue'
          }
        });
        c.mockRespond(new Response(response));
      });

      const obs = cds.getDefinitions();

      obs.subscribe(definitions => {
        expect(definitions.property).toEqual('hydra:property');
        expect(definitions.fakeValue).toBeUndefined();
      })
    })));

  });

  describe('add', () => {

    let definitions: any;

    beforeEach(() => {
      definitions = {};
    });

    it('should define an enumerable property', inject([CoreDefinitionService], (cds)  => {
      cds.add('property', 'hydra:property', definitions);

      expect(definitions.property).toEqual('hydra:property');
      expect(definitions.propertyIsEnumerable('property')).toBeTruthy();
    }));

    it('should define an unwritable property', inject([CoreDefinitionService], (cds)  => {
      cds.add('property', 'hydra:property', definitions);

      expect(() => {
        definitions.property = 'custom:property';
      }).toThrow();
    }));

  });

});
