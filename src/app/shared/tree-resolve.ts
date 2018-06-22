import {Resolve} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {Observable} from 'rxjs/Observable';
import {TreeData} from '../ui/tree/tree.component';
import {environment} from '../../environments/environment';
import {DataService, Response} from '../service/data.service';
import {Injectable} from '@angular/core';
@Injectable()
export class TreeResolve implements Resolve<TreeData> {

  constructor(private data: DataService) {
  }

  /**
   * 先获得的TreeData后再进入页面
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<TreeData> | Promise<TreeData> | TreeData}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TreeData> | Promise<TreeData> | TreeData {
    console.log('tree resolve');
    this.data.showProgress();
    const id = route.params['id'],
      treeLoadUrl = this.data.getTreeLoadingUrl(id);
    return this.data.get(treeLoadUrl).toPromise().then((res: Response) => {
      return res.success ? res.data : [];
    });
  }

}



