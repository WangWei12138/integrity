import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PanelConfig} from '../../ui/panel/panel.component';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  tabConfig: PanelConfig;
  id: string;
  type: string;

  // tableConfig = {
  //   domId: 'queryTable',
  //   columns: [{field: 'ID', title: 'ID'}, {field: 'Type', title: 'Type'}],
  //   height: 200,
  //   showCheckBox: true,
  //   toolbarId: 'queryToolbar',
  //   data: [
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'},
  //     {ID: '123', Type: 'Function List'}
  //   ]
  // };

  constructor(private routeInfo: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit() {
    console.log('issue');
    this.routeInfo.data.subscribe(
      res => {
        this.dataService.hideProgress();
        console.log('issue');
        this.tabConfig = res['issue'];
        this.id = this.tabConfig.id;
        this.type = this.tabConfig.type;
        this.dataService.toggleIssueLoading(false);
      }
    );
  }

}
