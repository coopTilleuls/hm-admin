import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class MockAPIService {

  /**
   * Get collection by URL
   *
   * @param {string} path
   *
   * @returns {Observable<PagedCollection|null>}
   */
  getCollectionByUrl(path: string) {
    return Observable.of({});
  }

  /**
   * Get collection from API
   *
   * @param {string} modelName
   * @returns {Observable<PagedCollection|null>}
   */
  getCollectionByModel(modelName: string = '') {
    return this.getCollectionByUrl('');
  }
}
