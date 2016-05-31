import {
  it,
  describe,
  expect,
} from '@angular/core/testing';
import {Model} from '../models/Model';


  describe('Model model', () => {

    describe('#constructor', () => {

      it('should set title', () => {
        let model = new Model({'hydra:title': 'Person'}, {'title': 'hydra:title'});

        expect(model.title).toBe('Person');
      });

      it('should set description', () => {
        let model = new Model({'hydra:description': 'A person.'}, {'description': 'hydra:description'});

        expect(model.description).toBe('A person.');
      });

      it('should set properties', () => {
        let model = new Model({'hydra:supportedProperty': [{
          'hydra:title': 'firstName',
          'hydra:property': {'@type': 'rdf:Property'},
          'hydra:range': 'xmls:string',
          'hydra:required': false,
          'hydra:readable': false,
          'hydra:writable': false
        }]},
          {
            'title': 'hydra:title',
            'property': 'hydra:property',
            'range':  'hydra:range',
            'required': 'hydra:required',
            'readable': 'hydra:readable',
            'writable':  'hydra:writable',
            'supportedProperty': 'hydra:supportedProperty'
          });

        expect(model.properties.length).toBe(1);
      });

      it('should set link', () => {
        let model = new Model({'link': '/list/people'});

        expect(model.link).toBe('/list/people');
      });

      it('should have default values', () => {
        let model = new Model();

        expect(model.title).toBe('');
        expect(model.description).toBe('');
        expect(Array.isArray(model.properties)).toBeTruthy();
        expect(model.properties.length).toBe(0);
        expect(Array.isArray(model.link)).toBeTruthy();
        expect(model.link.length).toBe(2);
        expect(model.link).toContain('/List');
      });

    });

    describe('~getProperties', () => {

      it('should populate properties array', () => {
        let model = new Model(),
          result = model.getProperties([{
            'hydra:title': 'firstName',
            'hydra:property': {'@type': 'rdf:Property'},
            'hydra:range': 'xmls:string',
            'hydra:required': true,
            'hydra:readable': true,
            'hydra:writable': true
          }],
          {
            'title': 'hydra:title',
            'property': 'hydra:property',
            'range':  'hydra:range',
            'required': 'hydra:required',
            'readable': 'hydra:readable',
            'writable':  'hydra:writable'
          }),
          property = result[0];


        expect(property.label).toBe('firstName');
        expect(property.type).toBe('rdf:Property');
        expect(property.range).toBe('xmls:string');
        expect(property.required).toBeTruthy;
        expect(property.readable).toBeTruthy;
        expect(property.writable).toBeTruthy;
      });

    });

  });
