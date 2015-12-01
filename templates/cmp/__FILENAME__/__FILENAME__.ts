import {Component, ViewEncapsulation} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'angular2/http';


@Component({
  selector: '<%= TARGET_NAME %>',
  viewProviders: [],
  templateUrl: './components/<%= FILENAME %>/<%= FILENAME %>.html',
  styleUrls: ['./components/<%= FILENAME %>/<%= FILENAME %>.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  // { path: '/', component: SomeCmp, as: 'SomeCmp' }
])
export class <%= TARGET_CLASS %> {}
