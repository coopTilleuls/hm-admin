import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from "@angular2-material/sidenav/sidenav";
import {MD_LIST_DIRECTIVES} from "@angular2-material/list/list";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {SidenavService} from "./sidenav.service";
import {SchemaService} from "../services/schema/schema.service";
import {Model} from "../services/models/Model";

@Component({
  moduleId: module.id,
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css'],
  directives: [MD_SIDENAV_DIRECTIVES, MD_LIST_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class ContentComponent implements OnInit, OnDestroy {

  @ViewChild(MdSidenav)
  sidenav: MdSidenav;

  models: any[] = [
    {title: 'Home', link: ['/home']}
  ];

  modelsObserver: any;

  constructor(private sidenavService: SidenavService, private schemaService: SchemaService) {
  }

  initSidenav() {
    this.sidenavService.onChange.subscribe((event) => {
      if (undefined !== this.sidenav && undefined !== this.sidenav[event.name]) {
        this.sidenav[event.name]();
      }
    });
  }

  initModels() {
    this.modelsObserver = this.schemaService.schema
      .filter(schema => null !== schema)
      .map(schema => schema.models)
      .subscribe((models: Model[]) => {
        this.models = this.models.concat(models);
      });
  }

  closeSidenav() {
    this.sidenavService.change('close');
  }

  ngOnInit() {
    this.initSidenav();
    this.initModels();
  }

  ngOnDestroy() {
    this.sidenavService.onChange.unsubscribe();
    if (undefined !== this.modelsObserver) {
      this.modelsObserver.unsubscribe();
    }
  }
}
