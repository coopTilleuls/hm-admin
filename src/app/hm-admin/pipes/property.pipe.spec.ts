import {
  it,
  describe,
  expect,
  inject,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';
import { PropertyPipe } from './property.pipe';
import { Property } from '../services/models/Property';

describe('Property Pipe', () => {
  beforeEachProviders(() => [PropertyPipe]);

  describe('transform', () => {

    let person: any,
      name: Property,
      secretId: Property,
      coWorkers: Property;

    beforeEach(() => {
      person = {
        'name': 'Bruce Wayne',
        'secretId': 'Batman'
      };
      let definitions = {title: 'title', readable: 'readable'};
      name = new Property({title: 'name', readable: true}, definitions);
      secretId = new Property({title: 'secretId', readable: false}, definitions);
      coWorkers = new Property({title: 'coWorkers', readable: true}, definitions);

    });

    it('should return the value if it exists', inject([PropertyPipe], (pipe: PropertyPipe) => {
      expect(pipe.transform(person, name)).toEqual('Bruce Wayne');
    }));

    it('should return null if the property is not readable', inject([PropertyPipe], (pipe: PropertyPipe) => {
      expect(pipe.transform(person, secretId)).toBe(null);
    }));

    it('should return null if the property doesn\'t exist', inject([PropertyPipe], (pipe: PropertyPipe) => {
      expect(pipe.transform(person, coWorkers)).toBe(null);
    }));

  });
});
