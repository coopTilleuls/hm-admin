import * as _ from 'lodash';
import {IProperty, Property} from './Property';

export class Model {

    public title: string;
    public description: string;
    public properties: Array<Property>;
    public link: Array<any>;

    constructor(datas: any = {}) {
        if (datas) {
            this.title = datas['hydra:title'] || '';
            this.description = datas['hydra:description'] || '';
            this.properties = undefined !== datas['hydra:supportedProperty'] ? this.getProperties(datas['hydra:supportedProperty']) : [];
            this.link = datas.link || ['/List', {model: this.title}];
        }
    }

    /**
     * Extract properties from the a Model's schema
     *
     * @param {Array<IProperty>} properties
     *
     * @returns {Array<IProperty>}
     * @private
     */
    getProperties(properties: Array<IProperty>) {
        return _.map(properties, (property) => new Property(property));
    }

}
