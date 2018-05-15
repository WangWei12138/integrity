// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: {
    query: '/rest/query?{query}',         // 替换{query}即可
    delete: '/rest/delete?ids={ids}',      // 替换{ids}即可
  },
  fdsParams: {
    groups: [
      'NE_EE_EES_RM_Analysts'
    ],
    data: [
      {ID: '1'},
      {ID: '2'},
      {ID: '3'},
      {ID: '4'},
      {ID: '5'},
    ],
    query: 'query=(field[Type]=Functional Design Spec Document) and ' +
    '(field[Project]="/NextEV/vehicle/ES8/EE/EES","/NextEV/vehicle/ES6/EE/EES")',
    columns: [
      {
        checkbox: true
      },
      {
        field: 'ID',
        title: 'ID',
        sortable: true
      }, {
        field: 'Type',
        title: 'Type'
      }, {
        field: 'State',
        title: 'State',
        sortable: true
      }, {
        field: 'Document Short Title',
        title: 'Summary'
      }, {
        field: 'Text',
        title: 'Text',
        visible: false
      }, {
        field: 'Responsible',
        title: 'Responsible',
        sortable: true,
      }, {
        field: 'Assigned User',
        title: 'Assigned User',
        visible: false,
        sortable: true
      }, {
        field: 'Project',
        title: 'Project',
        sortable: true
      }, {
        field: 'Modified Date',
        title: 'Modified Date',
        sortable: true
      }, {
        field: 'Attachments',
        title: 'Attachments',
        visible: false
      }, {
        field: 'Text',
        title: 'Text',
        visible: false
      }, {
        field: 'Text Attachments',
        title: 'Text Attachments',
        visible: false
      }, {
        field: 'Change History',
        title: 'Change History',
        visible: false
      }, {
        field: 'Change History(s)',
        title: 'Change History(s)',
        visible: false
      }, {
        field: 'Baseline',
        title: 'Baseline',
        visible: false
      }, {
        field: 'Comment(s)',
        title: 'Comment(s)',
        visible: false
      }, {
        field: 'FDS Num',
        title: 'FDS Num',
        visible: false,
        sortable: true
      }, {
        field: 'FDS Version',
        title: 'FDS Version',
        visible: false,
        sortable: true
      }, {
        field: 'Last Version Date',
        title: 'Last Version Date',
        visible: false,
        sortable: true
      }
    ]
  }
};
