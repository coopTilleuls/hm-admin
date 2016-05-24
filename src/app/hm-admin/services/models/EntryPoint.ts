import * as _ from 'lodash';

export class EntryPoint {
  public url: string;
  public operations: Array<string> = [];

  constructor(public model: string = '') {}

  /**
   * @param {Array<string>|string} operations
   */
  addOperations(operations) {
    if ('string' === typeof operations) {
      operations = [operations];
    }
    if (true === Array.isArray(operations)) {
      this.operations = _.union(this.operations, operations);
    }
  }

}
