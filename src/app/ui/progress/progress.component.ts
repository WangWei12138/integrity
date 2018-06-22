import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  percent = 10;     // 进度
  @Input() show = false;     // 是否显示
  zIndex = -1;      // z-index

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 显示进度条
   */
  showProgress(step?: number, timeout?: number) {
    this.percent = 10;
    this.show = true;
    this.zIndex = 10000;
    step = step === undefined ? 1 : step;
    timeout = timeout === undefined ? 100 : timeout;
    const interval = window.setInterval(() => {
        this.percent <= 90 ? this.percent = this.percent + step : window.clearInterval(interval);
      },
      timeout);
  }

  /**
   * 设置进度条Value
   * @param {number} value
   */
  setValue(value: number) {
    this.percent = value;
  }

  /**
   * 隐藏进度条
   */
  hideProgress() {
    this.percent = 10;
    this.zIndex = -1;
    this.show = false;
  }

}
