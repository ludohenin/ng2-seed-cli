import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';

import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {<%= CLASS_NAME %>} from './<%= FILE_NAME %>';

export function main() {

  describe('<%= CLASS_NAME %> Component', () => {

    beforeEachProviders(() => []);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div <%= SELECTOR %>></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, '[<%= SELECTOR %>]')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [<%= CLASS_NAME %>]})
class TestComponent {}
