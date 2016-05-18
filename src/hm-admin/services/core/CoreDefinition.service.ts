
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class CoreDefinitionService {

    public cacheCoreDefinition: any;

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
        this.cacheCoreDefinition = this.getCacheCoreDefinition();

        if (this.cacheCoreDefinition === null) {
            definition = this.fetchCoreDefinition(url);
            this.setCacheCoreDefinition(definition);
        }

        return this.cacheCoreDefinition;
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
                if (value instanceof Object && typeof value['@id'] !== 'undefined') {
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
    }

    /**
     * Get CoreDefinition from LocalStorage
     *
     * @returns {Object}
     */
    getCacheCoreDefinition() {
        return localStorage.getItem('definition');
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
