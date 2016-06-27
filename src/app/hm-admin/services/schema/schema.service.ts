import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import { ConfigService } from '../config/Config.service';
import { entrypointHelper } from '../../helper/entrypointHelper';
import { schemaHelper } from '../../helper/schemaHelper';
import { EntryPoint } from '../models/EntryPoint';
import { stringHelper } from '../../helper/stringHelper';
import { CoreDefinitionService } from '../core/CoreDefinition.service';

@Injectable()
export class SchemaService {

  schema: BehaviorSubject<any>;
  entrypoints: BehaviorSubject<Array<EntryPoint>>;
  availableEntrypoints: Array<EntryPoint> = [];

  constructor(private http: Http,
              private config: ConfigService,
              private coreDefinitionService: CoreDefinitionService) {
    this.schema = new BehaviorSubject(null);
    this.entrypoints = new BehaviorSubject([]);

  }

  /**
   * load API description
   */
  load() {
    this.coreDefinitionService.getDefinitions().subscribe((definition) => {
      this.loadRoot();
      this.loadDocumentation(definition);
    });

  }

  /**
   * load available entrypoints from API's root
   * @private
   */
  loadRoot() {
    let request: string = this.config.get('api.baseUrl');
    let entrypoints = this.http.get(request)
      .map(data => data.json())
      .map(entrypointHelper.filterEntryPoints);

    entrypoints.subscribe(
      (entrypoints => {
        for (let key in entrypoints) {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(key)),
            entrypoint: EntryPoint = entrypointHelper.getEntryPointByModel
            (
              key,
              this.availableEntrypoints
            );
          if (undefined === entrypoint) {
            entrypoint = new EntryPoint(cleanModel);
            this.availableEntrypoints.push(entrypoint);
          }

          entrypoint.url = entrypoints[key];
        }
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
  loadDocumentation(definition: any) {
    let request = [this.config.get('api.baseUrl'), 'vocab'].join('/'),
      apidoc = this.http.get(request)
        .map(data => data.json())
        .share();

    apidoc.subscribe(
      null,
      () => {
        throw new Error(`API's url is unreachable: ${request}.`);
      }
    );

    let api = apidoc.map(data => data[definition.supportedClass])
      .map(entrypointHelper.filterSupportedClass)
      .switchMap(results => results);

    this.loadCollectionOperations(api, definition);
    this.loadSingleOperations(api, definition);
    this.loadSchema(apidoc, definition);

  }

  /**
   * Load collection operations
   *
   * @param {Observable<any>} api
   * @param {string} request
   * @private
   */
  loadCollectionOperations(api: Observable<any>, definition: any) {
    api.filter(item => item['@id'] === '#Entrypoint')
      .map(entrypoints => entrypoints[definition.supportedProperty])
      .switchMap(entrypoint => entrypoint)
      .map(entrypoint => entrypoint[definition.property])
      .subscribe(
        (entrypoint => {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(entrypoint['@id'])),
            ep: EntryPoint = entrypointHelper.getEntryPointByModel(cleanModel, this.availableEntrypoints);

          if (undefined === ep) {
            ep = new EntryPoint(cleanModel);
            this.availableEntrypoints.push(ep);
          }

          let operations: Array<string> = entrypointHelper.getOperations(
            entrypoint[definition.supportedOperation],
            definition
          );
          ep.addOperations(operations);

          this.entrypoints.next(this.availableEntrypoints);
        })
      );
  }

  /**
   * Load single operations
   *
   * @param {Observable<any>} api
   * @param {any} definition
   * @param {string} request
   * @private
   */
  loadSingleOperations(api: Observable<any>, definition: any) {
    api.filter(item => item['@id'] !== '#Entrypoint')
      .subscribe(
        (entrypoint => {
          let cleanModel = stringHelper.toCamelCase(entrypointHelper.getModelById(entrypoint[definition.title])),
            ep: EntryPoint = entrypointHelper.getEntryPointByModel(cleanModel, this.availableEntrypoints),
            operations: Array<string> = entrypointHelper.getOperations(
              entrypoint[definition.supportedOperation],
              definition
            );

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
  loadSchema(apidoc: Observable<any>, definition: any): void {
    apidoc
      .map(data => {
        return {
          title: schemaHelper.getSchemaTitle(data, definition),
          models: schemaHelper.populateModels(data, definition)
        };
      })
      .subscribe(schema => this.schema.next(schema));
  }
}
