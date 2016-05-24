import * as _ from 'lodash';
import {Model} from '../services/models/Model';

export let schemaHelper = {
  /**
   * Get the title of the schema
   *
   * @param {any} datas
   *
   * @returns {string}
   * @private
   */
    getSchemaTitle(datas: any): string {
    return datas['hydra:title'];
  },

  /**
   * Populate models from the schema
   *
   * @param {any} datas
   *
   * @returns {Array}
   * @private
   */
    populateModels(datas: any): Array<Model> {
    return _.map(schemaHelper.cleanModelsList(datas['hydra:supportedClass']), schemaHelper.populateModel);
  },

  /**
   * Transform datas from the schema unti valid Model
   *
   * @param {any} model
   *
   * @returns {Model}
   * @private
   */
    populateModel(model: any = {}): Model {
    return new Model(model);
  },

  /**
   * Clean the list of model from polluted datas
   *
   * @param supportedClasses
   *
   * @returns {Array<any>}
   * @private
   */
    cleanModelsList(supportedClasses: Array<any>): Array<any> {
    if (undefined !== supportedClasses) {
      return supportedClasses.slice(0, -3);
    }

    return null;
  }
};
