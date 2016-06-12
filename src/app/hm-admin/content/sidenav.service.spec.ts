import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import {SidenavService} from './sidenav.service';

describe('Sidenav Service', () => {
  beforeEachProviders(() => [SidenavService]);

  describe('change', () => {

    it('should emit a toggle event by default',
      inject([SidenavService], (service: SidenavService) => {
        let spy = jasmine.createSpy('spy');
        service.onChange.subscribe(spy);

        service.change();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({name: 'toggle'});
      })
    );

    it('should emit an event on change',
      inject([SidenavService], (service: SidenavService) => {
        let spy = jasmine.createSpy('spy');
        service.onChange.subscribe(spy);

        service.change('close');

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({name: 'close'});
      })
    );

  });

});
