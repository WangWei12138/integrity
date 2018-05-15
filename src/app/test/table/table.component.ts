import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()
  public columns: Array<string>;
  @Input()
  public url: string;
  @Input()
  public method: string;
  @Input()
  public classes: string;
  @Input()
  public pageSize: number;
  @Input()
  public height: number;
  @Input()
  public sidePagination: string;
  @Input()
  public pagination: boolean;
  @Input()
  public showColumns: boolean;
  @Input()
  public showRefresh: boolean;
  @Input()
  public showToggle: boolean;
  @Input()
  public singleSelect: boolean;
  @Input()
  public search: boolean;
  @Input()
  public responseHandler: any;
  @Input()
  public rowStyle: any;
  @Input()
  public sortable: boolean;
  @Input()
  public silentSort: boolean;

  private pageList: Array<number>;
  private pageNumber: number;
  private striped: boolean;
  private undefinedText: string;
  private idField: string;

  @Input()
  public showEdit: boolean;
  @Input()
  public showBatchEdit: boolean;
  @Input()
  public showAdd: boolean;
  @Input()
  public showRemove: boolean;
  @Input()
  public showViewDocument: boolean;
  @Input()
  public showUp: boolean;
  @Input()
  public showDown: boolean;

  public selected: Array<any>;

  private tableModal: JQuery<Element>;

  public filterValue: string;

  public searchHide = false;


  constructor(public http: HttpClient, public router: Router) {
  }

  ngOnInit() {
    this.selected = [];
    this.init(); // 初始化参数
    this.tableModal = $('#table');
    this.tableModal.bootstrapTable({
      url: this.url,                              // 查询数据的地址
      // data: environment.fdsParams.data,        // 离线数据
      method: this.method,                        // 查询数据的Method
      columns: this.columns,                      // 查询数据的列
      classes: this.classes,                      // table的Class样式
      height: this.height,                        // Table的高度
      undefinedText: this.undefinedText,          // 数据为undefined时显示的字符串
      striped: this.striped,                      // 隔行变色
      pagination: this.pagination,                // 是否分页
      pageSize: this.pageSize,                    // 每页条数
      pageNumber: this.pageNumber,                // 初始页码
      pageList: this.pageList,                    // 分页List
      sidePagination: this.sidePagination,        // 表格分页的位置,server/client
      idField: this.idField,                      // 标识哪个字段为id主键
      showColumns: this.showColumns,              // 显示隐藏列
      showRefresh: this.showRefresh,              // 显示刷新按钮
      showToggle: this.showToggle,                // 是否显示切换视图（table/card）按钮
      singleSelect: this.singleSelect,            // 复选框只能选择一条记录
      search: this.search,                        // 是否显示右上角的搜索框
      sortable: this.sortable,
      silentSort: this.silentSort,
      formatLoadingMessage: this.loadingMessage,
      formatNoMatches: this.noMatches,
      responseHandler: this.responseHandler,
      toolbar: '#toolbar',
      silent: true,                               // 刷新事件必须设置
      onCheck: (row) => {
        this.selected.push(row);
        return false;
      },
      onUncheck: (row) => {
        const index = this.selected.indexOf(row);
        if (index > -1) {
          this.selected.splice(index, 1);
        }
        return false;
      },
      onCheckAll: (rows) => {
        this.selected = this.selected.concat(rows);
        return false;
      },
      onUncheckAll: (rows) => {
        this.selected = [];
        return false;
      },
      onSearch: function (text) {
        console.log(text);
        return true;
      }
    });


    // let body = new HttpParams();
    // body = body.set('query', '1');
    // body = body.set('fields', JSON.stringify(['1', '2']));
    // this.http.post('/rest/post', {query: '1', fields: ['1', 2]}).subscribe(res => console.log(res));

  }

  private loadingMessage() {
    return 'Please wait, loading...';
  }

  private noMatches() {
    return 'No qualifying records';
  }


  private init() {
    console.log('init table');
    // 样式
    this.method = this.method === undefined ? 'get' : this.method;
    this.classes = this.classes === undefined ? 'table table-bordered table-condensed table-hover table-responsive' : this.classes;
    this.striped = true;
    this.undefinedText = '-';
    this.height = this.height === undefined ? 500 : this.height;

    // 分页
    this.pagination = this.pagination === undefined ? true : this.pagination;
    this.pageSize = this.pageSize === undefined ? 50 : this.pageSize;
    this.pageList = this.pageSize === undefined ? [50, 100, 200, 500] :
      [this.pageSize, this.pageSize * 2, this.pageSize * 4, this.pageSize * 10];
    this.sidePagination = this.sidePagination === undefined ? 'client' : this.sidePagination;
    this.pageNumber = 1;

    this.idField = 'ID';
    this.showColumns = this.showColumns === undefined ? true : this.showColumns;
    this.showRefresh = this.showRefresh === undefined ? true : this.showRefresh;
    this.showToggle = this.showToggle === undefined ? true : this.showToggle;
    this.singleSelect = this.singleSelect === undefined ? false : this.singleSelect;
    this.search = this.search === undefined ? true : this.search;
    this.sortable = this.sortable === undefined ? true : this.sortable;
    this.silentSort = this.silentSort === undefined ? true : this.silentSort;
    this.responseHandler = this.responseHandler === undefined ? function (res) {
      return {
        data: res.data
      };
    } : this.responseHandler;
  }

  public onAdd() {

  }

  public onDelete() {
    const ids = this.selected.map(select => select.ID);
    console.log('Going to delete items : ' + ids);
    this.http.get('/rest/delete?ids=' + ids.join(',')).subscribe(
      res => {
        if (res['success'] = true) {
          this.tableModal.bootstrapTable('remove', {field: 'ID', values: ids});
        } else {
          window.alert('Count not delete this items:' + res['error']);
        }
      },
      () => window.alert('Please keep network connection!'),
      () => console.log('end')
    );
  }

  public onEdit() {

  }

  public onBacthEdit() {

  }

  public onViewDocument() {
    window.open('http://localhost:4200/tree/' + this.selected[0].ID);
  }

  public onMoveUp(table: any) {
    const trSelect = $(table).find('tbody tr.selected');
    for (let i = 0; i < trSelect.length; i++) {
      const thisTr = $(trSelect[i]);
      let prevTr = thisTr.prev();
      while (prevTr.hasClass('selected')) {
        prevTr = prevTr.prev();
      }
      prevTr.before(thisTr);
    }
  }

  public onMoveDown(table: any) {
    const trSelect = $(table).find('tbody tr.selected');
    for (let i = 0; i < trSelect.length; i++) {
      const thisTr = $(trSelect[i]);
      let nextTr = thisTr.next();
      while (nextTr.hasClass('selected')) {
        nextTr = nextTr.next();
      }
      nextTr.after(thisTr);
    }
  }

  public onFilter(table: any, filter: any) {
    this.filterValue = 'project';
  }

  public showSearch() {
    this.searchHide = !this.searchHide;
  }

  public onSearch(value: string, table: Element): any {
    if (value === undefined || value.length === 0) {
      return;
    }
    console.log('search : ' + value + ' from table ' + table);
    const values = value.split('and');
    const filter = {};
    for (let i = 0; i < values.length; i++) {
      if (values[i].indexOf('=') >= 0) {
        const valList = values[i].split('=');
        filter[valList[0].toLowerCase().trim()] = valList[1].trim();
      } else {
        return 'search value format is not support!';
      }
    }
    console.log(filter);
    const trList = $(table).find('tbody tr');
    /*for (let i = 0; i < trList.length; i++) {
      const tr = trList[i];
      const tdList = $(tr).find('td');
    }*/
    const datas = this.tableModal.bootstrapTable('getData');
    const array = [];
    for (let i = 0; i < datas.length; i++) {
      let has = false;
      const data = datas[i];
      for (let j = 0; j < this.columns.length; j++) {
        const field = this.columns[j]['field'];
        const fieldValue = data[field];
        if (field !== undefined && filter[field.toLowerCase()] !== undefined && filter[field.toLowerCase()].indexOf(fieldValue) >= 0) {
          array.push(i);
          has = true;
          break;
        }
      }
      if (has) {
        break;
      }
    }
    for (let i = 0; i < trList.length; i++) {
      if (array.indexOf(i) >= 0) {

      } else {
        $(trList[i]).hide();
      }
    }
    // const filter = {};
    // const field = value.split('=')[0].trim();
    // const v = value.split('=')[1].trim();
    // filter[field] = v;
    // this.tableModal.bootstrapTable('filterBy', filter);
  }

  public onKeyPress(event: any, table: any, value: string) {
    if (event.keyCode === 13) {
      event.preventDefault();
      // 执行查询，查询完毕后
      console.log(event.keyCode);
      this.onSearch(value, table);
      this.searchHide = !this.searchHide;

    }
  }
}
