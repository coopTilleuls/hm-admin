import {it, describe, expect, beforeEach} from '@angular/core/testing';
import {schemaHelper} from './schemaHelper';
import {Model} from '../services/models/Model';

  describe('Schema title Helper', () => {

    describe('.getSchemaTitle', () => {

      it('should get title from hydra format title', () => {
        expect(schemaHelper.getSchemaTitle({'hydra:title': 'My first API'},
          {'title': 'hydra:title'})).toBe('My first API');
      });

      it('should not get title from other format title', () => {
        expect(schemaHelper.getSchemaTitle(
          {'title': 'My first API'},
          {'title': 'hydra:title'})).toBeUndefined();
      });

    });

    describe('.populateModels', () => {

      beforeEach(() => {
        spyOn(schemaHelper, 'populateModel').and.returnValue(new Model());
        spyOn(schemaHelper, 'cleanModelsList').and.callFake(datas => datas);
      });

      it('should populate with model', () => {
        let results = schemaHelper.populateModels({'hydra:supportedClass' : ['Person', 'Blog Posting']},
          {'supportedClass': 'hydra:supportedClass'});
        expect(schemaHelper.populateModel).toHaveBeenCalled();
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBe(2);
        expect(results[0] instanceof Model).toBeTruthy();
      });

    });

    describe('.populateModel', () => {

      it('should return a model', () => {
        expect(schemaHelper.populateModel() instanceof Model).toBeTruthy();
      });

    });

    describe('.cleanModelsList', () => {

      it('should reject non array parameter', () => {
        expect(schemaHelper.cleanModelsList(undefined)).toBe(null);
      });

      it('should remove the last three entry of the array', () => {
        const jsonApiPlatform = [{
          'hydra:supportedClass': [
            {
              '@id': 'http://schema.org/Person',
              '@type': 'hydra:Class',
              'rdfs:label': 'Person',
              'hydra:title': 'Person',
              'hydra:description': 'A person (alive, dead, undead, or fictional).',
              'hydra:supportedProperty': [
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': 'https://schema.org/name',
                    '@type': 'rdf:Property',
                    'rdfs:label': 'name',
                    'domain': 'http://schema.org/Person',
                    'range': 'xmls:string'
                  },
                  'hydra:title': 'name',
                  'hydra:required': false,
                  'hydra:readable': true,
                  'hydra:writable': true,
                  'hydra:description': 'The name of the item.'
                }
              ],
              'hydra:supportedOperation': [
                {
                  '@type': 'hydra:Operation',
                  'hydra:method': 'GET',
                  'hydra:title': 'Retrieves Person resource.',
                  'rdfs:label': 'Retrieves Person resource.',
                  'returns': 'http://schema.org/Person'
                },
                {
                  '@type': 'hydra:ReplaceResourceOperation',
                  'expects': 'http://schema.org/Person',
                  'hydra:method': 'PUT',
                  'hydra:title': 'Replaces the Person resource.',
                  'rdfs:label': 'Replaces the Person resource.',
                  'returns': 'http://schema.org/Person'
                },
                {
                  '@type': 'hydra:Operation',
                  'hydra:method': 'DELETE',
                  'hydra:title': 'Deletes the Person resource.',
                  'rdfs:label': 'Deletes the Person resource.',
                  'returns': 'owl:Nothing'
                }
              ]
            },
            {
              '@id': '#Entrypoint',
              '@type': 'hydra:Class',
              'hydra:title': 'The API entrypoint',
              'hydra:supportedProperty': [
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': '#Entrypoint/blogPosting',
                    '@type': 'hydra:Link',
                    'domain': '#Entrypoint',
                    'rdfs:label': 'The collection of BlogPosting resources',
                    'range': 'hydra:PagedCollection',
                    'hydra:supportedOperation': [
                      {
                        '@type': 'hydra:Operation',
                        'hydra:method': 'GET',
                        'hydra:title': 'Retrieves the collection of BlogPosting resources.',
                        'rdfs:label': 'Retrieves the collection of BlogPosting resources.',
                        'returns': 'hydra:PagedCollection'
                      },
                      {
                        '@type': 'hydra:CreateResourceOperation',
                        'expects': 'http://schema.org/BlogPosting',
                        'hydra:method': 'POST',
                        'hydra:title': 'Creates a BlogPosting resource.',
                        'rdfs:label': 'Creates a BlogPosting resource.',
                        'returns': 'http://schema.org/BlogPosting'
                      }
                    ]
                  },
                  'hydra:title': 'The collection of BlogPosting resources',
                  'hydra:readable': true,
                  'hydra:writable': false
                },
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': '#Entrypoint/person',
                    '@type': 'hydra:Link',
                    'domain': '#Entrypoint',
                    'rdfs:label': 'The collection of Person resources',
                    'range': 'hydra:PagedCollection',
                    'hydra:supportedOperation': [
                      {
                        '@type': 'hydra:Operation',
                        'hydra:method': 'GET',
                        'hydra:title': 'Retrieves the collection of Person resources.',
                        'rdfs:label': 'Retrieves the collection of Person resources.',
                        'returns': 'hydra:PagedCollection'
                      },
                      {
                        '@type': 'hydra:CreateResourceOperation',
                        'expects': 'http://schema.org/Person',
                        'hydra:method': 'POST',
                        'hydra:title': 'Creates a Person resource.',
                        'rdfs:label': 'Creates a Person resource.',
                        'returns': 'http://schema.org/Person'
                      }
                    ]
                  },
                  'hydra:title': 'The collection of Person resources',
                  'hydra:readable': true,
                  'hydra:writable': false
                }
              ],
              'hydra:supportedOperation': {
                '@type': 'hydra:Operation',
                'hydra:method': 'GET',
                'rdfs:label': 'The API entrypoint.',
                'returns': '#EntryPoint'
              }
            },
            {
              '@id': '#ConstraintViolation',
              '@type': 'hydra:Class',
              'hydra:title': 'A constraint violation',
              'hydra:supportedProperty': [
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': '#ConstraintViolation/propertyPath',
                    '@type': 'rdf:Property',
                    'rdfs:label': 'propertyPath',
                    'domain': '#ConstraintViolation',
                    'range': 'xmls:string'
                  },
                  'hydra:title': 'propertyPath',
                  'hydra:description': 'The property path of the violation',
                  'hydra:readable': true,
                  'hydra:writable': false
                },
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': '#ConstraintViolation/message',
                    '@type': 'rdf:Property',
                    'rdfs:label': 'message',
                    'domain': '#ConstraintViolation',
                    'range': 'xmls:string'
                  },
                  'hydra:title': 'message',
                  'hydra:description': 'The message associated with the violation',
                  'hydra:readable': true,
                  'hydra:writable': false
                }
              ]
            },
            {
              '@id': '#ConstraintViolationList',
              '@type': 'hydra:Class',
              'subClassOf': 'hydra:Error',
              'hydra:title': 'A constraint violation list',
              'hydra:supportedProperty': [
                {
                  '@type': 'hydra:SupportedProperty',
                  'hydra:property': {
                    '@id': '#ConstraintViolationList/violation',
                    '@type': 'rdf:Property',
                    'rdfs:label': 'violation',
                    'domain': '#ConstraintViolationList',
                    'range': '#ConstraintViolation'
                  },
                  'hydra:title': 'violation',
                  'hydra:description': 'The violations',
                  'hydra:readable': true,
                  'hydra:writable': false
                }
              ]
            }
          ]
        }];

        expect(schemaHelper.cleanModelsList(jsonApiPlatform[0]['hydra:supportedClass'])[0]['@id']).toContain('http://schema.org/Person');
      });

    });
  });

