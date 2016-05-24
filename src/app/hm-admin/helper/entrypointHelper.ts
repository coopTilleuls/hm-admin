import * as _ from 'lodash';
import {EntryPoint} from '../services/models/EntryPoint';

import 'rxjs/add/operator/filter';

export const COLLECTION_METHOD: string = 'GET_COLLECTION';

export let entrypointHelper = {
  /**
   * @param {any} datas
   *
   * @returns {any} datas
   * @private
   */
    filterEntryPoints(datas: any): any {
    return _.omit(datas, ['@context', '@id', '@type']);
  },

  /**
   * @param {any} datas
   *
   * @returns {any} datas
   * @private
   */
    filterSupportedClass(datas: any): any {
    return _.filter(datas, (item) => {
      return _.findIndex(['#ConstraintViolation', '#ConstraintViolationList'], (needle => needle === item['@id'])) === -1;
    });
  },

  /**
   * Get entrypoint by model name.
   *
   * @param {string} model
   *
   * @returns {EntryPoint}
   * @private
   */
    getEntryPointByModel(model: string, entrypoints: Array<EntryPoint>): EntryPoint {
    return _.find(entrypoints, ((entrypoint: EntryPoint) => entrypoint.model === model));
  },

  /**
   * Get model name by the full string
   *
   * @param {string} id
   *
   * @returns {any}
   * @private
   */
    getModelById(id: string): any {
    return id.substr(id.lastIndexOf('/') + 1);
  },

  /**
   * Get Operations
   *
   * @param {Array<any>} supportedOperations
   *
   * @returns {Array<string>}
   * @private
   */
    getOperations(supportedOperations: Array<any>): Array<string> {
    return _.map(supportedOperations, ((operation: any) => {
      return (operation['hydra:method'] && operation.returns === 'hydra:PagedCollection') ? COLLECTION_METHOD : operation['hydra:method'];
    }));
  }
};
