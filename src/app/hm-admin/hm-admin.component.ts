import {Component, Input, OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ConfigService} from './services/config/Config.service';
import {CoreDefinitionService} from './services/core/CoreDefinition.service';

@Component({
  moduleId: module.id,
  selector: 'hm-admin-app',
  templateUrl: 'hm-admin.component.html',
  styleUrls: ['hm-admin.component.css'],
  providers: [ConfigService, CoreDefinitionService, HTTP_PROVIDERS]
})
export class HmAdminComponent implements OnInit {
  @Input()
  config: any;

  constructor(private configService: ConfigService,
              private coreDefinitionService: CoreDefinitionService) {}

  ngOnInit() {
    this.configService.hookMeIfYouCan(this.config);
    this.coreDefinitionService.loadDefinitions();
  }
}
