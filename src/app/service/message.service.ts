import {Injectable} from '@angular/core';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';

@Injectable()
export class MessageService {

  optionSuccess = {
    nzStyle: {
      backgroundColor: '#F5F5F5',
      border: '1px solid green',
      boxShadow: '0 4px 12px rgba(87,199,118, 0.15)',
      zIndex: 10000
    }
  };

  optionError = {
    nzStyle: {
      backgroundColor: '#F5F5F5',
      border: '1px solid red',
      boxShadow: '0 4px 12px rgba(245,34,45, 0.15)',
      zIndex: 10000
    }
  };

  optionWaring = {
    nzStyle: {
      backgroundColor: '#F5F5F5',
      border: '1px solid #FAAD14',
      boxShadow: '0 4px 12px rgba(250,173,20, 0.15)',
      zIndex: 10000
    }
  };


  option = {
    nzStyle: {
      backgroundColor: '#F5F5F5',
      border: '1px solid #CCCCCC',
      zIndex: 10000
    }
  };

  constructor(private message: NzMessageService, private notification: NzNotificationService) {
  }

  /**
   * 一般提示
   * @param {string} message
   */
  info(message: string) {
    this.message.info(message, {});
    console.log(message);
  }

  notifyInfo(title: string, message: string, option?: {}) {
    this.notification.info(title, '<p class="app-info">' + message + '</p>', option === undefined ? this.option : option);
    console.log(message);
  }

  /**
   * 警告提示
   * @param {string} message
   */
  warning(message: string) {
    this.message.warning(message);
    console.log(message);
  }

  notifyWarning(title: string, message: string, option?: {}) {
    this.notification.warning(title, '<p class="app-waring">' + message + '</p>', option === undefined ? this.optionWaring : option);
    console.log(message);
  }


  /**
   * 错误提示
   * @param {string} message
   */
  error(message: string) {
    this.message.error(message, {nzDuration: 100000});
    console.log(message);
  }

  notifyError(title: string, message: string, option?: {}) {
    this.notification.error('<p class="app-error">' + title + '</p>',
      '<p class="app-error">' + message + '</p>', option === undefined ? this.optionError : option);
    console.log(message);
  }

  /**
   * 成功提示
   * @param {string} message
   */
  success(message: string) {
    this.message.success(message);
    console.log(message);
  }

  notifySuccess(title: string, message: string, option?: {}) {
    this.notification.success(title, '<p class="app-success">' + message + '</p>',
      option === undefined ? this.optionSuccess : option);
    console.log(message);
  }

  /**
   * loading
   * @param {string} message
   * @param {number} durating
   * @returns {string}
   */
  loading(message: string, durating?: number) {
    console.log(message);
    return this.message.loading(message, {nzDuration: 0}).messageId;
  }

  /**
   * 清除loading
   * @param id
   */
  removeLoading(id: any) {
    this.message.remove(id);
  }

}
