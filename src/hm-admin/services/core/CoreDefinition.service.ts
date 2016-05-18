import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class CoreDefinitionService {

    public definitions: any;

    constructor(private http: Http) {}

    /**
     * Get the CoreDefinition, if it exists from Localstorage, if not from HTTP
     *
     * @param {string} url
     *
     * @returns {Observable}
     */
    getCoreDefinition(url) {
        let definition;

        this.getCacheCoreDefinition().subscribe(res => {
        if (res === null) {
            definition = this.fetchCoreDefinition(url);
            return this.setCacheCoreDefinition(definition);
        }
          });
        this.definitions = this.getCacheCoreDefinition();

        return this.definitions;
    }

    /**
     * get the Definition from url
     *
     * @param {string} url
     *
     * @returns {Observable}
     */
    fetchCoreDefinition(url): Observable<any> {
        let coreObject: Object = {};
        return this.http.get(url)
         .map(res => res.json())
         .map(res => res['@context'])
         .map(res => {
             for (let key in res) {
                let value = res[key];
                 if (typeof value === 'object'
                     && !(value instanceof String)
                     && value.hasOwnProperty('@id')) {
                     value = value['@id'];
                }
                 this.add(key, value, coreObject);
             }
             return coreObject;
         });

    }
    /**
     * Write CoreDefinition to LocalStorage
     *
     * @param {Observable} definitions
     *
     * @returns void
     */
    setCacheCoreDefinition(definitions: Observable<any>) {
        definitions.subscribe(res => localStorage.setItem('definition', JSON.stringify(res)));
        return definitions;
    }

    /**
     * Get CoreDefinition from LocalStorage
     *
     * @returns {Object}
     */
    getCacheCoreDefinition() {
        let localDef = localStorage.getItem('definition');
        return Observable.of(localDef);
    }

    /**
     * Write definition to object
     *
     * @param {string} key
     * @param {string} value
     * @param {Object} value
     *
     * @returns {Object}
     */
    add(key, value, object) {
        Object.defineProperty(object, key, {
            value: value,
            writable: false,
            enumerable: true
        });
    }

}
