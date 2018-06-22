import {Resolve} from '@angular/router';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router/src/router_state';
import {Observable} from 'rxjs/Observable';
import {DataService, Response} from '../service/data.service';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PanelConfig} from '../ui/panel/panel.component';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class IssueResolve implements Resolve<any> {

  constructor(private data: DataService, private sanitizer: DomSanitizer) {
  }


  initIssueConfig(id: string, typeName: string, fields: Array<string>, richFields: Array<string>, issueUrl: string): Array<any> {
    this.data.toggleIssueLoading(true);
    const issueType = environment.issues.types.find(type => type.name === typeName),
      issueTabs = issueType.tabs;
    const newIssueTabs = this.data.deepCloneArray(issueTabs) as Array<any>;
    newIssueTabs.forEach(tab => {
      const fieldConfig = tab['fields'] as Array<any>,
        fieldType = tab['fieldType'] as number;
      if (!fieldType || fieldType === 0) {
        fieldConfig.forEach(
          f => {
            const name = f['field'], name1 = f['field1'], fieldTypeId = f['type'], fieldTypeId1 = f['type1'];
            if (!fieldTypeId) {
              fields.push(name);
            } else if (fieldTypeId && fieldTypeId === 1) {
              richFields.push(name);
            }
            if (name1) {
              f['half'] = true;
              if (!fieldTypeId1) {
                fields.push(name1);
              } else if (fieldTypeId1 && fieldTypeId1 === 1) {
                richFields.push(name1);
              }
            }
          }
        );
      } else if (fieldType && fieldType === 1) {
        // 得到查询的URl
        const configs = tab['configs'] as Array<any>;
        configs.forEach(config => {
          const conf = config['config'];
          const columns = conf['columns'].map(col => col.field);
          const fieldName = config['field'];
          conf['url'] = this.data.formatStr(environment.url.relationship.load, ['id', 'fields', 'name'],
            [id, columns.join(','), fieldName]);
        });

        console.log('Relationship:' + configs);
      } else if (fieldType && fieldType === 2) {
        // 得到少量数据，并得到查询的URl
        const configs = tab['configs'];
        configs.forEach(config => {
          // const conf = config['config'];
          config['url'] = this.data.formatStr(environment.url.history, ['id'], [id]);
        });
        console.log('History:' + configs);
      }
    });
    return newIssueTabs;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('issue resolve');
    this.data.showProgress();
    const id = route.params['id'],
      typeId = route.params['type'],
      typeName = this.data.getTypeName(typeId),
      // 查询常规字段
      fields = [],
      richFields = [],
      issueUrl = environment.issues.url,
      // 初始化Issue的Config配置参数
      issueTabs = this.initIssueConfig(id, typeName, fields, richFields, issueUrl);
    // 申明返回数据
    const panelConfig: PanelConfig = {
      id: id,
      type: typeName,
      tabs: issueTabs,
      name: ''
    };

    let issueData = {};

    let nameField: string;
    if (typeName.indexOf('Document') > 0) {
      nameField = 'Document Short Title';
      if (fields.indexOf(nameField) < 0) {
        fields.push(nameField);
      }
    } else if (typeName === 'Functional Design Spec') {
      nameField = 'Name';
      if (fields.indexOf(nameField) < 0) {
        fields.push(nameField);
      }
    }
    const queryUrl = this.data.formatStr(issueUrl, ['id', 'fields', 'richFields'], [id, fields.join(','), richFields.join(',')]);
    return this.data.get(queryUrl).toPromise().then(
      (res: Response) => {
        if (res.success) {
          issueData = res.data;
          issueTabs.forEach(tab => {
            const fieldConfig = tab['fields'] as Array<any>,
              fieldType = tab['fieldType'] as number;
            if (!fieldType || fieldType === 0) {
              fieldConfig.forEach(
                f => {
                  const name = f['field'], name1 = f['field1'], fieldTypeId = f['type'], fieldTypeId1 = f['type1'];
                  if (this.isHtml(issueData[name])) {
                    f['value'] = this.sanitizer.bypassSecurityTrustHtml(issueData[name]);
                    f['type'] = 1;
                  } else {
                    f['value'] = issueData[name];
                    f['type'] = 0;
                  }
                  if (name === nameField) {
                    panelConfig.name = f['value'];
                  }
                  if (name1) {
                    if (this.isHtml(issueData[name1])) {
                      f['value1'] = this.sanitizer.bypassSecurityTrustHtml(issueData[name1]);
                      f['type1'] = 1;
                    } else {
                      f['value1'] = issueData[name1];
                      f['type1'] = 0;
                    }
                    if (name1 === nameField) {
                      panelConfig.name = f['value'];
                    }
                  }
                }
              );
            }

          });
        }
        return panelConfig;
      }
    );
  }

  isHtml(str: string) {
    if ((str.indexOf('<') === 0) && (str.lastIndexOf('>') === str.length - 1)) {
      return true;
    }
    if (str.indexOf('<!-- MKS HTML -->') >= 0) {
      return true;
    }
    return false;
  }

}
