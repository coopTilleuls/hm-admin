import { Component } from '@angular/core';
import { RouteSegment, OnActivate } from '@angular/router';
import { Model } from '../services/models/Model';
import * as _ from 'lodash';
import { SchemaService } from '../services/schema/schema.service';
import { APIService } from '../services/api/api.service';
import { PropertyPipe } from '../pipes/property.pipe';
import { ConfigService } from '../services/config/Config.service';
import { Property } from '../services/models/Property';
import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS, IPaginationChange } from 'ng2-material/index';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  directives: [MATERIAL_DIRECTIVES],
  providers: [APIService, MATERIAL_PROVIDERS],
  pipes: [PropertyPipe]
})
export class ListComponent implements OnActivate {

  model: Model;

  properties: Property[] = [];

  collection: any = {
    currentPage: 0,
    totalItems: 0,
    itemsPerPage: 0
  };

  itemsPerPageOptions: number[] = [10, 30, 50];

  constructor(private schemaService: SchemaService, private api: APIService, private config: ConfigService) {}

  routerOnActivate(segment: RouteSegment) {
    let modelName = segment.getParam('model');

    this.schemaService.schema
      .filter((schema) => null !== schema)
      .map(schema => schema.models)
      .switchMap(model => model)
      .filter((model: Model) => model.title === modelName)
      .subscribe((model: Model) => {
        this.model = model;
        this.extractProperties();
        this.getDefaultCollection();
      });
  }

  extractProperties() {
    const itemsPerPageOptions = this.config.get(`${this.model.title}.List.itemsPerPageOptions`),
      availableProps = this.config.get(`${this.model.title}.List.displayProperties`);

    if (null !== itemsPerPageOptions && Array.isArray(itemsPerPageOptions)) {
      this.itemsPerPageOptions = itemsPerPageOptions;
      this.changeItemsPerPageOptions();
    }

    if (null === availableProps) {
      this.properties = this.model.properties;
    } else {
      this.model.properties.forEach((property: Property) => {
        if (-1 !== availableProps.indexOf(property.label)) {
          this.properties.push(property);
        }
      });

      this.sortProperties();
    }
  }

  sortProperties() {
    const availableProps = this.config.get(`${this.model.title}.List.displayProperties`);

    if (null !== availableProps) {
      this.properties = _.sortBy(this.properties, (property) => {
        return _.indexOf(availableProps, property.label);
      });
    }
  }

  getDefaultCollection() {
    this.changeCollection(this.api.getCollectionByModel(this.model.title));

  }

  paginationChange(model: IPaginationChange) {
    if (model.pagination.itemsPerPage) {
      if (model.pagination.itemsPerPage !== this.collection.itemsPerPage) {
        this.pageSizeChange(model);
      } else {
        this.pageChange(model);
      }
    }
  }

  pageSizeChange(model: IPaginationChange) {
    this.changeCollection(
      this.api.getCollectionByUrl(this.collection.firstPage, {itemsPerPage: model.pagination.itemsPerPage})
    );
  }

  pageChange(model: IPaginationChange) {
    if (model.pagination.currentPage > this.collection.currentPage) {
      this.getNextPage();
    } else {
      this.getPreviousPage();
    }
  }

  getPreviousPage() {
    this.changeCollection(this.api.getCollectionByUrl(this.collection.previousPage));
  }

  getNextPage() {
    this.changeCollection(this.api.getCollectionByUrl(this.collection.nextPage));
  }

  changeCollection(observer: any) {
    observer.subscribe(collection => {
      this.collection = collection;
      this.changeItemsPerPageOptions();
    });
  }

  changeItemsPerPageOptions() {
    if (this.collection
      && this.itemsPerPageOptions.length
      && this.collection.itemsPerPage !== 0
      && this.itemsPerPageOptions.indexOf(this.collection.itemsPerPage) === -1 ) {
      this.itemsPerPageOptions.push(this.collection.itemsPerPage);
    }
    this.itemsPerPageOptions.sort((a, b) => a - b);
  }

}
