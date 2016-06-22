import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  /**
   * Complete the default configuration with external one
   *
   * @param config
   * @private
   */
  setConfiguration(config: any): void {
    for (let key in config) {
      Object.defineProperty(this, key, {value: config[key]});
    }
  }

  /**
   * Parse tree of properties to find a specific one
   *
   * @param {string[]} properties
   * @param {any} parent
   *
   * @returns {any}
   */
  getRecursive(properties: string[], parent = this) {
    if (properties && properties.length && parent.hasOwnProperty(properties[0])) {
      if (properties.length > 1) {
        return this.getRecursive(properties.slice(1), parent[properties[0]]);
      }

      return parent[properties[0]];
    }

    return null;
  }

  /**
   * Get a configuration variable with properties split by "."
   *
   * @example
   * get('Person.List.displayProperties');
   *
   * @param properties
   *
   * @returns {any|null}
   */
  get(properties: string = '') {
    if ('' !== properties.trim()) {
      return this.getRecursive(properties.split('.'));
    }

    return null;
  }
}
