export class Property {
  public label: string;
  public type: string;
  public range: string;
  public required: boolean;
  public readable: boolean;
  public writable: boolean;

  constructor(datas, definition: any) {
    if (datas) {
      this.label = datas[definition.title] || '';
      this.type = datas[definition.property] ? datas[definition.property]['@type'] : '';
      this.range = datas[definition.property] ? datas[definition.property]['range'] : '';
      this.required = datas[definition.required] !== undefined ? datas[definition.required] : false;
      this.readable = datas[definition.readable] !== undefined ? datas[definition.readable] : true;
      this.writable = datas[definition.writable] !== undefined ? datas[definition.writable] : false;
    }
  }
}
