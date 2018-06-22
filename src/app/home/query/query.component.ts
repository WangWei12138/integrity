import {Component, OnInit, ViewChild} from '@angular/core';
import {TableComponent, TableConfig} from '../../ui/table/table.component';
import {ActivatedRoute, Router} from '@angular/router';
import {environment, suffix_path} from '../../../environments/environment';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  tableConfig: TableConfig;

  type: string;
  project: string;

  constructor(private routeInfo: ActivatedRoute, private data: DataService, private route: Router) {
    this.tableConfig = {
      domId: 'queryTable',
      columns: [],
      showCheckBox: true,
      pageSize: 18,
      toolbarId: 'queryToolbar',
      viewEvent: (event, item) => {
        let type = item.Type;
        type = this.data.getTypeId(type);
        window.open(suffix_path + `/issue/${type}/${item.ID}`);
      },
      viewDocEvent: (event, item) => {
        let type = item.Type;
        type = this.data.getTypeId(type);
        window.open(suffix_path + `/doc/${type}/${item.ID}`);
      }
    };
  }

  ngOnInit() {
    this.routeInfo.params.subscribe(
      res => {
        console.log('query');
        this.data.showProgress();
        this.type = this.data.getTypeName(res['type']);
        this.project = res['project'];
        if (this.project) {
          this.project = this.data.getProjectName(res['project']);
        }
        const url = environment.query.url,
          types = environment.query.types,
          typeFields = types.find(t => t.name === this.type),
          fields = typeFields.fields,
          hideFields = typeFields.hideFields;

        this.tableConfig.url = this.data.getQueryUrl(url, this.type, fields.concat(hideFields).join(','), this.project);
        const columns = [];
        fields.forEach(field => {
          columns.push({field: field, title: field});
        });
        hideFields.forEach(field => {
          columns.push({field: field, title: field, visible: false});
        });
        this.tableConfig.columns = columns;
        this.data.hideProgress();
      }
    );
  }

}
