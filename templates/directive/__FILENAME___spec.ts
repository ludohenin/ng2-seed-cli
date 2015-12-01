import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it,
  beforeEachProviders
} from 'angular2/testing';
import {Component, View, provide, DirectiveResolver} from 'angular2/angular2';

import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {<%= TARGET_CLASS %>} from './<%= FILENAME %>';

export function main() {

  describe('<%= TARGET_NAME %> Component', () => {

    // Support for testing component that uses Router
    beforeEachProviders(() => [
      RouteRegistry,
      DirectiveResolver,
      provide(Location, {useClass: SpyLocation}),
      provide(Router,
        {
          useFactory:
            (registry, location) => { return new RootRouter(registry, location, <%= TARGET_CLASS %>); },
          deps: [RouteRegistry, Location]
        })
    ]);

    it('should work',
      injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div <%= TARGET_NAME %>></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();
            let appDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement;
            expect(DOM.querySelectorAll(appDOMEl, '[<%= TARGET_NAME %>]')[0]).toBeDefined();
          });
      }));
  });
}

@Component({selector: 'test-cmp'})
@View({directives: [<%= TARGET_CLASS %>]})
class TestComponent {}
