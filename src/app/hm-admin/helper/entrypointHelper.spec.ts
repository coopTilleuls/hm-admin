import {it, describe, expect, beforeEach} from '@angular/core/testing';
import {COLLECTION_METHOD, entrypointHelper} from './entrypointHelper';
import {EntryPoint} from '../services/models/EntryPoint';



  describe('Entrypoint Helper', () => {

    describe('.filterEntryPoints', () => {

      it('should omit @context entry', () => {
        let results = entrypointHelper.filterEntryPoints({
          '@context': '/contexts/Entrypoint',
          'person': '/people'
        });
        expect(Object.keys(results).length).toBe(1);
        expect(results.person).toBeDefined();
      });

      it('should omit @id entry', () => {
        let results = entrypointHelper.filterEntryPoints({
          '@id': '/',
          'person': '/people'
        });
        expect(Object.keys(results).length).toBe(1);
        expect(results.person).toBeDefined();
      });

      it('should omit @type entry', () => {
        let results = entrypointHelper.filterEntryPoints({
          '@type': 'Entrypoint',
          'person': '/people'
        });
        expect(Object.keys(results).length).toBe(1);
        expect(results.person).toBeDefined();
      });

    });

    describe('.filterSupportedClass', () => {

      it('should omit #ConstraintViolation entry', () => {
        let results = entrypointHelper.filterSupportedClass([
          {'@id': '#ConstraintViolation'},
          {'@id': 'http://schema.org/Person'}
        ]);
        expect(Object.keys(results).length).toBe(1);
        expect(results[0]['@id']).toBe('http://schema.org/Person');
      });

      it('should omit #ConstraintViolationList entry', () => {
        let results = entrypointHelper.filterSupportedClass([
          {'@id': '#ConstraintViolationList'},
          {'@id': 'http://schema.org/Person'}
        ]);
        expect(Object.keys(results).length).toBe(1);
        expect(results[0]['@id']).toBe('http://schema.org/Person');
      });

    });

    describe('.getEntryPointByModel', () => {

      let entrypoints;

      beforeEach(() => {
        entrypoints = [
          new EntryPoint('Person'),
          new EntryPoint('BlogPosting')
        ];
      });

      it('should find an entrypoint by the model name', () => {
        let results = entrypointHelper.getEntryPointByModel('Person', entrypoints);

        expect(results).toBeDefined();
        expect(results instanceof EntryPoint).toBeTruthy();
        expect(results.model).toBe('Person');
      });

      it('should notify if nothing is found', () => {
        let results = entrypointHelper.getEntryPointByModel('Customer', entrypoints);

        expect(results).toBeUndefined();
      });

    });

    describe('.getModelById', () => {

      it('should find model name in URI', () => {
        expect(entrypointHelper.getModelById('http://schema.org/Person')).toBe('Person');
        expect(entrypointHelper.getModelById('http://schema.org/api/Person')).toBe('Person');
        expect(entrypointHelper.getModelById('/Person')).toBe('Person');
      });

      it('should let string unchanged if the name can\'t be extracted', () => {
        expect(entrypointHelper.getModelById('Person')).toBe('Person');
      });

    });

    describe('.getOperations', () => {

      it('should get operations', () => {
        let operations = [
          {'hydra:method': 'GET'},
          {'hydra:method': 'POST'}
        ],
          results = entrypointHelper.getOperations(operations);

        expect(results.length).toBe(2);
        expect(results[0]).toBe('GET');
        expect(results[1]).toBe('POST');
      });

      it('should detect get collection operation', () => {
        let operations = [
            {'hydra:method': 'GET', 'returns': 'hydra:PagedCollection'}
          ],
          results = entrypointHelper.getOperations(operations);

        expect(results.length).toBe(1);
        expect(results[0]).toBe(COLLECTION_METHOD);
      });

    });

  });

