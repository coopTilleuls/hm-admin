import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ROUTER_FAKE_PROVIDERS} from '@angular/router/testing';
import {ContentComponent} from './content.component';
import {SidenavService} from "./sidenav.service";
import {SchemaService} from "../services/schema/schema.service";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('Component: Content', () => {
  let builder: TestComponentBuilder;

  interface CustomComponentFixture {
    fixture: ComponentFixture<ComponentTestController>;
    comp: ContentComponent;
    debugElement: DebugElement;
  }

  function setup(emptyModelsList: boolean = false): Promise<CustomComponentFixture> {
    return builder.createAsync(ComponentTestController)
      .then((fixture: ComponentFixture<ComponentTestController>) => {
        let debug = fixture.debugElement.query(By.css('app-content'));
        let comp: ContentComponent = debug.componentInstance;
        fixture.detectChanges();

        if (true === emptyModelsList) {
          comp.models = [];
        }

        return {
          fixture: fixture,
          comp: comp,
          debugElement: debug
        };
      });
  }

  beforeEachProviders(() => [
    ContentComponent,
    SidenavService,
    SchemaService,
    ROUTER_FAKE_PROVIDERS
  ]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  describe('default', () => {

    it('should inject the component', inject([ContentComponent],
      (component: ContentComponent) => {
        expect(component).toBeTruthy();
      }));

    it('should create the component', inject([], () => {
      return setup().then((api: CustomComponentFixture) => {
        expect(api.debugElement).toBeTruthy();
        expect(api.comp).toBeTruthy();
      });
    }));

    it('should have default model list', inject([], () => {
      return setup().then((api: CustomComponentFixture) => {
        expect(api.comp.models.length).toEqual(1);
        expect(api.comp.models).toContain({title: 'Home', link: ['/home']});
      });
    }));

  });

  describe('initSidenav', () => {

    it('should subscribe to sidenav onChange event', inject([SidenavService], (sidenavService: SidenavService) => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(api.comp.sidenav, 'toggle');
        sidenavService.onChange.emit({name: 'toggle'});
        expect(api.comp.sidenav.toggle).toHaveBeenCalled();
      });
    }));

  });

  describe('initModels', () => {

    it('should reject wrong schema', inject([SchemaService], (schemaService: SchemaService) => {
      return setup(true).then((api: CustomComponentFixture) => {
        schemaService.schema = new BehaviorSubject(null);

        api.comp.initModels();

        expect(api.comp.models.length).toEqual(0);
      });
    }));

    it('should accept new models from schema', inject([SchemaService], (schemaService: SchemaService) => {
      return setup(true).then((api: CustomComponentFixture) => {
        schemaService.schema = new BehaviorSubject({
          models: [{title: 'Person', link: ['/people']}]
        });

        api.comp.initModels();

        expect(api.comp.models.length).toEqual(1);
        expect(api.comp.models).toContain({title: 'Person', link: ['/people']});
      });
    }));

  });

  describe('closeSidenav', () => {

    it('should ask for sidenav to close', inject([SidenavService], (sidenavService: SidenavService) => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(sidenavService, 'change');

        api.comp.closeSidenav();

        expect(sidenavService.change).toHaveBeenCalled();
        expect(sidenavService.change).toHaveBeenCalledWith('close');
      });
    }));

  });

  describe('ngOnInit', () => {

    it('should init sidenav', inject([], () => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(api.comp, 'initSidenav');

        api.comp.ngOnInit();

        expect(api.comp.initSidenav).toHaveBeenCalled();
      });
    }));

    it('should init models', inject([], () => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(api.comp, 'initModels');

        api.comp.ngOnInit();

        expect(api.comp.initModels).toHaveBeenCalled();
      });
    }));

  });

  describe('ngOnDestroy', () => {

    it('should release sidenav listener', inject([SidenavService], (sidenavService: SidenavService) => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(sidenavService.onChange, 'unsubscribe');

        api.comp.ngOnDestroy();

        expect(sidenavService.onChange.unsubscribe).toHaveBeenCalled();
      });
    }));

    it('should release schema listener', inject([], () => {
      return setup().then((api: CustomComponentFixture) => {
        spyOn(api.comp.modelsObserver, 'unsubscribe');

        api.comp.ngOnDestroy();

        expect(api.comp.modelsObserver.unsubscribe).toHaveBeenCalled();
      });
    }));

  });

});

@Component({
  selector: 'test',
  template: `
    <app-content></app-content>
  `,
  directives: [ContentComponent]
})
class ComponentTestController {
}

