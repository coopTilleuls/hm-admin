import { Component } from '@angular/core';
import { RouteSegment, OnActivate } from '@angular/router';
import { Model } from '../services/models/Model';
import * as _ from 'lodash';
import { SchemaService } from '../services/schema/schema.service';
import { APIService } from '../services/api/api.service';
import { PropertyPipe } from '../pipes/property.pipe';
import { ConfigService } from '../services/config/Config.service';
import { Property } from '../services/models/Property';

@Component({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css'],
  providers: [APIService],
  pipes: [PropertyPipe]
})
export class ListComponent implements OnActivate {

  model: Model;

  properties: Property[] = [];

  collection: any;

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
        this.getCollection();
      });
  }

  extractProperties() {
    const availableProps = this.config.get(`${this.model.title}.List.displayProperties`);

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

  getCollection() {
    this.api.getCollection(this.model.title)
      .subscribe(collection => this.collection = collection);
  }

}
