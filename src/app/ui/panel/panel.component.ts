import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {TableConfig} from '../table/table.component';
import {HistoryConfig} from '../history/history.component';
import {SimpleChanges} from '@angular/core/src/metadata/lifecycle_hooks';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnChanges {

  @Input() config: PanelConfig;

  public imgUrl: string;

  constructor(private msg: MessageService) {
  }

  ngOnInit() {
    console.log('panel component');
    if (this.config && this.config.type) {
      this.imgUrl = '../../../assets/imgs/' + this.config.type.split(' ').join('-').toLowerCase() + '.svg';
    }
    if (this.config && this.config.tabs) {
      this.config.tabs.map(tab => {
        tab.domId = tab.name.split(' ').join('-').toLowerCase();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('on change');
    this.config = changes['config'].currentValue;
    this.ngOnInit();
  }

  onClick(event: any, action: string) {
    this.msg.notifyInfo('Tip', `${action} item for ${this.config.id}`);
  }


}

export interface PanelConfig {
  type?: string;    // issue 的 Type
  id?: string;      // issue 的 ID
  name?: string;    // issue 的 Name
  tabs?: Array<TabsConfig>;
}

export interface TabsConfig {
  name?: string;                       // tabs显示名
  domId?: string;                       // 如果是Table，必须有domID
  fieldType?: number;                   // 0 常规，1，Relationship， 2. History
  fields?: Array<PanelField>;          // fieldType为0时的显示字段列表
  configs?: Array<ComplexField>;        // fieldType不为0时的字段配置
}

export interface PanelField {

  field?: string;     // 显示字段
  value?: string;     // 显示值
  type?: number;      // 0 常规, 1 富文本
  half?: boolean;     // half为true时，将两个PanelField排在一行，确保这两个在一起
  field1?: string;    // 显示字段
  value1?: string;    // 显示值
  type1?: number;     // 0 常规, 1 富文本
}

export interface ComplexField {
  field?: string;     // 显示字段
  url?: string;       // 访问数据的URL
  config?: any;       // 参数
}


export interface RelationshipField extends ComplexField {
  field?: string;           // 显示字段
  config?: TableConfig;     // 参数
}

export interface HistoryField extends ComplexField {
  field?: string;             // 显示字段
  url?: string;               // 访问数据的URL
  config?: HistoryConfig;     // 参数
}
