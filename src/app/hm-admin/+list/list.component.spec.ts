import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
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

describe('Component: List', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    provide(SchemaService, {useClass: MockSchemaService}),
    provide(APIService, {useClass: MockAPIService}),
    ConfigService,
    ROUTER_FAKE_PROVIDERS,
    ListComponent
  ]);

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ListComponent],
    (component: ListComponent) => {
      expect(component).toBeTruthy();
    }));

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

    it('should find model from route segment if it exists', inject([ListComponent], (component: ListComponent) => {
      spyOn(component, 'extractProperties');
      spyOn(component, 'getCollection');

      component.routerOnActivate(segment);

      expect(component.model.title).toEqual('Person');
      expect(component.extractProperties).toHaveBeenCalled();
      expect(component.getCollection).toHaveBeenCalled();
    }));

    it('should not find wrong model from route segment', inject([ListComponent], (component: ListComponent) => {
      spyOn(component, 'extractProperties');
      spyOn(component, 'getCollection');

      component.routerOnActivate(wrongSegment);

      expect(component.model).toBeUndefined();
      expect(component.extractProperties).not.toHaveBeenCalled();
      expect(component.getCollection).not.toHaveBeenCalled();
    }));

  });

  describe('extractProperties', () => {

    let config: ConfigService,
      component: ListComponent;

    beforeEach(inject([ConfigService, ListComponent], (_config: ConfigService, _component: ListComponent) => {
      config = _config;
      component = _component;
      let definitions = {'title': 'title', 'supportedProperty': 'supportedProperty'};
      component.model = new Model({
        title: 'Person',
        supportedProperty: [
          {title: 'givenName'},
          {title: 'firstName'}
        ]
      }, definitions);
    }));

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

