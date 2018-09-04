import * as FileSaver from 'file-saver';
import {Column} from '../app/ui/table/table.component';
import {DataService} from '../app/service/data.service';
export const suffix = '';
export const CustomActive = {
  /**
   * Table导出数据到csv中
   * @param {Array<Column>} columns
   * @param item
   */
  exportItemToExcel: (columns: Array<Column>, item: any) => {
    console.log(`Export Item To Excel`);
    let array = [], data = '';
    if (item instanceof Array) {
      array = item;
    } else {
      array.push(item);
    }
    columns = columns.filter(col => col.title !== undefined);
    columns.forEach(col => data += col.title + ',');
    data = data + '\n';
    array.forEach(arr => {
      columns.forEach(col => data += '"' + arr[col.field] + '",');
      data += '\n';
    });
    const date = new Date(),
      blobType = {type: 'text/plain;charset = utf-8'},
      blob = new Blob([data], blobType);
    FileSaver.saveAs(blob, date.getTime() + '.csv');
  },
  /**
   * Function List自定义Active
   */
  functionList: {
    /**
     * 导出
     * @param item
     */
    export: (item: any) => {
      console.log(`Function List Export`);
      return suffix + '/rest/custom/flExport/' + item['ID'];
    }
  }
};




