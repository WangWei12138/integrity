import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../service/login.service';
import {MessageService} from '../service/message.service';
import {DataService} from '../service/data.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private login: LoginService, private route: Router, private msg: MessageService, private data: DataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.data.showProgress();
    const hasLogin = this.login.isLogin();
    if (!hasLogin) {
      this.msg.notifyInfo('Tip', 'Session expired, please log in, thank you!');
      this.route.navigate(['/login']);
    }
    return hasLogin;
  }

}
