import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartBarComponent, ChartConfig} from '../../ui/chart/chart-bar/chart-bar.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MessageService} from '../../service/message.service';
import {LoginService} from '../../service/login.service';
import {environment} from '../../../environments/environment';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashConfig: DashboardConfig;

  hasChart = false;

  first = true;

  @ViewChild('chart') chart: ChartBarComponent;

  constructor(private route: Router, private msg: MessageService, public dataService: DataService,
              private login: LoginService, private routeInfo: ActivatedRoute) {
    if (this.first) {
      this.msg.notifySuccess('Welcome', `Welcome to NIO/蔚来 Integrity, if you don't know who to do ,please read "User Guide" in left panel`);
      this.first = false;
    }
  }

  ngOnInit() {
    console.log('dashboard');
    this.routeInfo.data.subscribe(
      res => {
        this.dataService.hideProgress();
        this.dashConfig = res['dashboard'];
        this.chart.load(undefined, this.dashConfig.chartConfig.data);
      }
    );
  }
}

export interface DashboardConfig {
  columns?: Array<any>;
  assignedToMe?: Array<any>;
  chartConfig?: ChartConfig;
}
