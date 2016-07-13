import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntryPoint } from '../models/EntryPoint';
import { Model } from '../models/Model';

@Injectable()
export class MockSchemaService {

  schema: BehaviorSubject<any>;
  entrypoints: BehaviorSubject<Array<EntryPoint>>;
  availableEntrypoints: Array<EntryPoint> = [];

  constructor() {
    let definitions = {'title': 'title'};
    let person = new Model({title: 'Person'}, definitions);
    let blogPosting = new Model({title: 'BlogPosting'}, definitions);

    this.schema = new BehaviorSubject({
      models: [person, blogPosting]
    });
    this.entrypoints = new BehaviorSubject([]);
  }

  /**
   * load API description
   */
  load() {}
}
