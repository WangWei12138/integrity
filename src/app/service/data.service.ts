import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
declare var $: any;
@Injectable()
export class DataService {

  types: Array<any>;    // 加载环境变量Types
  projects: Array<any>; // 加载环境变量Project
  relationshipUrl: Object;  // 加载环境变量Relationship的URL
  treeUrl: Object;          // 加载环境变量Tree的URL
  progress: EventEmitter<boolean> = new EventEmitter<boolean>(); // 用于控制进度条是否显示

  /**
   * 加载好环境变量，便于后续代码简单化
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
    this.types = environment.types;
    this.projects = environment.projects;
    this.relationshipUrl = environment.url.relationship;
    this.treeUrl = environment.url.tree;
  }

  /*-----------------------------------以下为获得Query的URL操作---------------------------------------*/

  getQueryUrl(url: string, type: string, fields: string, project?: string): string {
    console.log(`getTableData ${url} on type ${type} in project ${project}`);
    let queryFilter = `(field[Type]=${type})`;
    if (project !== undefined && project.length > 0) {
      queryFilter = queryFilter + ` and (field[Project]=${project})`;
    }
    return this.formatStr(url, ['query', 'fields'], [`(${queryFilter})`, fields]);
  }

  /*-----------------------------------以下为获得Issue的Http操作---------------------------------------*/

  getIssueById(url: string, fields: Array<string>, richFields: Array<any>, id: string)
    : Observable<Object> {
    console.log(`getIssue ${url} on fields ${fields} and richFields ${richFields}`);
    url = this.formatStr(url, ['id', 'fields', 'richFields'], [id, fields.join(','), richFields.join(',')]);
    return this.http.get(url);
  }


  /*-----------------------------------以下为获得Tree操作的URL---------------------------------------*/

  getTreeLoadingUrl(id: string): string {
    return this.formatStr(this.treeUrl['load'], ['id'], [id]);
  }

  getTreeAddUrl(parentId: string, insertLocation: string, fieldValue: Object): string {
    return this.formatStr(this.treeUrl['add'], ['parentId', 'insertLocation', 'fieldValue'],
      [parentId, insertLocation, JSON.stringify(fieldValue)]);
  }

  getTreeUpdateUrl(id: string, fieldValue: Object) {
    return this.formatStr(this.treeUrl['update'], ['id', 'fieldValue'],
      [id, JSON.stringify(fieldValue)]);
  }

  getTreeRemoveUrl(id: string) {
    return this.formatStr(this.treeUrl['remove'], ['id'], [id]);
  }

  /*-----------------------------------以下为Http操作---------------------------------------*/

  get(url: string): Observable<Object> {
    return this.http.get(url);
  }

  post(url: string, body: any): Observable<Object> {
    return this.http.post(url, body);
  }

  /**
   * 通过Url请求获得数据
   * @param {string} url
   * @param {Array<string>} fields
   * @param {Array<string>} values
   * @param {string} method
   * @param {{}} body
   * @returns {Observable<any>}
   */
  getDataByUrl(url: string, fields: Array<string>, values: Array<string>, method?: string, body?: {}): Observable<any> {
    url = this.formatStr(url, fields, values);
    if (method && method === 'post') {
      return this.http.post(url, body === undefined ? {} : body);
    } else {
      return this.http.get(url);
    }
  }

  /*-----------------------------------字符串格式化替换---------------------------------------*/

  /**
   * 字符串格式化替换
   * @param {string} str
   * @param {Array<string>} fields
   * @param {Array<string>} values
   * @returns {string | any | null}
   */
  formatStr(str: string, fields: Array<string>, values: Array<string>): string | any | null {
    fields.forEach(field => str = str.replace('{' + field + '}', values[fields.indexOf(field)]));
    return str;
  }

  /*---------------------------以下用于控制loading等待是否显示，可用EventEmit触发------*/

  toggleIssueLoading(show: boolean) {
    if (show) {
      $('#issue-wait-img').show();
    } else {
      $('#issue-wait-img').hide();
    }

  }

  /*---------------------------以下为深拷贝工具，主要时为了在不修改环境变量的情况下，改变参数-----------------------------------------*/

  deepCloneObj(obj: any) {
    return jQuery.extend(true, {}, obj);
  }

  deepCloneArray(array: any) {
    return jQuery.extend(true, [], array);
  }

  /*---------------------------以下用于控制进度条显示与否-----------------------------------------*/

  showProgress() {
    this.progress.emit(true);
  }

  hideProgress() {
    this.progress.emit(false);
  }

  /*---------------------------以下用于获得Type或Project的ID和Name-----------------------------------------*/

  getId(data: Array<any>, name: string): any {
    return data.find(d => d.name === name);
  }

  getName(data: Array<any>, id: string): any {
    return data.find(d => d.id === id);
  }

  getTypeId(name: string): string {
    return this.getId(this.types, name).id;
  }

  getTypeName(id: string): string {
    return this.getName(this.types, id).name;
  }

  getProjectId(name: string): string {
    return this.getId(this.projects, name).id;
  }

  getProjectName(id: string): string {
    return this.getName(this.projects, id).name;
  }

  getChildTypeId(id: string): string {
    return this.getName(this.types, id).childId;
  }

  getChildTypeName(id: string): string {
    return this.getName(this.types, this.getChildTypeId(id));
  }

}

export interface Response {
  success: boolean;
  data: any;
}
