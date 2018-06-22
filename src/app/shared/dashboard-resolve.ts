import {Params, Resolve, Router} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {Observable} from 'rxjs/Observable';
import {DataService, Response} from '../service/data.service';
import {DashboardConfig} from '../home/dashboard/dashboard.component';
import {environment} from '../../environments/environment';
import {LoginService} from '../service/login.service';
import {Injectable} from '@angular/core';
@Injectable()
export class DashboardResolve implements Resolve<DashboardConfig> {

  constructor(private data: DataService, private login: LoginService, private route: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<DashboardConfig> | Promise<DashboardConfig> | DashboardConfig {
    this.data.showProgress();
    console.log('dashboard resolve');
    // 路由参数
    const typeId = route.params['type'];
    // 获得Dashboard参数
    return this.getDashboardConfig(typeId);
  }

  /**
   *
   * 获得AssignedToMe数据
   * @param {string} typeName
   * @returns {DashboardConfig}
   */
  getDashboardConfig(typeId: string): Observable<DashboardConfig> | Promise<DashboardConfig> | DashboardConfig {
    // 预先声明返回数据
    const dashboardConfig: DashboardConfig = {columns: [], assignedToMe: [], chartConfig: {data: undefined}};
    // 环境变量

    const assignedToMe = environment.dashboard.assignedMe,
      url = assignedToMe.url,
      columns = assignedToMe.fields;

    dashboardConfig.columns = columns;  // 设置返回数据

    // 获得登陆用于
    const username = this.login.getName();
    // 拼接查询的url
    const fields = ['query', 'fields'],
      values = [`((field[Responsible]=${username}))`, columns.map(field => field.name).join(',')],
      queryUrl = this.data.formatStr(url, fields, values);

    // 执行AssignedToMe查询
    return this.data.get(queryUrl).toPromise().then(
      (res: Response) => {
        dashboardConfig.assignedToMe = res.success ? res.data : [];

        // 环境变量
        const chart = environment.dashboard.chart,
          chartUrl = chart.url,
          menuTypes = chart.types,
          menuType = chart.types.find(t => t.id === typeId),
          projects = menuType.projects.join(','),
          types = menuType.types.join(',');

        // 查询参数
        const chartFields = ['types', 'projects'],
          chartValues = [types, projects],
          chartQueryUrl = this.data.formatStr(chartUrl, chartFields, chartValues);

        // 执行Chart查询
        return this.data.get(chartQueryUrl).toPromise().then(
          (res1: Response) => {
            dashboardConfig.chartConfig = {
              data: res1.success ? res1.data : [],
              clickEvent: (event) => {
                const type = event.name, project = event.seriesName,
                  chartTypeId = this.data.getTypeId(type),
                  projectId = this.data.getProjectId(project);
                this.route.navigate(['/query', chartTypeId, projectId]);
              }
            };
            return dashboardConfig;
          }
        );
      }
    );
  }
}











