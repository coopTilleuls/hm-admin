import {Injectable} from '@angular/core';
import configuration from '../../configuration';

@Injectable()
export class ConfigService {
    api: any = {};

    constructor() {
        this._hookMeIfYouCan(configuration);
    }

    /**
     * @param _config
     * @private
     */
    _hookMeIfYouCan(_config: any):void {
        for(let key in _config) {
            if(_config.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = _config[key];
            }
        }
    }
}