import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.css']
})
export class ChartBarComponent implements OnInit {

  @Input() public config: ChartConfig;
  // @Input() public url: string;              // 访问数据的URL地址
  // @Input() public data: any;                // chart数据  { data : { x: [], y: [], category: [] }, success: true }
  // @Input() public clickEvent: Function;     // chart点击事件
  public loading = true;                    // 是否显示loading
  public options: any;                      // chart的配置


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.load(this.config.url, this.config.data);
  }

  load(url: string, data: Array<any>) {
    this.loading = true;
    if (url !== undefined) {
      this.http.get(url).subscribe(res => {
        this.config.data = res['success'] ? res['data'] : {};
        this.initChart(this.config.data);
        this.loading = false;
      });
    } else {
      this.initChart(data);
      this.loading = false;
    }
  }

  initChart(data: any) {
    const xData = data['x'], yData = data['y'], category = data['category'], ySeries = [];
    for (let i = 0; i < yData.length; i++) {
      ySeries.push({
        name: category[i],
        type: 'bar',
        data: yData[i],
        animationDelay: function (idx) {
          return idx * 10;
        }
      });
    }
    this.options = {
      legend: {
        data: category,
        align: 'left'
      },
      tooltip: {},
      xAxis: {
        data: xData,
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: this.getShortName
        }
      },
      yAxis: {},
      series: ySeries,
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
  }

  /**
   * 当X坐标数据太长无法显示时，做的处理
   * @param params
   * @returns {string}
   */
  getXName(params) {
    let newParamsName = ''; // 最终拼接成的字符串
    const names = params.split(' ');
    for (let i = 1; i <= names.length - 1; i++) {
      newParamsName = newParamsName + names[i - 1] + ' ';
      if (i !== 1 && i % 2 === 0) {
        newParamsName = newParamsName + '\n';
      }
    }
    return newParamsName;
  }

  getShortName(params) {
    let newParamsName = ''; // 最终拼接成的字符串
    const names = params.split(' ');
    if (names.length > 2) {
      for (let i = 0; i < names.length - 1; i++) {
        newParamsName = newParamsName + names[i].charAt(0);
      }
      if (names[names.length - 1] === 'Document') {
        newParamsName = newParamsName + ' Doc';
      }
    } else if (names.length > 1) {
      newParamsName = names[0];
      if (names[names.length - 1] === 'Document') {
        newParamsName = newParamsName + ' Doc';
      } else {
        newParamsName = newParamsName + ' ' + names[1];
      }
    } else {
      newParamsName = params;
    }
    return newParamsName;
  }

  onClick(event: any) {
    if (this.config.clickEvent !== undefined) {
      this.config.clickEvent(event);
    }
  }
}

export interface ChartConfig {
  url?: string;
  data?: Array<any>;
  clickEvent?: Function;
}
