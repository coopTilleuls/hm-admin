export class PagedCollection {

  public context;
  public id;
  public type;
  public firstPage;
  public itemsPerPage;
  public lastPage;
  public members;
  public totalItems;

  constructor(properties: any = {}, definition: any = {}) {
    this.context = properties['@context'];
    this.id = properties['@id'];
    this.type = properties['@type'];
    this.firstPage = properties[definition.firstPage];
    this.lastPage = properties[definition.lastPage];
    this.itemsPerPage = properties[definition.itemsPerPage];
    this.totalItems = properties[definition.totalItems];
    this.members = properties[definition.member];
  }
}
