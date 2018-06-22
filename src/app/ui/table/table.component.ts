import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DataService} from '../../service/data.service';
import {suffix_path} from '../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() config: TableConfig; // table初始化参数;
  @Input() url: string; // table初始化Url; 声明这个参数为了当url发生变化时，触发新的查询
  @Input() columns: Array<Column>; // table初始化Url; 声明这个参数为了当url发生变化时，触发新的查询

  selected = []; // 选中数据;

  tableModal: any;  // table jQuery<Element>;

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
  }


  ngOnInit() {
    console.log(this.config);
    this.initParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.dataService.showProgress();
    if (changes['url'] && !changes['url'].firstChange) {
      this.config.url = changes['url'].currentValue;
    }
    if (changes['columns'] && !changes['columns'].firstChange) {
      this.config.columns = changes['columns'].currentValue;
      if (this.config.columns[0] && this.config.columns[0]['checkbox'] !== undefined) {

      } else {
        this.config.columns.unshift({checkbox: true});
      }
    }
    $('#' + this.config.domId).bootstrapTable('destroy');
    this.ngAfterViewInit();
  }

  /**
   * 在页面元素生成后，进行bootstrapTable操作
   */
  ngAfterViewInit() {
    this.dataService.showProgress();
    this.tableModal = $('#' + this.config.domId);
    console.log('table');
    this.tableModal.bootstrapTable(this.config);
    this.cd.detectChanges();
  }

  /**
   * 点击按钮事件
   * @param event
   * @param action:
   * (1) add: 新增数据，后台交互成功返回一个数据对象后，将该数据压入表格中；
   * (2) delete: 删除数据，后台交互成功返回true后，将该数据从表格中删除
   * (2) edit: 修改数据，后台交互成功返回修改后的数据，将在表格中更新数据
   * (2) batchEdit: 批量修改数据，后台交互成功返回修改后的数据集合，将在表格中更新该数据集合
   * (3) view: 查看数据，无须返回，直接展示Issue界面即可
   * (4) viewDoc:查看Document结构数据，无须返回，直接展示Tree界面即可
   * (5) moveUp: 将选中数据向上移动，后台交互成功后返回True，移动数据
   * (6) moveDown: 将选中数据向下移动，后台交互成功后返回True，移动数据
   */
  onClickEvent(event: any, action: string) {
    console.log(`going to ${action} !`);
    let data: any;
    switch (action) {
      case 'add':
        data = this.config.addEvent(event); // 该返回值应该是一个对象，并将该数据压入表格中
        data ? this.insertData(data) : console.error(`failed to ${action}`);
        break;
      case 'delete':
        data = this.config.deleteEvent(event, this.selected); // 该返回值应该是false/true，并将选中数据删除
        const ids = this.selected.map(item => item[this.config.idField]);
        data ? this.deleteData(ids) : console.error(`failed to ${action} : ${JSON.stringify(ids)}`);
        break;
      case 'edit':
        data = this.config.editEvent(event, this.selected[0]);  // 返回更新后的数据，并更新表格中的数据
        data ? this.updateData(data) : console.error(`failed to ${action} : ${JSON.stringify(data)}`);
        break;
      case 'batchEdit':
        data = this.config.batchEditEvent(event, this.selected);  // 返回更新后的数据集合，并更新表格中的数据
        data ? this.updateDataList(data) : console.error(`failed to ${action} : ${JSON.stringify(data)}`);
        break;
      case 'view':
        data = this.config.viewEvent(event, this.selected[0]); // 无须返回，直接展示Issue信息即可
        break;
      case 'viewDoc':
        this.config.viewDocEvent(event, this.selected[0]);  // 无须返回，直接展示Tree结构即可
        this.uncheck(this.getIndex(this.selected[0]));
        break;
      case 'moveUp':
        this.config.moveUpEvent(event, this.selected);    // 返回true/false，再移动位置
        this.move('up');
        break;
      case 'moveDown':
        this.config.moveDownEvent(event, this.selected);  // 返回true/false，再移动位置
        this.move('down');
        break;
    }
  }

  /**
   * 移动Table中Data位置
   * @param {string} action
   */
  move(action: string) {
    const selectData = this.getSelectData(), allData = this.getData(), num = action === 'up' ? -1 : 1;
    let change = false;
    if (action === 'up') {
      for (let i = 0; i < selectData.length; i++) {
        const currentData = selectData[i], index = this.getIndex(currentData);
        currentData[0] = false;  // 取消选中
        if (index + num >= 0) {
          const targetData = allData[index + num];
          allData[index + num] = currentData;
          allData[index] = targetData;
          change = true;
        }
      }
    } else if (action === 'down') {
      for (let i = selectData.length - 1; i >= 0; i--) {
        const currentData = selectData[i], index = this.getIndex(currentData);
        currentData[0] = false;   // 取消选中
        if (index + num <= allData.length - 1) {
          const targetData = allData[index + num];
          allData[index + num] = currentData;
          allData[index] = targetData;
          change = true;
        }
      }
    }
    if (change) {
      this.loadData(allData);
    }
  }


  /**
   * 在以第个位置增加数据
   * @param {Object} data; 插入数据
   * @param {Object} index; 插入位置
   */
  insertData(data: Object, index?: number) {
    this.tableModal.bootstrapTable('insertRow', {index: index, row: data});
    this.uncheck(this.getIndex(data));  // 解决新增后选中的问题
    console.log(`success to add item : ${JSON.stringify(data)}!`);
  }

  /**
   * 删除数据
   * @param {Array<number>} values； 要删除的数据，当fieldName为空时，传递ID数据即可删除ID
   * @param {string} fieldName；  为空时删除ID
   */
  deleteData(values: Array<number>, fieldName?: string) {
    this.tableModal.bootstrapTable('remove', {field: fieldName ? fieldName : this.config.idField, values: values});
    this.selected = this.getSelectData();
    console.log(`success to remove item : ${JSON.stringify(values)}!`);
  }

  /**
   * 跟新数据
   * @param {Object} data
   */
  updateData(data: Object) {
    const index = this.getIndex(data);
    this.tableModal.bootstrapTable('updateRow', {index: index, row: data});
    this.uncheck(this.getIndex(data)); // 解决新增后选中的问题
    console.log(`success to update item : ${JSON.stringify(data)}!`);
  }

  /**
   * 批量跟新数据，不能与updateData一致，会出现问题（数据被删除）
   * @param {Array<Object>} dataList
   */
  updateDataList(dataList: Array<Object>) {
    const allData = this.getData();
    const newData = [];
    dataList.forEach(
      data => {
        for (let i = 0; i < allData.length; i++) {
          let data1 = allData[i];
          if (data1[this.config.idField] === data[this.config.idField]) {
            data1 = data;
            data1[0] = false;
            this.removeSelect(data1);
            console.log(`success to update item : ${JSON.stringify(data1)}!`);
            newData.indexOf(data1) >= 0 ? newData.push() : newData.push(data1);
            break;
          }
        }
      }
    );
    this.loadData(newData);
  }

  /**
   * 初始化表格参数
   */
  initParams() {
    this.config.method = this.config.method === undefined ? 'get' : this.config.method;
    this.config.classes = this.config.classes ? 'table table-bordered table-condensed table-hover table-responsive' :
      this.config.classes;
    this.config.striped = true;
    this.config.undefinedText = '-';
    this.config.height = this.config.height === undefined ? 500 : this.config.height;
    delete this.config.height; // 删除高度
    // 分页
    this.config.pagination = this.config.pagination === undefined ? true : this.config.pagination;
    this.config.pageSize = this.config.pageSize === undefined ? 20 : this.config.pageSize;
    this.config.pageList = this.config.pageSize === undefined ? [50, 100, 200, 500] :
      [this.config.pageSize, this.config.pageSize * 2, this.config.pageSize * 4, this.config.pageSize * 10];
    this.config.sidePagination = this.config.sidePagination === undefined ? 'client' : this.config.sidePagination;
    this.config.pageNumber = 1;

    this.config.showColumns = this.config.showColumns === undefined ? true : this.config.showColumns;
    this.config.showRefresh = this.config.showRefresh === undefined ? true : this.config.showRefresh;
    this.config.showToggle = this.config.showToggle === undefined ? true : this.config.showToggle;
    this.config.singleSelect = this.config.singleSelect === undefined ? false : this.config.singleSelect;
    this.config.search = this.config.search === undefined ? true : this.config.search;
    this.config.sortable = this.config.sortable === undefined ? true : this.config.sortable;
    this.config.silentSort = this.config.silentSort === undefined ? true : this.config.silentSort;
    this.config.responseHandler = this.config.responseHandler === undefined ? (res) => {
        this.dataService.hideProgress();
        return {
          data: res.data
        };
      } : this.config.responseHandler;
    this.config.toolbar = this.config.toolbarId ? '#' + this.config.toolbarId : null;
    // 默认事件处理
    this.config.onCheck = this.config.onCheck ? this.config.onCheck : (row) => this.selected.push(row);
    this.config.onUncheck = this.config.onUncheck ? this.config.onUncheck : (row) => this.removeSelect(row);
    this.config.onCheckAll = this.config.onCheckAll ? this.config.onCheckAll : () => this.pushSelect();
    this.config.onUncheckAll = this.config.onUncheckAll ? this.config.onUncheck : () => this.removeAllSelect();

    this.config.idField = this.config.idField ? this.config.idField : 'ID';

    console.log('format');
    this.config.columns = this.config.columns.map(col => {
      if (col.field === 'ID') {
        col['formatter'] = (value, row, index, field) => {
          let type = row['Type'];
          type = this.dataService.getTypeId(type);
          return `<a target="_blank" href="${suffix_path}/issue/${type}/${value}">${value}</a>`;
        };
      }
      return col;
    });
    console.log(this.config);
    if (this.config.showCheckBox) {
      this.config.columns.unshift({checkbox: true});
    }
  }


  /**
   * 获得选中数据
   * @returns {Array<Object>}
   */
  getSelectData(): Array<Object> {
    return this.tableModal.bootstrapTable('getSelections');
  }


  /**
   * 重新Load数据
   * @param {Array<Object>} data
   */
  loadData(data: Array<Object>) {
    this.tableModal.bootstrapTable('load', data);
  }

  /**
   * 获得Table的数据
   * @returns {JQuery}
   */
  getData(): Array<Object> {
    return this.tableModal.bootstrapTable('getData');
  }

  /**
   * 取消选中
   * @param {number} index
   */
  uncheck(index: number) {
    this.tableModal.bootstrapTable('uncheck', index);
  }

  /**
   * 获得数据所在行
   * @param {Object} data
   */
  getIndex(data: Object) {
    const allData = this.getData();
    const select = allData.find(item => item[this.config.idField] === data[this.config.idField]);
    return allData.indexOf(select);
  }

  /**
   * 移除选中项
   * @param {Object} data
   */
  removeSelect(data: Object) {
    const select = this.selected.find(item => item[this.config.idField] === data[this.config.idField]);
    const index = this.selected.indexOf(select);
    if (index >= 0) {
      this.selected.splice(index, 1);
    }
  }

  /*
   * 将全部数据压入选中项
   */
  pushSelect() {
    this.selected = this.getData();
    this.selected.forEach(data => data[0] = true);
  }

  /**
   * 移除全部选中项
   */
  removeAllSelect() {
    this.selected = [];
    this.getData().forEach(data => data[0] = false);
  }
}

/**
 * 表格参数接口
 */
export interface TableConfig {
  domId: string; // domId
  columns: Array<Column>; // table的列配置
  idField?: string;   // 标识哪个字段为id主键
  toolbarId?: string;
  toolbar?: string;
  data?: Array<Object>; // table的数据，与url取其一
  url?: string; // table中data为空时，通过url获取数据
  method?: string;  // url获取数据的方法：post， get
  classes?: string; // table的class
  height?: number;  // 自定义高度
  undefinedText?: string; // 数据为undefined时用什么表示
  striped?: boolean;  // 是否用斑马线
  pagination?: boolean; // 是否启用分页
  pageSize?: number;  // 一页的条数
  pageNumber?: number;  // 起初页码
  pageList?: Array<number>; // 可调整的每页数量
  sidePagination?: string;  // 表格分页的位置,server/client
  silent?: boolean;  // 是否启动客户端分页
  maintainSelected?: boolean; // 设置为 true 在点击分页按钮或搜索按钮时，将记住checkbox的选择项。
  showColumns?: boolean;  // 显示隐藏列
  showRefresh?: boolean;   // 显示刷新按钮
  showToggle?: boolean;    // 是否显示切换视图（table/card）按钮
  showCheckBox?: boolean;
  singleSelect?: boolean;  // 复选框只能选择一条记录
  search?: boolean;   // 是否显示右上角的搜索框
  sortable?: boolean; // 是否启动排序
  silentSort?: boolean; // 是否启动客户端排序
  formatLoadingMessage?: string; // 在加载提示字段
  formatNoMatches?: string; // 没有数据提示信息
  responseHandler?: Function; // 加载到数据后，怎么取得数据
  onCheck?: Function;   // 点击Check事件
  onUncheck?: Function; // 取消Check事件
  onCheckAll?: Function; // 点击All Check事件
  uncheckAllEvent?: Function; // 取消All Check事件
  onUncheckAll?: Function;
  addEvent?: Function;
  editEvent?: Function;
  batchEditEvent?: Function;
  deleteEvent?: Function;
  viewEvent?: Function;
  viewDocEvent?: Function;
  moveUpEvent?: Function;
  moveDownEvent?: Function;
}

/**
 * 字段参数接口
 */
export interface Column {
  title?: string;
  field?: string;
  checkbox?: boolean;
  visible?: boolean;
  sortable?: boolean;
  formatter?: Function;
}
