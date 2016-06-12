import * as _ from 'lodash';
import { Property } from './Property';

export class Model {

    public title: string;
    public description: string;
    public properties: Array<Property>;
    public link: Array<any>;

    constructor(datas: any = {}, definition: any = {}) {
        if (datas) {
            this.title = datas[definition.title] || '';
            this.description = datas[definition.description] || '';
            this.properties = undefined !== datas[definition.supportedProperty] ? this.getProperties(datas[definition.supportedProperty], definition) : [];
            this.link = datas.link || ['/list/', this.title];
        }
    }

    /**
     * Extract properties from the a Model's schema
     *
     * @param {Array<any>} properties
     * @param {any} definition
     * @returns {Array<Property>}
     * @private
     */
    getProperties(properties: Array<any>, definition: any) {
        return _.map(properties, (property) => new Property(property, definition));
    }

}
