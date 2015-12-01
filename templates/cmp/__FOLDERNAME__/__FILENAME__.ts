import {Component, ViewEncapsulation} from 'angular2/angular2';


@Component({
  selector: '<%= SELECTOR %>',
  templateUrl: './<%= ASSET_PATH %>/<%= FILE_NAME %>.html',
  styleUrls: ['./<%= ASSET_PATH %>/<%= FILE_NAME %>.css'],
  encapsulation: ViewEncapsulation.None
})
export class <%= CLASS_NAME %> {}
