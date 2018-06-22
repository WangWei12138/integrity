import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  // 用于显示Menu
  menuList: Array<any>;

  constructor(private login: LoginService, private route: Router, private data: DataService) {
  }

  /**
   * 初始化时加载环境变量
   */
  ngOnInit() {
    this.menuList = environment.menus;
    this.menuList.map(
      menu => {
        const children = menu['children'] as Array<any>;
        children.map(child => {
          child['id'] = this.data.getTypeId(child['name']);
        });
      }
    );
  }

  /**
   * 在页面加载完毕后，判断是否隐藏Menu
   */
  ngAfterViewInit() {
    this.login.isLogin();
  }

  /**
   * 注销登陆
   * @param event
   */
  logout(event: any) {
    this.login.doLogout({username: this.login.getName()},
      () => {
        this.login.removeLogin();
        this.route.navigate(['/login']);
      }, () => {
        this.login.removeLogin();
        this.route.navigate(['/login']);
      }, () => {
        this.login.removeLogin();
        this.route.navigate(['/login']);
      });
  }

  goTo(event: any, id: string) {
    this.route.navigate(['/dashboard', id]);
  }
}
