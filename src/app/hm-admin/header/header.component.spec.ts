import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  async
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular2-material/icon';
import { HeaderComponent } from './header.component';
import { SidenavService } from '../content/sidenav.service';

describe('Component: Header', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    HeaderComponent,
    SidenavService,
    MdIconRegistry
  ]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([HeaderComponent],
    (component: HeaderComponent) => {
      expect(component).toBeTruthy();
    }
  ));

  it('should create the component', async(inject([], () => {
    return builder.createAsync(HeaderComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(HeaderComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  })));
});

@Component({
  selector: 'test',
  template: ` 
    <app-header></app-header>
  `,
  directives: [HeaderComponent]
})
class HeaderComponentTestController {
}

