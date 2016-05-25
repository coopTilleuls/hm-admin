import * as _ from 'lodash';
import { Property } from './Property';
import { CoreDefinitionService } from '../core/CoreDefinition.service';

export class Model {

    public title: string;
    public description: string;
    public properties: Array<Property>;
    public link: Array<any>;

    constructor(datas: any = {}, private coreDefinitionService: CoreDefinitionService) {
        if (datas) {
          coreDefinitionService.getDefinitions().subscribe( (definitions) => {
            this.title = datas[definitions.title] || '';
            this.description = datas[definitions.description] || '';
            this.properties = undefined !== datas[definitions.supportedProperty] ? this.getProperties(datas[definitions.supportedProperty]) : [];
            this.link = datas.link || ['/List', {model: this.title}];
          });
        }
    }

    /**
     * Extract properties from the a Model's schema
     *
     * @param {Array<any>} properties
     *
     * @returns {Array<Property>}
     * @private
     */
    getProperties(properties: Array<any>) {
        return _.map(properties, (property) => new Property(property));
    }

}
