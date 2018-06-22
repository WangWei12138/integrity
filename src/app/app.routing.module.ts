import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IssueComponent} from './home/issue/issue.component';
import {DocComponent} from './home/doc/doc.component';
import {LoginGuard} from './shared/login-guard';
import {LoginComponent} from './login/login.component';
import {TreeResolve} from './shared/tree-resolve';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {QueryComponent} from './home/query/query.component';
import {DashboardResolve} from './shared/dashboard-resolve';
import {IssueResolve} from './shared/issue-resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'dashboard/:type',
    component: DashboardComponent,
    canActivate: [LoginGuard],
    resolve: {dashboard: DashboardResolve}
  }, {
    path: 'query/:type',
    component: QueryComponent,
    canActivate: [LoginGuard]
  }, {
    path: 'query/:type/:project',
    component: QueryComponent,
    canActivate: [LoginGuard]
  }, {
    path: 'issue/:type/:id',
    component: IssueComponent,
    canActivate: [LoginGuard],
    resolve: {issue: IssueResolve}
  }, {
    path: 'doc/:type/:id',
    component: DocComponent,
    children: [{
      path: 'tree/:type/:id',
      component: IssueComponent,
      resolve: {issue: IssueResolve}
    }],
    resolve: {tree: TreeResolve}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginGuard,
    DashboardResolve,
    IssueResolve,
    TreeResolve,
  ]
})
export class AppRoutingModule {

}
