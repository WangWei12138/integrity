import {Resolve} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {Observable} from 'rxjs/Observable';
import {TreeData} from '../ui/tree/tree.component';
import {environment} from '../../environments/environment';
import {DataService, Response} from '../service/data.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TreeResolve implements Resolve<any> {

  constructor(private data: DataService) {
  }

  /**
   * 先获得的TreeData后再进入页面
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<TreeData> | Promise<TreeData> | TreeData}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('tree resolve');
    this.data.showProgress();
    const id = route.params['id'],
      typeId = route.params['type'],
      typeName = this.data.getTypeName(typeId),
      treeLoadUrl = this.data.getTreeLoadingUrl(id),
      typeConfig = environment.query.types.find(type => type.name === typeName),
      typeChildFields = typeConfig['childFields'] as Array<string>,
      childIssueUrl = environment.query.childUrl;
    return this.data.get(treeLoadUrl).toPromise().then((res: Response) => {
      const treeData = res.success ? res.data : [],
        ids = [],
        fields = typeChildFields.join(',');
      this.getTreeChildId(treeData, ids);
      const childIssueUrls = this.data.formatStr(childIssueUrl, ['ids', 'fields'], [ids.join(','), fields]);
      return {tree: treeData, childUrl: childIssueUrls, childFields: typeChildFields};
    });
  }

  getTreeChildId(treeData: Array<any>, ids: Array<any>) {
    treeData.forEach(data => {
      ids.push(data.id);
      if (data.children && data.children.length > 0) {
        this.getTreeChildId(data.children, ids);
      }
    });
  }

}



