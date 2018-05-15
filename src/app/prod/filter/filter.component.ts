import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  public projects: Array<any>;
  public vehicleType: Array<any>;
  public state: Array<any>;
  public responsible: Array<any>;
  public groups = environment.fdsParams.groups;


  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    this.projects = [];
    this.http.get('/rest/projects').subscribe(
      res => {
        const data = res['data'];
        console.log(data);
        const permittedGroups = data['permittedGroups'];
        if (permittedGroups !== undefined && permittedGroups.length > 0) {
          for (let i = 0; i < this.groups.length; i++) {
            const groupName = this.groups[i];
            if (permittedGroups !== undefined && permittedGroups.indexOf(groupName) >= 0) {
              this.projects.push(data['name']);
              break;
            }
          }
        }
        console.log(this.projects);
      }
    );

    $('.selectpicker').selectpicker({
      size: 4
    });


  }

}
