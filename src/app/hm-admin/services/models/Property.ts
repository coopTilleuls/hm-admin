import { CoreDefinitionService } from '../core/CoreDefinition.service';

export class Property {
  public label: string;
  public type: string;
  public range: string;
  public required: boolean;
  public readable: boolean;
  public writable: boolean;
  public coreDefinitionService: CoreDefinitionService;

  constructor(datas) {
    if (datas) {
      this.coreDefinitionService.getDefinitions().subscribe( (definitions) => {
        this.label = datas[definitions.title] || '';
        this.type = datas[definitions.property] ? datas[definitions.property]['@type'] : '';
        this.range = datas[definitions.range] || '';
        this.required = datas[definitions.required] || false;
        this.readable = datas[definitions.readable] || false;
        this.writable = datas[definitions.writable] || false;
      });

    }
  }
}
