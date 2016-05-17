import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from './services/config/config.service';

@Component({
  moduleId: module.id,
  selector: 'hm-admin-app',
  templateUrl: 'hm-admin.component.html',
  styleUrls: ['hm-admin.component.css'],
  providers: [ConfigService]
})
export class HmAdminComponent implements OnInit {
  @Input('config')
  config: any;


  constructor(private configService:ConfigService) {}

  ngOnInit() {
    this.configService.hookMeIfYouCan(this.config);
  }

  title = 'hm-admin works!';
}
