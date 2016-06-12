import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SidenavService {

  public onChange: EventEmitter<any> = new EventEmitter(false);

  constructor() {}

  /**
   * Emit change status of the sidenav
   * 
   * @param status
   */
  change(status: string = 'toggle') {
    this.onChange.emit({name: status});
  }

}
