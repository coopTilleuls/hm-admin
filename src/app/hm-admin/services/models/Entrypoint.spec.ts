import {
  it,
  describe,
  expect,
  beforeEach,
} from '@angular/core/testing';
import {EntryPoint} from '../models/EntryPoint';


  describe('Entrypoint model', () => {

    describe('#constructor', () => {
      let entrypoint: EntryPoint;

      beforeEach(() => {
        entrypoint = new EntryPoint();
      });

      it('should have an empty model as default', () => {
        expect(entrypoint.model).toBeDefined();
        expect(entrypoint.model).toBe('');
      });

      it('should have empty operations array as default', () => {
        expect(entrypoint.operations).toBeDefined();
        expect(Array(entrypoint.operations)).toBeTruthy();
        expect(entrypoint.operations.length).toBe(0);
      });

      it('should set model name', () => {
        entrypoint = new EntryPoint('blogPosting');

        expect(entrypoint.model).toBe('blogPosting');
      });

    });

    describe('#addOperations', () => {
      let entrypoint: EntryPoint;

      beforeEach(() => {
        entrypoint = new EntryPoint();
      });

      it('should accept string as addition', () => {
        entrypoint.addOperations('GET');
        expect(entrypoint.operations.length).toBe(1);
        expect(entrypoint.operations).toContain('GET');
      });

      it('should accept array as addition', () => {
        entrypoint.addOperations(['GET', 'POST']);
        expect(entrypoint.operations.length).toBe(2);
        expect(entrypoint.operations).toContain('GET');
        expect(entrypoint.operations).toContain('POST');
        entrypoint.addOperations('DELETE');
        expect(entrypoint.operations.length).toBe(3);
        expect(entrypoint.operations).toContain('DELETE');
      });

      it('should refuse other types as addition', () => {
        entrypoint.addOperations(() => null);
        entrypoint.addOperations({ 'GET': true });
        expect(entrypoint.operations.length).toBe(0);
      });

      it('should dedupe addition', () => {
        entrypoint.addOperations(['GET', 'POST']);
        entrypoint.addOperations('GET');
        expect(entrypoint.operations.length).toBe(2);
      });

    });

  });

