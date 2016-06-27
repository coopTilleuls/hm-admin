import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../config/Config.service';
import { SchemaService } from '../schema/schema.service';
import { EntryPoint } from '../models/EntryPoint';
import { entrypointHelper } from '../../helper/entrypointHelper';
import { stringHelper } from '../../helper/stringHelper';
import { pagedCollection } from '../models/pagedCollection';
import { CoreDefinitionService } from '../core/CoreDefinition.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class APIService {

  public entrypoints: Array<EntryPoint> = [];

  constructor(private http: Http,
              private config: ConfigService,
              private schema: SchemaService,
              private coreDefinitionService: CoreDefinitionService) {
    this.schema.entrypoints.subscribe(entrypoints => this.entrypoints = entrypoints);
  }

  /**
   * Get collection by URL
   *
   * @param {string} path
   *
   * @returns {Observable<PagedCollection|null>}
   */
  getCollectionByUrl(path: string) {
    let query = this.http.get(path);

    query.subscribe(
      null,
      () => {
        throw Error(`API's url is unreachable: ${path}.`);
      }
    );

    return query
      .map(data => data.json())
      .map(collection => pagedCollection(collection, this.coreDefinitionService))
      .switchMap(collection => collection);
  }

  /**
   * Get collection from API
   *
   * @param {string} modelName
   *
   * @returns {Observable<PagedCollection|null>}
   */
  getCollection(modelName: string = '') {
    let cleanName: string = stringHelper.toCamelCase(modelName),
      entrypoint: EntryPoint = entrypointHelper.getEntryPointByModel(cleanName, this.entrypoints);
    if (undefined === entrypoint || '' === modelName) {
      throw Error(`Can't find an entrypoint for ${modelName} in ${this.entrypoints}`);
    }

    return this.getCollectionByUrl(this.config.get('api.baseUrl') + entrypoint.url);
  }
}
