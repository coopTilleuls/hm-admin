import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../services/models/Property';

@Pipe({
  name: 'property'
})
export class PropertyPipe implements PipeTransform {

  transform(target: Object, property: Property) {
    if (undefined !== property && true === property.readable && target.hasOwnProperty(property.label)) {
      return target[property.label];
    }

    return null;
  }

}
