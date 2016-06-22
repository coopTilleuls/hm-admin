import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ConfigService } from '../config/Config.service';

@Injectable()
export class MockCoreDefinitionService {

  public definitions: BehaviorSubject<any>;

  constructor(private http: Http, private configService: ConfigService) {
    this.definitions = new BehaviorSubject({
      'firstPage': 'hydra:firstPage',
      'lastPage': 'hydra:lastPage',
      'itemsPerPage': 'hydra:itemsPerPage',
      'totalItems': 'hydra:totalItems',
      'member': 'hydra:member'
    });
  }

  /**
   * Get local definition if exist or remote one
   *
   * @returns {Observable<any>}
   */
  getDefinitions(): Observable<any> {
    return this.definitions;
  }

}
