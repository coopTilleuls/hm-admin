import {it, describe, expect, beforeEach} from '@angular/core/testing';
import {schemaHelper} from './schemaHelper';
import {Model} from '../services/models/Model';

  describe('Schema title Helper', () => {

    describe('.getSchemaTitle', () => {

      it('should get title from hydra format title', () => {
        expect(schemaHelper.getSchemaTitle({'hydra:title': 'My first API'})).toBe('My first API');
      });

      it('should not get title from other format title', () => {
        expect(schemaHelper.getSchemaTitle({'title': 'My first API'})).toBeUndefined();
      });

    });

    describe('.populateModels', () => {

      beforeEach(() => {
        spyOn(schemaHelper, 'populateModel').and.returnValue(new Model());
        spyOn(schemaHelper, 'cleanModelsList').and.callFake(datas => datas);
      });

      it('should populate with model', () => {
        let results = schemaHelper.populateModels({'hydra:supportedClass' : ['Person', 'Blog Posting']});
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
        expect(schemaHelper.cleanModelsList([1, 2]).length).toBe(0);
        expect(schemaHelper.cleanModelsList([1, 2, 3, 4]).length).toBe(1);
        expect(schemaHelper.cleanModelsList([1, 2, 3, 4])).toContain(1);
      });

    });
  });

