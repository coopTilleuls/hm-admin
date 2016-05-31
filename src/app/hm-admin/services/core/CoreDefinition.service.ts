import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {ConfigService} from '../config/Config.service';

@Injectable()
export class CoreDefinitionService {

  public definitions: BehaviorSubject<any>;

  constructor(private http: Http, private configService: ConfigService) {
    this.definitions = new BehaviorSubject({});
  }

  /**
   * load core api definitions
   */
  loadDefinitions() {
    this.getDefinitions().subscribe(definitions => {
      let definitionList: any = {};

      for (let key in definitions) {
        const value = definitions[key];
        if (typeof value === 'object'
          && !(value instanceof String)) {
          if (value.hasOwnProperty('@id')) {
            this.add(key, value['@id'], definitionList);
          }
        } else {
          this.add(key, value, definitionList);
        }
      }

      localStorage.setItem('definitions', JSON.stringify(definitionList));
      this.definitions.next(definitionList);
    });
  }

  /**
   * Get local definition if exist or remote one
   *
   * @returns {Observable<any>}
   */
  getDefinitions(): Observable<any> {
    let definitions: any;

    if ((definitions = localStorage.getItem('definitions')) !== null) {
      return Observable.of(JSON.parse(definitions));
    }

    return this.http.get(this.configService.api.definitionUrl)
      .map(res => res.json())
      .map(res => res['@context']);
  }

  /**
   * Write definition to object
   *
   * @param {string} key
   * @param {string} value
   * @param {any} value
   *
   * @returns {any}
   */
  add(key: string, value: string, object: any) {
    Object.defineProperty(object, key, {
      value: value,
      writable: false,
      enumerable: true
    });
  }

}
