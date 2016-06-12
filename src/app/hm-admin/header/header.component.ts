import {Component, OnInit} from '@angular/core';
import {MdButton} from '@angular2-material/button';
import {MdIcon} from '@angular2-material/icon';
import {SidenavService} from "../content/sidenav.service";

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [MdButton, MdIcon]
})
export class HeaderComponent implements OnInit {

  constructor(private sidenav: SidenavService) {}

  toggleSidenav() {
    this.sidenav.change();
  }

  ngOnInit() {
  }

}
