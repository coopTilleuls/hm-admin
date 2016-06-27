import { Observable } from 'rxjs/Observable';

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
  getCollection(modelName: string = '') {
    return this.getCollectionByUrl('');
  }
}
