import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-tree-test',
  templateUrl: './tree-test.component.html',
  styleUrls: ['./tree-test.component.css']
})
export class TreeTestComponent implements OnInit {

  public id: string;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.id = params.id;
      console.log('id:' + this.id);
      $('#tt').tree({
        url: '/rest/getTree?docId=' + this.id,          // a URL to retrieve remote data.
        method: 'get',                  // The http method to retrieve data.
        // checkbox: true,
        // data: [{
        //   'id': 1,
        //   'text': 'Folder1',
        //   'iconCls': 'icon-no',
        //   'children': [{
        //     'text': 'File1',
        //     'checked': true
        //   }, {
        //     'text': 'Books',
        //     'state': 'open',
        //     'attributes': {
        //       'url': '/demo/book/abc',
        //       'price': 100
        //     },
        //     'children': [{
        //       'text': 'PhotoShop',
        //       'checked': true
        //     }, {
        //       'id': 8,
        //       'text': 'Sub Bookds',
        //       'state': 'closed'
        //     }]
        //   }]
        // }, {
        //   'text': 'Languages',
        //   'state': 'closed',
        //   'children': [{
        //     'text': 'Java'
        //   }, {
        //     'text': 'C#'
        //   }]
        // }],
        animate: true,
        lines: true,
        dnd: true,                       // 允许拖拽
        loadFilter: function (data) {
          console.log(data);
          if (data.data) {
            const d = [];
            d.push(data.data[0]);
            return d;
          } else {
            return data;
          }
        },
        onClick: function (node) {
          if (!$('#tt').tree('isLeaf', node.target)) {
            // $('#tt').tree('toggle', node.target);
          } else {
            console.log(node);
          }
        },
        onDrop: function (target, source, point, event) {
          console.log(target + ',' + source + ',' + point);
        }
      });
    });


  }

  filter(value: string) {
    $('#tt').tree('doFilter', value);
  }


}
