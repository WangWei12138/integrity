import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

declare var $: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, AfterViewInit {

  @Input() config: TreeConfig; // tree config

  // tree model
  treeModal;

  currentSelect: Object;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initTreeData();
  }

  /**
   * 获得Tree DOM
   * @returns {any}
   */
  getTree() {
    return this.treeModal === undefined ? $('#' + this.config.domId) : this.treeModal;
  }

  /**
   * 初始化Tree的数据
   */
  initTreeData() {
    console.log('tree component');
    const url = this.config.url,
      method = this.config.method,
      body = this.config.body === undefined ? {} : this.config.body;
    // if (url !== undefined) {
    //   console.log(method);
    //   const queryData = (method !== undefined && method === 'post') ? this.http.get(url, body) : this.http.get(url);
    //   queryData.subscribe(
    //     res => {
    //       if (res['success']) {
    //         this.config.data = res['data'];
    //         this.initTreeBody();
    //       }
    //     }
    //   );
    // } else {
    //   this.initTreeBody();
    // }
    if (!this.config.method) {
      this.config.method = 'get';
    }
    this.initTreeBody();
  }

  /**
   * 初始化Tree组建
   * 初始化了两个事件：
   * (1) 点击事件：点击后，如果是Leaf，则加载外部Issue，如果是Parent，则先展开，再加载外部Issue
   * (2) 拖拽事件
   */
  initTreeBody() {
    this.getTree();
    // 初始化点击事件,如果没有声明，则只做toggle操作，如果声明了，在点击Node时需要加载外部事件
    if (this.config.onClickEvent === undefined) {
      this.config['onClick'] = (node) => {
        if (node.children !== undefined) {
          this.toggle(node);
        } else {
          console.log(`nothing to do for node : ${node}`);
        }
        this.currentSelect = node.id;
      };
    } else {
      this.config['onClick'] = (node) => {
        if (node.children !== undefined) {
          // this.toggle(node);
        }
        if (node.id !== this.currentSelect) { // 防止多次重复加载事件
          this.config.onClickEvent(node);
          this.currentSelect = node.id;
        }
      };
    }
    // 初始化拖拽事件
    if (this.config.onBeforeDropEvent === undefined) {
      this.config['onBeforeDrop'] = (target, source, point) => {
        console.log('BeforeDrop: ' + target + ',' + source + ',' + point);
      };
    } else {
      this.config['onBeforeDrop'] = (target, source, point) => {
        return this.config.onBeforeDropEvent(target, source, point);  // 返回true , false,
      };
    }

    // if (!this.config.loadFilter) {
    //   this.config.loadFilter = (res) => {
    //     if (res['success']) {
    //       return res['data'];
    //     } else {
    //       return [];
    //     }
    //   };
    // }
    delete this.config.url;
    delete this.config.method;
    this.getTree().tree(this.config);
  }

  /**
   * 重新加载数据
   * @param {Array<TreeData>} data
   */
  loadData(data: Array<TreeData>) {
    this.getTree().tree('loadData', data);
  }

  /**
   * 得到选中的节点
   * @returns {any}
   */
  getSelected(): any {
    return this.getTree().tree('getSelected');
  }

  /**
   * 选中节点
   * @param {number} id
   * @returns {any}
   */
  selected(id: number): any {
    const node = this.find(id);
    this.getTree().tree('select', node.target);
    this.expandTo(node);
    return node;
  }

  /**
   * 多选节点
   * @param {Array<number>} ids
   * @returns {Array<any>}
   */
  multiSelected(ids: Array<number>): Array<any> {
    const nodes = [];
    ids.forEach(id => {
      nodes.push(this.getTree().tree('select', this.find(id).target));
    });
    return nodes;
  }

  /**
   * 通过ID获得Parent节点
   * @param {number} targetId
   * @returns {any}
   */
  getParentById(targetId: number): any {
    return this.getTree().tree('getParent', this.find(targetId).target);
  }

  /**
   * 获得Parent节点
   * @param target
   * @returns {any}
   */
  getParent(target: any): any {
    return this.getTree().tree('getParent', target);
  }

  /**
   * 获得根节点
   * @returns {any}
   */
  getRoot(): any {
    return this.getTree().tree('getRoot');
  }

  /**
   * 展开或收起到指定节点
   * @param node
   */
  toggle(node) {
    this.getTree().tree('toggle', node.target);
    console.log(`toggle for node : ${node}`);
  }

  /**
   * 展开到指定节点
   * @param node
   */
  expand(node) {
    this.getTree().tree('expand', node.target);
    console.log(`expand for node : ${node}`);
  }

  /**
   * 收起到指定节点
   * @param node
   */
  collapse(node) {
    this.getTree().tree('collapse', node.target);
    console.log(`collapse for node : ${node}`);
  }

  /**
   * 全部展开
   * @param node
   */
  expandAll(node) {
    this.getTree().tree('expandAll', node.target);
    console.log(`expandAll for node : ${node}`);
  }

  /**
   * 全部收起
   * @param node
   */
  collapseAll(node) {
    this.getTree().tree('collapseAll', node.target);
    console.log(`collapseAll for node : ${node}`);
  }

  /**
   * 展开到指定节点
   * @param node
   */
  expandTo(node) {
    this.getTree().tree('expandTo', node.target);
    console.log(`expandTo for node : ${node}`);
  }

  /**
   * 插入节点，并展开到当前节点
   * @param data
   * @param {number} targetId
   * @param {string} location
   */
  insert(data: any, targetId: number, location: string) {
    let node;
    if (targetId === undefined || targetId === null) {
      this.insertNode({data: data});
      node = this.find(targetId);
    } else {
      if (location === 'before') {
        this.insertNode({before: node.target, data: data});
      } else if (location === 'after') {
        this.insertNode({after: node.target, data: data});
      }
      this.expandTo(node);
    }
  }

  /**
   * 插入节点
   * @param {Object} params : {before: target, after: target, data: TreeData}
   */
  private insertNode(params: Object) {
    this.getTree().tree('insert', params);
    console.log(`insert node : ${params}`);
  }

  /**
   * 查询节点
   * @param {number} targetId
   * @returns {any}
   */
  find(targetId: number) {
    console.log(`find item : ${targetId}`);
    return this.getTree().tree('find', targetId);
  }

  /**
   * 删除节点
   * @param {number} targetId
   */
  remove(targetId: number) {
    this.getTree().tree('remove', this.find(targetId).target);
    console.log(`remove item : ${targetId}`);
  }

  /**
   *
   * @param {TreeData} param: (target,id,text,iconCls,checked, etc.)
   */
  update(param: TreeData) {
    this.getTree().tree('update', param);
    console.log(`update node with param : ${param}`);
  }

  /**
   * 获得子节点
   * @param {number} targetId
   */
  getChildren(targetId: number) {
    this.getTree().tree('getChildren', this.find(targetId).target);
    console.log(`getChildren for target : ${targetId}`);
  }
}

export interface TreeConfig {
  domId: string;
  // url 与 data 二选一
  url?: string;
  // method: get, post
  method?: string;
  // method 为post时的查询参数
  body?: Object;
  // data 与 url 二选一
  data?: Array<TreeData> | TreeData;
  // 是否显示单选框
  checkbox?: boolean;
  // 定义是否只在叶节点前显示 checkbox
  onlyLeafCheck?: boolean;
  // animate 展开是否显示动画
  animate?: boolean;
  // 是否显示连线
  lines?: boolean;
  // 是否可拖拽
  dnd?: boolean;
  // loadFilter 加载数据后，用那部分数据
  loadFilter?: Function;
  // click 事件
  onClickEvent?: Function;
  // 拖拽前事件
  onBeforeDropEvent?: Function;
}

export interface TreeData {
  // item id
  id?: number;
  pid?: number;
  // item 显示字段
  text?: string;
  // item的图标
  iconCls?: string;
  // 节点状态， 'open' 或 'closed'，默认是 'open'
  state?: string;
  // 给一个节点追加的自定义属性。
  attributes?: Object;
  // 指示节点是否被选中
  checked?: boolean;
  // item 子集
  children?: Array<TreeData>;
  // target
  target?: Object;
}
