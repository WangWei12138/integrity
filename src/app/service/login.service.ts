import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {DataService} from './data.service';

/**
 * Login工具类，只需要设置，移除和定时设置name,password和isLogin即可
 */
@Injectable()
export class LoginService {

  username: string;
  password: string;
  nameKey: string;
  pwdKey: string;
  loginUrl: string;
  logoutUrl: string;
  timeout: string;
  hasLogin: string;
  menuId: string;


  constructor(private cookie: CookieService, private dataService: DataService,
              private http: HttpClient) {
    this.username = environment.login.username;
    this.password = environment.login.password;
    this.loginUrl = environment.login.loginUrl;
    this.logoutUrl = environment.login.logoutUrl;
    this.timeout = environment.login.timeout;
    this.nameKey = environment.login.nameKey;
    this.pwdKey = environment.login.pwdKey;
    this.hasLogin = environment.login.hasLogin;
    this.menuId = '.hideMenu';
  }

  /***-----------------------------------------------------****/
  getPwd(): string {
    return this.cookie.get(this.pwdKey);
  }

  setPwd(pwd: string) {
    this.cookie.put(this.pwdKey, pwd);
  }

  removePwd() {
    this.cookie.remove(this.pwdKey);
  }

  /***-----------------------------------------------------****/
  getName() {
    return this.cookie.get(this.nameKey);
  }

  setName(name: string) {
    this.cookie.put(this.nameKey, name);
  }

  removeName() {
    this.cookie.remove(this.nameKey);
  }

  /***-----------------------------------------------------****/
  setLogin() {
    this.cookie.put(this.hasLogin, 'login', {expires: this.timeout});
  }

  removeLogin() {
    this.cookie.remove(this.hasLogin);
    this.isLogin();
  }

  isLogin(): boolean {
    const hasLogin = this.cookie.get(this.hasLogin) === undefined ? false : true;
    hasLogin ? $(this.menuId).show() : $(this.menuId).hide();
    return hasLogin;
  }

  doLogin(data: Object, successFn?: Function, failedFn?: Function, errorFn?: Function, completeFn?: Function) {
    const url = this.loginUrl, fields = [this.username, this.password],
      values = [data[this.username], data[this.password]];
    this.subscribeFn(this.getByUrl(url, fields, values), successFn, failedFn, errorFn, completeFn);
  }

  doLogout(data: Object, successFn?: Function, failedFn?: Function, errorFn?: Function, completeFn?: Function) {
    const url = this.logoutUrl, fields = ['username'],
      values = [data[this.username]];
    this.subscribeFn(this.getByUrl(url, fields, values), successFn, failedFn, errorFn, completeFn);
  }

  getByUrl(url: string, fields: Array<string>, values: Array<string>): Observable<Object> {
    return this.http.get(this.formatStr(url, fields, values));
  }

  /**
   * 在每次操作时，都调用这个即可
   * @param data
   */
  doCookie(data) {
    this.setPwd(data[this.password]);
    this.setName(data[this.username]);
  }

  /**
   * 持续将cookie设置成有效，即用户在操作，timeout延迟操作
   */
  operation() {
    const name = this.getName();
    if (name && name.length > 0) {
      this.setName(name);
    }
  }

  /***-----------------------------------------------------****/
  subscribeFn(obs: Observable<Object>, successFn?: Function, failedFn?: Function, errorFn?: Function, completeFn?: Function) {
    obs.subscribe(res => {
        if (res['success']) {
          if (successFn !== undefined) {
            successFn();
          }
        } else {
          if (failedFn !== undefined) {
            failedFn();
          }
        }
      },
      error => {
        if (errorFn !== undefined) {
          errorFn();
        }
      },
      () => {
        if (completeFn !== undefined) {
          completeFn();
        }
      });
  }

  /**
   * 字符串格式化替换
   * @param {string} str
   * @param {Array<string>} fields
   * @param {Array<string>} values
   * @returns {string | any | null}
   */
  public formatStr(str: string, fields: Array<string>, values: Array<string>): string | any | null {
    fields.forEach(field => str = str.replace('{' + field + '}', values[fields.indexOf(field)]));
    return str;
  }


}
