import {Component, ViewChild} from '@angular/core';
import {TableComponent, TableConfig} from './ui/table/table.component';
import {TreeConfig, TreeData} from './ui/tree/tree.component';
import {History} from './ui/history/history.component';
import {PanelConfig} from './ui/panel/panel.component';
import {DataService} from './service/data.service';
import {ProgressComponent} from './ui/progress/progress.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private data: DataService) {
    this.data.progress.subscribe(res => {
      if (res) {
        this.progress.showProgress();
      } else {
        this.progress.hideProgress();
      }
    });
  }

  @ViewChild('progress') progress: ProgressComponent;

  title = 'app';


  tabConfig: TableConfig = {
    domId: 'table',
    toolbarId: 'toolbar',
    columns: [
      {checkbox: true},
      {title: 'ID', field: 'id'},
      {title: 'Name', field: 'name'}
    ],
    data: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}],
    // pageSize: 4,
    height: 250,
    search: true,
    editEvent: (event, data) => {
      data['name'] = 'edit';
      return data;
    },
    deleteEvent: (event, data) => {
      console.log(event, data);
      return true;
    },
    addEvent: (event) => {
      console.log(event);
      return {id: 8, name: 'add'};
    },
    batchEditEvent: (event, dataList) => {
      console.log(event);
      return dataList.map(data => {
        data['name'] = 'batchEdit';
        return data;
      });
    },
    viewDocEvent: (event, data) => {
      console.log(event);
      console.log(data);
    },
    moveUpEvent: (event, data) => {
      console.log(event);
      console.log(data);
    },
    moveDownEvent: (event, data) => {
      console.log(event);
      console.log(data);
    }
  };

  tabConfig1: TableConfig = {
    domId: 'table1',
    toolbarId: 'toolbar1',
    columns: [
      {title: 'ID', field: 'id'}
    ],
    data: [{id: 3}, {id: 4}],
  };

  histories: Array<History> = [
    // {
    //   user: 'wei.wang.o',
    //   datetime: '2018-05-26 09:56:23',
    //   fields: [
    //     {
    //       fieldName: 'Vehicle Type', fieldValue: 'ES8,ES6,ET7'
    //     }
    //   ]
    // }, {
    //   user: 'wei.wang.o',
    //   datetime: '2018-06-01 12:24:45',
    //   fields: [
    //     {
    //       fieldName: 'Summary', fieldValue: 'modify summary'
    //     }, {
    //       fieldName: 'Vehicle Type', fieldValue: 'ES8,ES6'
    //     }
    //   ]
    // },
    // {
    //   user: 'wei.wang.o',
    //   datetime: '2017-10-12 12:24:45',
    //   fields: [
    //     {
    //       fieldName: 'ID', fieldValue: 123457
    //     },
    //     {
    //       fieldName: 'Summary', fieldValue: 'this is demo'
    //     }, {
    //       fieldName: 'Vehicle Type', fieldValue: 'ES8'
    //     }
    //   ]
    // }
  ];

  panelConfig: PanelConfig = {
    id: '123455',
    type: 'Function List',
    name: 'this is demo you need to notified',
    tabs: [
      {
        name: 'General',
        fields: [
          {
            field: 'Responsible',
            value: 'wei.wang.o',
            half: true,
            field1: 'Vehicle Type',
            value1: 'ES8, ES6'
          },
          {
            field: 'Components',
            value: 'wei.wang.o'
          }
        ]
      }, {
        name: 'Relationship',
        fieldType: 1,
        configs: [{
          field: 'Component',
          config: this.tabConfig
        }, {
          field: 'Suppport',
          config: this.tabConfig1
        }]
      }, {
        name: 'History',
        fieldType: 2,
        configs: [{
          field: 'History',
          url: '/rest/api/history.json',
          config: this.histories
        }]
      }
    ]
  };


  treeConfig: TreeConfig = {
    domId: 'tree',
    data: [{
      id: 1,
      text: 'Document',
      children: [
        {
          id: 2,
          text: 'Chapter1',
          checked: true,
          iconCls: 'icon-ipd',
        }, {
          id: 3,
          text: 'Chapter2',
          state: 'closed',
          attributes: {
            url: '/demo/book/abc',
            price: 100
          },
          children: [{
            id: 4,
            text: 'Chapter2 Item1',
            iconCls: 'icon-ipd',
          }, {
            id: 5,
            text: 'Chapter2 Item2',
            iconCls: 'icon-ipd',
          }
          ]
        }, {
          id: 6,
          text: 'Chapter3',
          iconCls: 'icon-ipd',
        }
      ]
    }],
    animate: true,
    lines: true,
    dnd: true,
    checkbox: true,
    onClickEvent: (node) => {
      console.log(`加载Issue信息：${node.id}`);
    },
    onBeforeDropEvent: (target, source, point) => {
      console.log('外部Drop: ' + target + ',' + source + ',' + point);
      // 返回tree或false，表示成功与否
      return true;
    }
  };


  @ViewChild('table') table1: TableComponent;


}
