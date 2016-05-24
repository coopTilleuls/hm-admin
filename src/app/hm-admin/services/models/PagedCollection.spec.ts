import {
  it,
  describe,
  expect,
} from '@angular/core/testing';
import {PagedCollection} from '../models/PagedCollection';


  describe('PagedCollection model', () => {

    describe('#constructor', () => {

      it('should set properties', () => {
        let pagedCollection = new PagedCollection({
          '@context': '/contexts/Person',
          '@id': '/people',
          '@type': 'hydra:PagedCollection',
          'hydra:totalItems': 2,
          'hydra:itemsPerPage': 30,
          'hydra:firstPage': '/people',
          'hydra:lastPage': '/people',
          'hydra:member': ['/people/1', '/people/2']
        });

        expect(pagedCollection.context).toBe('/contexts/Person');
        expect(pagedCollection.id).toBe('/people');
        expect(pagedCollection.type).toBe('hydra:PagedCollection');
        expect(pagedCollection.totalItems).toBe(2);
        expect(pagedCollection.itemsPerPage).toBe(30);
        expect(pagedCollection.firstPage).toBe('/people');
        expect(pagedCollection.lastPage).toBe('/people');
        expect(Array.isArray(pagedCollection.members)).toBeTruthy();
        expect(pagedCollection.members.length).toBe(2);
      });

    });

  });

