import * as _ from 'lodash';
import {Model} from '../services/models/Model';
import { CoreDefinitionService } from '../services/core/CoreDefinition.service';

export let schemaHelper = {
  /**
   * Get the title of the schema
   *
   * @param {any} datas
   *
   * @returns {string}
   * @private
   */
    getSchemaTitle(datas: any, definition: any): string {
    return datas[definition.title];
  },

  /**
   * Populate models from the schema
   *
   * @param {any} datas
   * @param {any} definition
   *
   * @returns {Array}
   * @private
   */
    populateModels(datas: any, definition: any): Array<Model> {
    return _.map(schemaHelper.cleanModelsList(datas[definition.supportedClass]),  (item) => {
     return schemaHelper.populateModel(item, definition);
    });
  },

  /**
   * Transform datas from the schema until valid Model
   *
   * @param {any} model
   * @param {any} definition
   *
   * @returns {Model}
   * @private
   */
    populateModel(model: any = {}, definition: any = {}): Model {
    return new Model(model, definition);
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

     const supportedClasse =  supportedClasses.filter((item) =>  {
      return item['@id'].match('/*.schema.org.*/');
      });

      return supportedClasse;
    }

    return null;
  }
};
