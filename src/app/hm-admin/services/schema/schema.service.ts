import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/last';
import * as _ from 'lodash';
import {ConfigService} from '../config/Config.service';
import {entrypointHelper} from '../../helper/entrypointHelper';
import {schemaHelper} from '../../helper/schemaHelper';
import {EntryPoint} from '../models/EntryPoint';
import {stringHelper} from '../../helper/stringHelper';

@Injectable()
export class SchemaService {

  schema: BehaviorSubject<any>;
  entrypoints: BehaviorSubject<Array<EntryPoint>>;
  availableEntrypoints: Array<EntryPoint> = [];

  constructor(private http: Http, private config: ConfigService) {
    this.schema = new BehaviorSubject(null);
    this.entrypoints = new BehaviorSubject([]);
  }

  /**
   * load API description
   */
  load() {
    this.loadRoot();
    this.loadDocumentation();
  }

  /**
   * load available entrypoints from API's root
   * @private
   */
  loadRoot() {
    let request: string = this.config.api.url;
    let entrypoints = this.http.get(request)
      .map(data => data.json())
      .map(entrypointHelper.filterEntryPoints);

    entrypoints.subscribe(
      (entrypoints => {
        _.forEach(_.keys(entrypoints), (key) => {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(key)),
            entrypoint: EntryPoint = entrypointHelper.getEntryPointByModel(key, this.availableEntrypoints);

          if (undefined === entrypoint) {
            entrypoint = new EntryPoint(cleanModel);
            this.availableEntrypoints.push(entrypoint);
          }

          entrypoint.url = entrypoints[key];
        });
        this.entrypoints.next(this.availableEntrypoints);
      }),
      () => {
        throw new Error(`API's url is unreachable: ${request}.`);
      }
    );
  }

  /**
   * load documentation about the API
   */
  loadDocumentation() {
    let request = [this.config.api.url, 'apidoc'].join('/'),
      apidoc = this.http.get(request)
        .map(data => data.json())
        .share();

    apidoc.subscribe(
      null,
      () => {
        throw new Error(`API's url is unreachable: ${request}.`);
      }
    );

    let api = apidoc.map(data => data['hydra:supportedClass'])
      .map(entrypointHelper.filterSupportedClass)
      .switchMap(results => results);

    this.loadCollectionOperations(api);
    this.loadSingleOperations(api);
    this.loadSchema(apidoc);

  }

  /**
   * Load collection operations
   *
   * @param {Observable<any>} api
   * @param {string} request
   * @private
   */
  loadCollectionOperations(api: Observable<any>) {
    api.filter(item => item['@id'] === '#Entrypoint')
      .map(entrypoints => entrypoints['hydra:supportedProperty'])
      .switchMap(entrypoint => entrypoint)
      .map(entrypoint => entrypoint['hydra:property'])
      .subscribe(
        (entrypoint => {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(entrypoint['@id'])),
            ep: EntryPoint = entrypointHelper.getEntryPointByModel(cleanModel, this.availableEntrypoints);

          if (undefined === ep) {
            ep = new EntryPoint(cleanModel);
            this.availableEntrypoints.push(ep);
          }

          let operations: Array<string> = entrypointHelper.getOperations(entrypoint['hydra:supportedOperation']);
          ep.addOperations(operations);

          this.entrypoints.next(this.availableEntrypoints);
        })
      );
  }

  /**
   * Load single operations
   *
   * @param {Observable<any>} api
   * @param {string} request
   * @private
   */
  loadSingleOperations(api: Observable<any>) {
    api.filter(item => item['@id'] !== '#Entrypoint')
      .subscribe(
        (entrypoint => {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(entrypoint['hydra:title'])),
            ep: EntryPoint = entrypointHelper.getEntryPointByModel(cleanModel, this.availableEntrypoints),
            operations: Array<string> = entrypointHelper.getOperations(entrypoint['hydra:supportedOperation']);

          if (undefined === ep) {
            ep = new EntryPoint(cleanModel);
            this.availableEntrypoints.push(ep);
          }

          ep.addOperations(operations);

          this.entrypoints.next(this.availableEntrypoints);
        })
      );
  }

  /**
   * Load schema of the API
   */
  loadSchema(apidoc: Observable<any>): void {
    apidoc
      .map(data => {
        return {
          title: schemaHelper.getSchemaTitle(data),
          models: schemaHelper.populateModels(data)
        };
      })
      .subscribe(schema => this.schema.next(schema));
  }
}
