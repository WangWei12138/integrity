import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeComponent, TreeConfig, TreeData} from '../../ui/tree/tree.component';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../service/data.service';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  type: string;
  typeName: string;
  id: string;

  toggle: string;
  expand: boolean;

  treeConfig: TreeConfig = {
    domId: 'tree',
    url: '',
    animate: true,
    lines: true,
    dnd: true,
    onClickEvent: (node) => {
      const childTypeId = this.data.getChildTypeId(this.type);
      console.log(`加载Issue信息：${node.id}, type: ${childTypeId}`);
      if (node.id === this.id) {
        this.route.navigate([`/doc/${this.type}/${this.id}/tree/${this.type}/${node.id}`]);
      } else {
        this.route.navigate([`/doc/${this.type}/${this.id}/tree/${childTypeId}/${node.id}`]);
      }
    },
    onBeforeDropEvent: (target, source, point) => {
      console.log('外部Drop: ' + target + ',' + source + ',' + point);
      // 返回tree或false，表示成功与否
      return true;
    }
  };
  @ViewChild('tree') treeModel: TreeComponent;

  constructor(private routeInfo: ActivatedRoute, private data: DataService, private route: Router, private msg: MessageService) {
    console.log('tree');
    this.data.hideProgress();
    this.type = routeInfo.snapshot.params['type'];
    this.typeName = this.data.getTypeName(this.type);
    this.id = routeInfo.snapshot.params['id'];
    routeInfo.data.subscribe((treeData: TreeData) => this.treeConfig.data = treeData['tree']);
    // this.treeConfig.url = this.data.getTreeUrl(this.id);
    this.toggle = 'Collapse';
  }

  ngOnInit() {
  }

  onClick(event: any, action: string) {
    if (action === 'toggle') {
      this.expand = !this.expand;
      this.toggle = this.expand ? 'Expand' : 'Collapse';
    } else {
      const selected = this.treeModel.getSelected();
      if (selected !== null && selected !== undefined) {
        this.msg.notifyInfo('Tip', `${action} item for : ${selected.id}`);
      } else {
        this.msg.notifyWarning('Message', `Please select at least one item!`);
      }
    }
  }

}
