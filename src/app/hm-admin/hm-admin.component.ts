import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Route } from '@angular/router';
import { MdButton } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { ConfigService } from './services/config/Config.service';
import { CoreDefinitionService } from './services/core/CoreDefinition.service';
import { SchemaService } from './services/schema/schema.service';
import { HeaderComponent } from './header/index';
import { ContentComponent, SidenavService } from './content/index';
import { HomeComponent } from './+home';
import { ListComponent } from './+list';

export const HmAdminRoutes: Route[] = [
  // @todo remove after useAsDefault or redirectTo implementation
  new Route({path: '/', component: HomeComponent}),
  new Route({path: '/home', component: HomeComponent}),
  new Route({path: '/list/:model', component: ListComponent})
];

@Component({
  moduleId: module.id,
  selector: 'hm-admin-app',
  templateUrl: 'hm-admin.component.html',
  styleUrls: ['hm-admin.component.css'],
  providers: [
    HTTP_PROVIDERS,
    MdIconRegistry,
    ConfigService,
    CoreDefinitionService,
    SchemaService,
    SidenavService
  ],
  directives: [MdButton, MdIcon, HeaderComponent, ContentComponent],
  encapsulation: ViewEncapsulation.None
})
export class HmAdminComponent implements OnInit {

  @Input() config: any;

  constructor(private configService: ConfigService,
              private coreDefinitionService: CoreDefinitionService,
              private schemaService: SchemaService) {}

  ngOnInit() {
    this.configService.setConfiguration(this.config);
    this.coreDefinitionService.loadDefinitions();
    this.schemaService.load();
  }
}
