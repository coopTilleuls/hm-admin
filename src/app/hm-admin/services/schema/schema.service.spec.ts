import {
  it,
  describe,
  expect,
  inject,
  async,
  fakeAsync,
  beforeEachProviders,
  tick
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';
import {ConfigService} from '../config/Config.service';
import {SchemaService} from './schema.service';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/filter';
import {EntryPoint} from '../models/EntryPoint';


  describe('Schema service', () => {

    beforeEachProviders(() => {
      return [
        BaseRequestOptions,
        MockBackend,
        SchemaService,
        provide(ConfigService, {
          useValue: {
            api: {
              url: 'http://localhost:8000'
            }
          }
        }),
        provide(Http, {
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        })
      ];
    });


    describe('#constructor', () => {

      it('should init schema observable', inject([SchemaService], (schemaService) => {
        schemaService.schema.subscribe(schema => {
          expect(schema).toBeNull();
        });
      }));

      it('should init entrypoints observable', inject([SchemaService], (schemaService) => {
        schemaService.entrypoints.subscribe(schema => {
          expect(Array.isArray(schema)).toBeTruthy();
          expect(schema.length).toBe(0);
        });
      }));

    });

    describe('load', () => {

      it('should load api definition', inject([SchemaService], (schemaService) => {
        spyOn(schemaService, 'loadRoot');
        spyOn(schemaService, 'loadDocumentation');

        schemaService.load();

        expect(schemaService.loadRoot).toHaveBeenCalled();
        expect(schemaService.loadDocumentation).toHaveBeenCalled();
      }));

    });

    describe('loadRoot', () => {

      it('should load api definition', async(inject([SchemaService, MockBackend],
        (schemaService, mockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://localhost:8000');
          let response = new ResponseOptions({
            body: {
              '@context': '/contexts/Entrypoint',
              '@id': '/',
              '@type': 'Entrypoint',
              'person': '/people',
              'blogPosting': '/blog_postings'
            }
          });
          c.mockRespond(new Response(response));
        });

        schemaService.entrypoints
          .filter(entrypoints => 0 < entrypoints.length)
          .subscribe(entrypoints => {
            expect(entrypoints.length).toBe(2);
            expect(entrypoints[0] instanceof EntryPoint).toBeTruthy();
          });

        schemaService.loadRoot();
      })));

      it('should throw Error if API is unreachable', async(inject([SchemaService, MockBackend],
        (schemaService, mockBackend) => {
        mockBackend.connections.subscribe(c => {
          c.mockError();
        });

        expect(() => schemaService.loadRoot()).toThrow();
      })));

    });

    describe('loadDocumentation', () => {

      it('should load operations and schema', inject([SchemaService, MockBackend],
        fakeAsync((schemaService, mockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://localhost:8000/apidoc');
          let response = new ResponseOptions({
            body: {
              'hydra:title': 'Hydra API Test',
              'hydra:supportedClass': [
                {'@id': 'http://schema.org/Person'},
                {'@id': 'http://schema.org/BlogPosting'},
                {'@id': '#Entrypoint'},
                {'@id': '#ConstraintViolation'},
                {'@id': '#ConstraintViolationList'}
              ]
            }
          });
          c.mockRespond(new Response(response));
        });

        spyOn(schemaService, 'loadCollectionOperations');
        spyOn(schemaService, 'loadSingleOperations');
        spyOn(schemaService, 'loadSchema');

        schemaService.loadDocumentation();
        tick();

        expect(schemaService.loadCollectionOperations).toHaveBeenCalled();
        expect(schemaService.loadSingleOperations).toHaveBeenCalled();
        expect(schemaService.loadSchema).toHaveBeenCalled();
      })));

      it('should throw Error if API is unreachable', async(inject([SchemaService, MockBackend],
        (schemaService, mockBackend) => {
        mockBackend.connections.subscribe(c => {
          c.mockError();
        });

        expect(() => schemaService.loadDocumentation()).toThrow();
      })));
    });

    describe('loadCollectionOperations', () => {

      it('should load collection operations for each entrypoint', async(inject([SchemaService],
        (schemaService) => {
        let index = 0;
        schemaService.entrypoints
          .filter(entrypoints => 0 < entrypoints.length)
          .subscribe(entrypoints => {
            if (2 === ++index) {
              expect(entrypoints.length).toBe(2);
              expect(entrypoints[0] instanceof EntryPoint).toBeTruthy();
              expect(entrypoints[0].operations).toContain('GET');
              expect(entrypoints[0].operations).not.toContain('POST');
              expect(entrypoints[1] instanceof EntryPoint).toBeTruthy();
              expect(entrypoints[1].operations).toContain('GET');
              expect(entrypoints[1].operations).toContain('POST');
            }
          });

        let observable = new BehaviorSubject({
          '@id': '#Entrypoint',
          'hydra:supportedProperty': [
            {
              'hydra:property': {
                '@id': '#Entrypoint/person',
                'hydra:supportedOperation': [{'hydra:method': 'GET'}]
              }
            },
            {
              'hydra:property': {
                '@id': '#Entrypoint/BlogPosting',
                'hydra:supportedOperation': [{'hydra:method': 'GET'}, {'hydra:method': 'POST'}]
              }
            }
          ]
        });
        schemaService.loadCollectionOperations(observable);
      })));

    });

    describe('loadSingleOperations', () => {

      it('should load single operations for each entrypoint',  async(inject([SchemaService],
        (schemaService) => {
        schemaService.entrypoints
          .filter(entrypoints => 0 < entrypoints.length)
          .subscribe(entrypoints => {
            expect(entrypoints.length).toBe(1);
            expect(entrypoints[0] instanceof EntryPoint).toBeTruthy();
            expect(entrypoints[0].operations).toContain('GET');
            expect(entrypoints[0].operations).toContain('POST');
            expect(entrypoints[0].operations).toContain('DELETE');
          });

        let observable = new BehaviorSubject({
          'hydra:title': 'Person',
          'hydra:supportedOperation':
            [
            { 'hydra:method': 'GET'},
            { 'hydra:method': 'POST'},
            { 'hydra:method': 'DELETE'}
          ]
        });
        schemaService.loadSingleOperations(observable);
      })));

    });

    describe('loadSchema', () => {

      it('should load title and models',  async(inject([SchemaService],
        (schemaService) => {
        schemaService.schema
          .filter(schema => null !== schema)
          .subscribe(schema => {
            expect(schema.title).toBeUndefined();
            expect(schema.models).toBeDefined();
            expect(Array.isArray(schema.models)).toBeTruthy();
          });

        let observable = new BehaviorSubject({});
        schemaService.loadSchema(observable);
      })));

    });
  });

