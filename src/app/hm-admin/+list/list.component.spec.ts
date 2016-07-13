import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  fakeAsync
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListComponent } from './list.component';
import { SchemaService } from '../services/schema/schema.service';
import { MockSchemaService } from '../services/schema/schema.service.mock';
import { APIService } from '../services/api/api.service';
import { MockAPIService } from '../services/api/api.service.mock';
import { ConfigService } from '../services/config/Config.service';
import { RouteSegment } from '@angular/router';
import { ROUTER_FAKE_PROVIDERS } from '@angular/router/testing';
import { Model } from '../services/models/Model';
import { Property } from '../services/models/Property';
import { IPaginationChange, IPaginationModel } from 'ng2-material/index';
import { Observable } from 'rxjs/Rx';

describe('Component: List', () => {
  let builder: TestComponentBuilder,
    api: APIService,
    config: ConfigService,
    schema: SchemaService,
    component: ListComponent;

  beforeEachProviders(() => [
    ListComponent,
    provide(SchemaService, {useClass: MockSchemaService}),
    provide(APIService, {useClass: MockAPIService}),
    ConfigService,
    ROUTER_FAKE_PROVIDERS
  ]);

  beforeEach(
    inject(
      [APIService, SchemaService, ConfigService, TestComponentBuilder, ListComponent],
      fakeAsync((_api, _schema, _config, tcb, _component) => {
        api = _api;
        schema = _schema;
        config = _config;
        builder = tcb;
        component = _component;
      })
    )
  );

  it('should inject the component', () => {
      expect(component).toBeTruthy();
    });

  it('should create the component', inject([], () => {
    return builder.createAsync(ListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  describe('routerOnActivate', () => {

    let segment: RouteSegment,
      wrongSegment: RouteSegment;

    beforeEach(() => {
      segment = new RouteSegment([], {model: 'Person'}, null, null, null);
      wrongSegment = new RouteSegment([], {model: 'Organization'}, null, null, null);
    });

    it('should find model from route segment if it exists', () => {
      spyOn(component, 'extractProperties');
      spyOn(component, 'getDefaultCollection');

      component.routerOnActivate(segment);

      expect(component.model.title).toEqual('Person');
      expect(component.extractProperties).toHaveBeenCalled();
      expect(component.getDefaultCollection).toHaveBeenCalled();
    });

    it('should not find wrong model from route segment', () => {
      spyOn(component, 'extractProperties');
      spyOn(component, 'getDefaultCollection');

      component.routerOnActivate(wrongSegment);

      expect(component.model).toBeUndefined();
      expect(component.extractProperties).not.toHaveBeenCalled();
      expect(component.getDefaultCollection).not.toHaveBeenCalled();
    });

  });

  describe('extractProperties', () => {
    beforeEach(() => {
      let definitions = {'title': 'title', 'supportedProperty': 'supportedProperty'};
      component.model = new Model({
        title: 'Person',
        supportedProperty: [
          {title: 'givenName'},
          {title: 'firstName'}
        ]
      }, definitions);
    });

    it('should accept all properties if no configuration is found', () => {
      spyOn(config, 'get').and.returnValue(null);

      component.extractProperties();

      expect(config.get).toHaveBeenCalled();
      expect(component.properties.length).toEqual(2);
      expect(component.properties[0].label).toEqual('givenName');
    });

    it('should keep the intersection between configuration properties and properties of the model', () => {
      spyOn(config, 'get').and.returnValue(['givenName', 'birthDate']);
      spyOn(component, 'sortProperties');

      component.extractProperties();

      expect(config.get).toHaveBeenCalled();
      expect(component.properties.length).toEqual(1);
      expect(component.properties[0].label).toEqual('givenName');
      expect(component.sortProperties).toHaveBeenCalled();
    });

  });

  describe('sortProperties', () => {

    let config: ConfigService,
      component: ListComponent;

    beforeEach(inject([ConfigService, ListComponent], (_config: ConfigService, _component: ListComponent) => {
      config = _config;
      component = _component;
      let definitions = {'title': 'title'};
      component.model = new Model({title: 'Person'}, definitions);
      component.properties = [
        new Property({title: 'givenName'}, definitions),
        new Property({title: 'firstName'}, definitions),
        new Property({title: 'birthDate'}, definitions)
      ];
    }));

    it('should let properties unchanged if no configuration is found', () => {
      spyOn(config, 'get').and.returnValue(null);

      component.sortProperties();

      expect(component.properties.length).toEqual(3);
      expect(component.properties[0].label).toEqual('givenName');
      expect(component.properties[1].label).toEqual('firstName');
      expect(component.properties[2].label).toEqual('birthDate');
    });

    it('should sort properties depending on configuration order', () => {
      spyOn(config, 'get').and.returnValue(['firstName', 'birthDate', 'givenName']);

      component.sortProperties();

      expect(component.properties.length).toEqual(3);
      expect(component.properties[0].label).toEqual('firstName');
      expect(component.properties[1].label).toEqual('birthDate');
      expect(component.properties[2].label).toEqual('givenName');
    });

  });

  describe('getDefaultCollection', () => {

    beforeEach(() => {
      component.model = new Model({title: 'Person'}, {title: 'title'});
      spyOn(component, 'changeCollection');
      spyOn(api, 'getCollectionByModel');
    });

    it('should call API depending on the model name', () => {
      component.getDefaultCollection();

      expect(api.getCollectionByModel).toHaveBeenCalledWith(component.model.title);
      expect(component.changeCollection).toHaveBeenCalled();
    });

  });

  describe('paginationChange', () => {
    let model: IPaginationChange;

    beforeEach(() => {
      model = {
        name: 'pagination_changed',
        target: 'default',
        pagination: {
          currentPage: 1,
          itemsPerPage: 30,
          totalItems: 42
        }
      };

      spyOn(component, 'pageSizeChange');
      spyOn(component, 'pageChange');
    });

    it('should trigger page size change if page size changed', () => {
      component.paginationChange(model);

      expect(component.pageSizeChange).toHaveBeenCalledWith(model);
    });

    it('should trigger page change if page changed', () => {
      component.collection.itemsPerPage = 30;

      component.paginationChange(model);

      expect(component.pageChange).toHaveBeenCalledWith(model);
    });

    it('should trigger nothing if mode is not valid', () => {
      model.pagination.itemsPerPage = 0;

      component.paginationChange(model);

      expect(component.pageSizeChange).not.toHaveBeenCalled();
      expect(component.pageChange).not.toHaveBeenCalled();
    });

  });

  describe('pageSizeChange', () => {
    let model: IPaginationChange;

    beforeEach(() => {
      model = {
        name: 'pagination_changed',
        target: 'default',
        pagination: {
          currentPage: 1,
          itemsPerPage: 30,
          totalItems: 42
        }
      };
      component.collection.firstPage = '/people';

      spyOn(component, 'changeCollection');
      spyOn(api, 'getCollectionByUrl');
    });

    it('should call API for the new page', () => {
      component.pageSizeChange(model);

      expect(api.getCollectionByUrl)
        .toHaveBeenCalledWith(component.collection.firstPage, {itemsPerPage: model.pagination.itemsPerPage});
      expect(component.changeCollection).toHaveBeenCalled();
    });

  });

  describe('pageChange', () => {
    let model: IPaginationChange;

    beforeEach(() => {
      model = {
        name: 'pagination_changed',
        target: 'default',
        pagination: {
          currentPage: 2,
          itemsPerPage: 30,
          totalItems: 42
        }
      };

      spyOn(component, 'getPreviousPage');
      spyOn(component, 'getNextPage');
    });

    it('should ask previous page', () => {
      component.collection.currentPage = 3;

      component.pageChange(model);

      expect(component.getPreviousPage).toHaveBeenCalled();
    });

    it('should ask next page', () => {
      component.collection.currentPage = 1;

      component.pageChange(model);

      expect(component.getNextPage).toHaveBeenCalled();
    });

  });

  describe('getPreviousPage', () => {

    beforeEach(() => {
      component.collection.previousPage = '/?page=2';
      spyOn(component, 'changeCollection');
      spyOn(api, 'getCollectionByUrl');
    });

    it('should call API depending on the model name', () => {
      component.getPreviousPage();

      expect(api.getCollectionByUrl).toHaveBeenCalledWith(component.collection.previousPage);
      expect(component.changeCollection).toHaveBeenCalled();
    });

  });

  describe('getNextPage', () => {

    beforeEach(() => {
      component.collection.nextPage = '/?page=4';
      spyOn(component, 'changeCollection');
      spyOn(api, 'getCollectionByUrl');
    });

    it('should call API depending on the model name', () => {
      component.getNextPage();

      expect(api.getCollectionByUrl).toHaveBeenCalledWith(component.collection.nextPage);
      expect(component.changeCollection).toHaveBeenCalled();
    });

  });

  describe('changeCollection', () => {

    it('should refresh collection when collection changed', () => {
      const collection = {page: 2},
        obs = Observable.of(collection);

      component.changeCollection(obs);

      obs.subscribe(() => {
        expect(component.collection).toEqual(collection);
      });
    });

    it('should try to refresh itemsPerPage when collection changed', () => {
      const collection = {page: 2},
        obs = Observable.of(collection);
      spyOn(component, 'changeCollection');

      component.changeCollection(obs);

      obs.subscribe(() => {
        expect(component.changeCollection).toHaveBeenCalled();
      });

    });

  });

});

@Component({
  selector: 'test',
  template: `
    <app-list></app-list>
  `,
  directives: [ListComponent]
})
class ListComponentTestController {
}

