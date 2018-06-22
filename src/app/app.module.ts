import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NgZorroAntdModule, NZ_I18N, NZ_NOTIFICATION_CONFIG} from 'ng-zorro-antd';
import {TableComponent} from './ui/table/table.component';
import {DataService} from './service/data.service';
import {TreeComponent} from './ui/tree/tree.component';
import {HistoryComponent} from './ui/history/history.component';
import {PanelComponent} from './ui/panel/panel.component';
import {FooterComponent} from './home/footer/footer.component';
import {NavbarComponent} from './home/navbar/navbar.component';
import {CookieModule} from 'ngx-cookie';
import {LoginService} from './service/login.service';
import {LoginComponent} from './login/login.component';
import {MessageService} from './service/message.service';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {ChartBarComponent} from './ui/chart/chart-bar/chart-bar.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {QueryComponent} from './home/query/query.component';
import {IssueComponent} from './home/issue/issue.component';
import {DocComponent} from './home/doc/doc.component';
import {FolderComponent} from './home/folder/folder.component';
import {AppRoutingModule} from './app.routing.module';
import {TreeResolve} from './shared/tree-resolve';
import {LoginGuard} from './shared/login-guard';
import {ProgressComponent} from './ui/progress/progress.component';
import {ImgPipe} from './pipes/img.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TreeComponent,
    HistoryComponent,
    PanelComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    ChartBarComponent,
    QueryComponent,
    IssueComponent,
    DocComponent,
    FolderComponent,
    ProgressComponent,
    ImgPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // form
    AppRoutingModule,     // Router
    HttpClientModule,                 // http
    NgZorroAntdModule.forRoot(),
    CookieModule.forRoot(),
    NgxEchartsModule
  ],
  providers: [
    DataService,
    LoginService,
    MessageService,
    {provide: NZ_NOTIFICATION_CONFIG, useValue: {nzTop: '50px'}},
    {provide: NZ_I18N, useValue: en_US},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
