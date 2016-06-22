import { CoreDefinitionService } from '../core/CoreDefinition.service';
import { Observable } from 'rxjs/Observable';

export let pagedCollection = (properties: any = {}, definitionService: CoreDefinitionService) => {
  return Observable.create(observer => {
    definitionService.definitions.subscribe((definitions: any) => {
      observer.next({
        context: properties['@context'],
        id: properties['@id'],
        type: properties['@type'],
        firstPage: properties[definitions.firstPage],
        lastPage: properties[definitions.lastPage],
        itemsPerPage: properties[definitions.itemsPerPage],
        totalItems: properties[definitions.totalItems],
        members: properties[definitions.member]
      });
    });
  });
};
