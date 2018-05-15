import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-fds',
  templateUrl: './fds.component.html',
  styleUrls: ['./fds.component.css']
})
export class FdsComponent implements OnInit {

  private field: Array<string>;
  public id: string;

  public columns: Array<any>;
  public url: string;

  public height: number;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.id = new Date().toISOString();
    this.field = environment.fdsParams.columns
      .filter(column => column.hasOwnProperty('field'))
      .map(column => {
        return column['field'];
      });
    this.url = '/rest/query?fields=' + this.field.join(',') + '&' + environment.fdsParams.query;
    this.columns = environment.fdsParams.columns;

    this.height = (document.documentElement.clientHeight || document.body.clientHeight)
      - 40 - $('#filter').height();
  }


}
