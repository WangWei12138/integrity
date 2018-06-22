import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import set = Reflect.set;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() histories: Array<History> = [];

  moreHistories: Array<History> = [];

  @Input() url: string;

  radioValue = 'Last';

  loading = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log('history');
    this.getData();
  }

  order() {
    const orderData = [];
    this.moreHistories.forEach(history => orderData.unshift(history));
    this.moreHistories = orderData;
  }

  getData() {
    this.loading = true;
    this.http.get(this.url)
      .subscribe(
        res => {
          res['success'] ? this.moreHistories = res['data'] : this.moreHistories = this.histories;
        },
        () => {
        },
        () => this.loading = false
      );
  }
}

export interface History {
  modifiedBy?: string;
  modifiedDate?: string;
  createdBy?: string;
  createdDate?: string;
  fields?: Array<HistoryConfig>;
}

export interface HistoryConfig {
  displayName: string;
  value: any;
}
