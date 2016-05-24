export class PagedCollection {

  public context;
  public id;
  public type;
  public firstPage;
  public itemsPerPage;
  public lastPage;
  public members;
  public totalItems;

  constructor(properties: any = {}) {
    this.context = properties['@context'];
    this.id = properties['@id'];
    this.type = properties['@type'];
    this.firstPage = properties['hydra:firstPage'];
    this.lastPage = properties['hydra:lastPage'];
    this.itemsPerPage = properties['hydra:itemsPerPage'];
    this.totalItems = properties['hydra:totalItems'];
    this.members = properties['hydra:member'];
  }
}
