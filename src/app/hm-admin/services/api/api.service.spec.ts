import {
  it,
  describe,
  expect,
  inject,
  async,
  fakeAsync,
  beforeEachProviders,
  beforeEach,
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
import 'rxjs/add/operator/filter';
import {APIService} from './api.service';
import {ConfigService} from '../config/Config.service';
import {SchemaService} from '../schema/schema.service';
import {PagedCollection} from '../models/PagedCollection';
import {EntryPoint} from '../models/EntryPoint';


  describe('API service', () => {
    let apiService: APIService,
      configService: ConfigService,
      schemaService: SchemaService,
      mockBackend: MockBackend;

    beforeEachProviders(() => {
      return [
        BaseRequestOptions,
        MockBackend,
        APIService,
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

    beforeEach(
      inject(
        [APIService, SchemaService, ConfigService, MockBackend],
        fakeAsync((ApiService, SchemaService, ConfigService, MockBackend) => {
          apiService = ApiService;
          schemaService = SchemaService;
          configService = ConfigService;
          mockBackend = MockBackend;
        })
      )
    );

    describe('getCollectionByUrl', () => {

      it('should load api definition', inject([APIService, MockBackend],
        fakeAsync((apiService, mockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://localhost:8000/people');
          let response = new ResponseOptions({
            body: {
              '@context': '/contexts/Person',
              '@id': '/people',
              '@type': 'hydra:PagedCollection',
              'hydra:totalItems': 2,
              'hydra:itemsPerPage': 30,
              'hydra:firstPage': '/people',
              'hydra:lastPage': '/people',
              'hydra:member': [
                {
                  '@id': '/people/1',
                  '@type': 'http://schema.org/Person',
                  'familyName': 'Doe'
                },
                {
                  '@id': '/people/2',
                  '@type': 'http://schema.org/Person',
                  'familyName': 'Norris'
                }
              ]
            }
          });
          c.mockRespond(new Response(response));
        });

        let query$ = apiService.getCollectionByUrl('http://localhost:8000/people');
        tick();

        query$.subscribe(collection => {
          expect(collection instanceof PagedCollection).toBeTruthy();
          expect(collection.members.length).toBe(2);
        });

      })));

      it('should throw Error if API is unreachable', () => {
        mockBackend.connections.subscribe(c => {
          c.mockError();
        });

        expect(() => apiService.getCollectionByUrl('')).toThrow();
      });

    });

    describe('getCollection', () => {

      beforeEach(() => {
        spyOn(apiService, 'getCollectionByUrl');

        let entrypoint = new EntryPoint('person');
        entrypoint.url = '/people';
        apiService.entrypoints = [
          entrypoint
        ];
      });

      it('should call API to get collection of a known model', () => {
        apiService.getCollection('person');

        expect(apiService.getCollectionByUrl).toHaveBeenCalled();
        expect(apiService.getCollectionByUrl).toHaveBeenCalledWith('http://localhost:8000/people');
      });

      it('should not call API if model is unknown', () => {
        expect(() => apiService.getCollection()).toThrow();
        expect(apiService.getCollectionByUrl).not.toHaveBeenCalled();
      });

    });

  });

