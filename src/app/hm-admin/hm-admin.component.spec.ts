import { beforeEachProviders, beforeEach, describe, expect, it, inject } from '@angular/core/testing';
import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { HmAdminComponent } from './hm-admin.component';
import { ConfigService } from './services/config/Config.service';
import { SchemaService } from './services/schema/schema.service';
import { MockCoreDefinitionService } from './services/core/CoreDefinition.service.mock';
import { MockSchemaService } from './services/schema/schema.service.mock';
import { CoreDefinitionService } from './services/core/CoreDefinition.service';

beforeEachProviders(() => [
  HmAdminComponent,
  ConfigService,
  provide(CoreDefinitionService, {useClass: MockCoreDefinitionService}),
  provide(SchemaService, {useClass: MockSchemaService}),
  HTTP_PROVIDERS
]);

describe('App: HmAdmin', () => {

  it('should create the app',
    inject([HmAdminComponent], (app: HmAdminComponent) => {
      expect(app).toBeTruthy();
    }));

  describe('OnInit', () => {

    let config: ConfigService,
      definitions: CoreDefinitionService,
      schema: SchemaService,
      component: HmAdminComponent;

    beforeEach(inject(
      [ConfigService, CoreDefinitionService, SchemaService, HmAdminComponent],
      (_config: ConfigService,
       _definitions: CoreDefinitionService,
       _schema: SchemaService,
       _component: HmAdminComponent) => {
        config = _config;
        definitions = _definitions;
        schema = _schema;
        component = _component;

        spyOn(config, 'setConfiguration');
        spyOn(definitions, 'loadDefinitions');
        spyOn(schema, 'load');
        component.config = {url: 'http://localhost:8000'};
      })
    );

    it('should load user configuration', () => {
      component.ngOnInit();

      expect(config.setConfiguration).toHaveBeenCalledWith(component.config);
    });

    it('should load core definitions', () => {
      component.ngOnInit();

      expect(definitions.loadDefinitions).toHaveBeenCalled();
    });

    it('should load schema', () => {
      component.ngOnInit();

      expect(schema.load).toHaveBeenCalled();
    });

  });

});
