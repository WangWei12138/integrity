import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import {MessageService} from '../service/message.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// 动态Form表单
  validateForm: FormGroup;
  // 0 默认，1 登陆中, 2 登陆后
  status = 0;

  constructor(private fb: FormBuilder, private login: LoginService, private dataService: DataService,
              private route: Router, private msg: MessageService) {
  }

  ngOnInit(): void {
    this.dataService.hideProgress();
    this.validateForm = this.fb.group({
      username: [this.login.getName(), [Validators.required]],
      password: [this.login.getPwd(), [Validators.required]],
      remember: [true]
    });
    console.log(this.validateForm);
  }

  /**
   * 提交表单
   */
  submitForm(): void {
    // 1. 先进行Form的验证
    const controls = this.validateForm.controls, value = this.validateForm.value;
    if (controls !== undefined) {
      for (const key of Object.keys(controls)) {
        controls[key].markAsDirty();
        controls[key].updateValueAndValidity();
      }
    }
    // 2. 验证通过后在进行http通讯
    this.status = 1;
    console.log('to login');
    this.login.doLogin(value,
      () => {
        this.login.setName(value['username']);
        if (value['remember']) {
          this.login.setPwd(value['password']);
        }
        this.login.setLogin();
        // 完成后跳转
        this.route.navigate(['/dashboard', 'req']);
      },
      () => {
        this.validateForm.get('username')['msg'] = 'Please enter correct username!';
        this.validateForm.get('password')['msg'] = 'Please enter correct password!';
        this.msg.notifyError('Error', 'Please enter correct username and password');
        this.doCookie();
        this.status = 2;
      },
      () => {
        this.validateForm.get('password')['msg'] = 'Please ensure network connection!';
        this.msg.notifyError('Error', 'Please ensure network connection!');
        this.status = 2;
      },
      () => {
        this.status = 2;
      });

  }


  /**
   * 每次成功登陆后，记住用户名和密码
   */
  doCookie() {
    this.login.doCookie(this.validateForm.value);
  }

  /**
   * 忘记密码
   * @param event
   */
  forgotPwd(event: any) {
    this.login.removePwd();
  }


}
