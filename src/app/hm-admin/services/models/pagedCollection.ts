import { CoreDefinitionService } from '../core/CoreDefinition.service';
import { Observable } from 'rxjs/Observable';

export let pagedCollection = (properties: any = {}, definitionService: CoreDefinitionService) => {

  /**
   * get the current page index
   *
   * @param {string} currentUri
   *
   * @return {number}
   */
  function getCurrentPage(currentUri: string = ''): number {
    const match = currentUri.match(/page=(\d)*/);

    return match ? +match[1] : 1;
  }

  return Observable.create(observer => {
    definitionService.definitions.subscribe((definitions: any) => {
      let collection: any = {
        context: properties['@context'],
        id: properties['@id'],
        type: properties['@type'],
        firstPage: properties[definitions.firstPage],
        lastPage: properties[definitions.lastPage],
        previousPage: properties[definitions.previousPage] || properties[definitions.firstPage],
        nextPage: properties[definitions.nextPage] || properties[definitions.lastPage],
        itemsPerPage: properties[definitions.itemsPerPage],
        totalItems: properties[definitions.totalItems],
        members: properties[definitions.member]
      };

      collection.currentPage = getCurrentPage(collection.id);

      observer.next(collection);
    });
  });
};
