import {
  it,
  describe,
  expect,
} from '@angular/core/testing';
import {Property} from '../models/Property';


  describe('Property model', () => {

    describe('#constructor', () => {

      it('should set properties', () => {
        let property = new Property({
          'hydra:title': 'firstName',
          'hydra:property': {'@type': 'rdf:Property'},
          'hydra:range': 'xmls:string',
          'hydra:required': true,
          'hydra:readable': true,
          'hydra:writable': true
        });

        expect(property.label).toBe('firstName');
        expect(property.type).toBe('rdf:Property');
        expect(property.range).toBe('xmls:string');
        expect(property.required).toBeTruthy();
        expect(property.readable).toBeTruthy();
        expect(property.writable).toBeTruthy();
      });

      it('should set default values', () => {
        let property = new Property({
          'hydra:title': undefined,
          'hydra:property': undefined,
          'hydra:range': undefined,
          'hydra:required': undefined,
          'hydra:readable': undefined,
          'hydra:writable': undefined
        });

        expect(property.label).toBe('');
        expect(property.type).toBe('');
        expect(property.range).toBe('');
        expect(property.required).toBeFalsy();
        expect(property.readable).toBeFalsy();
        expect(property.writable).toBeFalsy();
      });

    });

  });

