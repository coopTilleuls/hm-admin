import {
  it,
  describe,
  expect,
  inject,
  async,
  beforeEachProviders
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { pagedCollection } from './pagedCollection';
import { CoreDefinitionService } from '../core/CoreDefinition.service';
import { MockCoreDefinitionService } from '../core/CoreDefinition.service.mock';


describe('pagedCollection model', () => {

  beforeEachProviders(() => {
    return [
      provide(CoreDefinitionService, {useClass: MockCoreDefinitionService})
    ];
  });

  it('should set properties', async(inject([CoreDefinitionService], (cds: CoreDefinitionService) => {
    let collection = pagedCollection({
      '@context': '/contexts/Person',
      '@id': '/people',
      '@type': 'hydra:PagedCollection',
      'hydra:totalItems': 2,
      'hydra:itemsPerPage': 30,
      'hydra:firstPage': '/people',
      'hydra:lastPage': '/people',
      'hydra:member': ['/people/1', '/people/2']
    }, cds);

    collection.subscribe(result => {
      expect(result.context).toBe('/contexts/Person');
      expect(result.id).toBe('/people');
      expect(result.type).toBe('hydra:PagedCollection');
      expect(result.totalItems).toBe(2);
      expect(result.itemsPerPage).toBe(30);
      expect(result.firstPage).toBe('/people');
      expect(result.lastPage).toBe('/people');
      expect(Array.isArray(result.members)).toBeTruthy();
      expect(result.members.length).toBe(2);
    });
  })));

});

