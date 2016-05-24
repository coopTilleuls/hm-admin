export interface IProperty {
  'hydra:title': string;
  'hydra:property': {
    '@type': string;
  };
  'hydra:range': string;
  'hydra:required': boolean;
  'hydra:readable': boolean;
  'hydra:writable': boolean;
}

export class Property {
  public label: string;
  public type: string;
  public range: string;
  public required: boolean;
  public readable: boolean;
  public writable: boolean;

  constructor(datas: IProperty) {
    if (datas) {
      this.label = datas['hydra:title'] || '';
      this.type = datas['hydra:property'] ? datas['hydra:property']['@type'] : '';
      this.range = datas['hydra:range'] || '';
      this.required = datas['hydra:required'] || false;
      this.readable = datas['hydra:readable'] || false;
      this.writable = datas['hydra:writable'] || false;
    }
  }
}
