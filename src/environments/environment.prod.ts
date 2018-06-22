// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const suffix = '/webapp';
export const suffix_path = '/webapp/dist/index.html#';
// export const suffix = '';
// export const suffix_path = '/#';
export const environment = {
  production: true,
  url: {
    history: suffix + '/rest/history?id={id}',
    relationship: {
      load: suffix + '/rest/relationship?id={id}&fields={fields}&name={name}',
      add: suffix + '/rest/addRelationship?id={id}&name={name}&targetId={targetId}',
      remove: suffix + '/rest/removeRelationship?id={id}&name={name}&targetId={targetId}',
    },
    tree: {
      load: suffix + '/rest/getTree?id={id}',
      add: suffix + '/rest/addContent?parentId={parentId}&insertLocation={insertLocation}&fieldValue={fieldValue}',
      update: suffix + '/rest/updateContent?id={id}&fieldValue={fieldValue}',
      remove: suffix + '/rest/deleteContent?id={id}'
    }
  },
  projects: [
    {id: 'ees8', name: '/NextEV/vehicle/ES8/EE/EES'},
    {id: 'ees6', name: '/NextEV/vehicle/ES6/EE/EES'},
    {id: 'ees7', name: '/NextEV/vehicle/ET7/EE/EES'},
    {id: 'esx8', name: '/NextEV/vehicle/ES8/EE/EEX'},
    {id: 'esx6', name: '/NextEV/vehicle/ES6/EE/EEX'},
  ],
  types: [
    {id: 'fld', name: 'Function List Document', childId: 'fl'},
    {id: 'fl', name: 'Function List'},
    {id: 'fdsd', name: 'Functional Design Spec Document', childId: 'fds'},
    {id: 'fds', name: 'Functional Design Spec'},
    {id: 'cd', name: 'Components Document', childId: 'c'},
    {id: 'c', name: 'Components'},
    {id: 'crsd', name: 'Component Requirement Spec Document', childId: 'crs'},
    {id: 'crs', name: 'Component Requirement Spec'},
    {id: 'tp', name: 'Test Plan'},
    {id: 'to', name: 'Test Objective'},
    {id: 'tse', name: 'Test Session'},
    {id: 'tsu', name: 'Test Suite', childId: 'tsa'},
    {id: 'tsa', name: 'Test Case'},
  ],
  login: {
    username: 'username',
    password: 'password',
    timeout: '3600',
    nameKey: 'NIO####INTEGRITY####NAME',
    pwdKey: 'NIO####INTEGRITY####PWD',
    hasLogin: 'NIO####INTEGRITY####LOGIN',
    loginUrl: suffix + '/rest/login?username={username}&password={password}',
    logoutUrl: suffix + '/rest/logout?username={username}',
  },
  menus: [
    {
      name: 'Requirement',
      id: 'req',
      children: [
        {name: 'Function List Document', route: '/query'},
        {name: 'Functional Design Spec Document', route: '/query'},
        {name: 'Components Document', route: '/query'},
        {name: 'Component Requirement Spec Document', route: '/query'},
      ]
    },
    {
      name: 'Test Management',
      id: 'tm',
      children: [
        {name: 'Test Plan', route: '/query'},
        {name: 'Test Objective', route: '/query'},
        {name: 'Test Session', route: '/query'},
        {name: 'Test Suite', route: '/query'}
      ]
    }
  ],
  dashboard: {
    assignedMe: {
      url: suffix + '/rest/query?query={query}&fields={fields}',
      fields: [
        {name: 'Type', width: 1},
        {name: 'ID', width: 1},
        {name: 'Summary', width: 100},
        {name: 'State', width: 20}
      ]
    },
    chart: {
      url: suffix + '/rest/getChartData?types={types}&projects={projects}',
      types: [
        {
          name: 'Requirement',  // 默认为1
          id: 'req',
          projects: [
            '/NextEV/vehicle/ES8/EE/EES',
            '/NextEV/vehicle/ES6/EE/EES',
            '/NextEV/vehicle/demo/EE/EES'
          ],
          types: [
            'Function List Document',
            'Functional Design Spec Document',
            'Components Document',
            'Component Requirement Spec Document'
          ]
        },
        {
          name: 'Test Management',
          id: 'tm',
          projects: [
            '/NextEV/vehicle/ES8/EE/EEX',
            '/NextEV/vehicle/ES6/EE/EEX'
          ],
          types: [
            'Test Plan',
            'Test Objective',
            'Test Session',
            'Test Suite'
          ]
        }
      ]
    }
  },
  query: {
    url: suffix + '/rest/query?query={query}&fields={fields}',
    types: [
      {
        name: 'Function List Document',
        fields: ['ID', 'Type', 'Document Short Title', 'State', 'Responsible', 'Project', 'Modified Date'],
        hideFields: ['Shared Text']
      },
      {
        name: 'Functional Design Spec Document',
        fields: ['ID', 'Type', 'Document Short Title', 'State', 'Responsible', 'Project', 'Modified Date'],
        hideFields: ['Shared Text', 'Baseline', 'FDS Version']
      },
      {
        name: 'Components Document',
        fields: ['ID', 'Type', 'Name', 'State', 'Responsible', 'Project', 'Modified Date'],
        hideFields: ['Description']
      },
      {
        name: 'Component Requirement Spec Document',
        fields: ['ID', 'Type', 'Document Short Title', 'State', 'Responsible', 'Project', 'Modified Date'],
        hideFields: ['Description']
      },
      {
        name: 'Test Plan',
        fields: ['ID', 'Type', 'Summary', 'State', 'Assigned User', 'Project', 'Modified Date', 'Planned Start Date', 'Planned End Date'],
        hideFields: ['Description']
      },
      {
        name: 'Test Objective',
        fields: ['ID', 'Type', 'Summary', 'State', 'Assigned User', 'Priority', 'Test Type',
          'Function List ID', 'Project', 'Modified Date'],
        hideFields: ['Deviation Description']
      },
      {
        name: 'Test Session',
        fields: ['ID', 'Type', 'Summary', 'State', 'Assigned User', 'Test Objective', 'Priority', 'Project', 'Modified Date'],
        hideFields: ['Hardware Part Number', 'Software Part Number', 'Description']
      },
      {
        name: 'Test Suite',
        fields: ['ID', 'Type', 'Document Short Title', 'State', 'Assigned User', 'Project', 'Modified Date'],
        hideFields: ['Description']
      }]
  },
  issues: {
    url: suffix + '/rest/issue?id={id}&fields={fields}&richFields={richFields}',
    types: [
      {
        name: 'Function List Document',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Document Short Title'
            }, {
              field: 'Shared Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Responsible',
              field1: 'Vehicle Type'
            }]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Function List',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Name',
              field1: 'Chinese Name'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'Responsible',
              field1: 'ES6'
            }, {
              field: 'Change Types',
              field1: 'Homologations'
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Vehicle Type'
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Function Master',
                config: {
                  domId: 'masterComponent',
                  pagination: false,
                  toolbarId: 'masterComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Components',
                config: {
                  domId: 'functionComponent',
                  pagination: false,
                  toolbarId: 'functionComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Support',
                config: {
                  domId: 'supportComponent',
                  pagination: false,
                  toolbarId: 'supportComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Item Ref.',
                config: {
                  domId: 'itemRefRelationship',
                  pagination: false,
                  toolbarId: 'itemRef-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }]
      },
      {
        name: 'Functional Design Spec Document',
        tabs: [
          {
            name: 'General',
            fields: [
              {
                field: 'Document Short Title'
              }, {
                field: 'Shared Text',
                type: 1
              }, {
                field: 'State',
                field1: 'Project'
              }, {
                field: 'Responsible',
                field1: 'Vehicle Type'
              }, {
                field: 'Baseline'
              }, {
                field: 'Comment(s)',
                type: 1
              }, {
                field: 'Change History',
                type: 1
              }, {
                field: 'Change History(s)',
                type: 1
              }, {
                field: 'FDS Num',
                field1: 'FDS Version'
              }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Backward Document Ref.',
                config: {
                  domId: 'backDocRefComponent',
                  pagination: false,
                  toolbarId: 'backDocRef-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Chinese Name', field: 'Chinese Name'},
                    {title: 'Responsible', field: 'Responsible'},
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Functional Design Spec',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Name'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Responsible',
              field1: 'Vehicle Type'
            }, {
              field: 'Last Label'
            }, {
              field: 'Comment(s)',
              type: 1
            }, {
              field: 'Change History',
              type: 1
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Relate To Function List',
                config: {
                  domId: 'relateToFL',
                  pagination: false,
                  toolbarId: 'relatedToFL-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              },
              {
                field: 'Function Master',
                config: {
                  domId: 'masterComponent',
                  pagination: false,
                  toolbarId: 'masterComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Components',
                config: {
                  domId: 'functionComponent',
                  pagination: false,
                  toolbarId: 'functionComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Support',
                config: {
                  domId: 'supportComponent',
                  pagination: false,
                  toolbarId: 'supportComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Full Name', field: 'Full Name'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Components Document',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Document Short Title'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Responsible',
              field1: 'Vehicle Type'
            }]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Components',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Name'
            }, {
              field: 'Full Name',
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Part Number',
              field1: 'Ignition Mode'
            }, {
              field: 'Network Type',
              field1: 'Vehicle Type'
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Function Master From',
                config: {
                  domId: 'masterFromComponent',
                  pagination: false,
                  toolbarId: 'masterFromComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Text', field: 'Text'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Components From',
                config: {
                  domId: 'functionFromComponent',
                  pagination: false,
                  toolbarId: 'functionFromComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Text', field: 'Text'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Function Support From',
                config: {
                  domId: 'supportFromComponent',
                  pagination: false,
                  toolbarId: 'supportFromComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Text', field: 'Text'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }, {
                field: 'Mapping Form',
                config: {
                  domId: 'mappingFromComponent',
                  pagination: false,
                  toolbarId: 'mappingFromComponent-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'Vehicle Type', field: 'Vehicle Type'},
                    {title: 'Name', field: 'Name'},
                    {title: 'Text', field: 'Text'},
                    {title: 'Responsible', field: 'Responsible'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Component Requirement Spec Document',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Document Short Title'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Responsible',
              field1: 'Vehicle Type'
            }, {
              field: 'Change History',
              type: 1
            }]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Component Requirement Spec',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Name'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Responsible',
              field1: 'Vehicle Type'
            }, {
              field: 'Change History',
              type: 1
            }]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Test Plan',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Summary'
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Assigned User',
              field1: 'Assigned Group'
            }, {
              field: 'Planned Start Date',
              field1: 'Planned End Date',
            }, {
              field: 'Description',
              type: 1
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Test Objectives',
                config: {
                  domId: 'tObjRelationship',
                  pagination: false,
                  toolbarId: 'tObjRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Test Objective',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Summary'
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Assigned User',
              field1: 'Assigned Group'
            }, {
              field: 'Priority'
            }, {
              field: 'Deviation Description',
              type: 1
            }, {
              field: 'Description',
              type: 1
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Tests',
                config: {
                  domId: 'testsRelationship',
                  pagination: false,
                  toolbarId: 'testsRRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Test Session',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Summary'
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Assigned User',
              field1: 'Assigned Group'
            }, {
              field: 'Priority'
            }, {
              field: 'Deviation Description',
              type: 1
            }, {
              field: 'Description',
              type: 1
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Tests',
                config: {
                  domId: 'testsRelationship',
                  pagination: false,
                  toolbarId: 'testsRRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              },
              {
                field: 'Active Test Sessions',
                config: {
                  domId: 'activeTSRelationship',
                  pagination: false,
                  toolbarId: 'activeTSRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              },
              {
                field: 'Completed Test Sessions',
                config: {
                  domId: 'completedTSRelationship',
                  pagination: false,
                  toolbarId: 'completedTSRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'},
                    {title: 'Priority', field: 'Priority'},
                    {title: 'Session Type', field: 'Session Type'},
                    {title: 'Planned Start Date', field: 'Planned Start Date'},
                    {title: 'Planned End Date', field: 'Planned End Date'}
                  ]
                }
              },
              {
                field: 'Test Objective For',
                config: {
                  domId: 'tObjForRelationship',
                  pagination: false,
                  toolbarId: 'tObjForRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Test Suite',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Document Short Title'
            }, {
              field: 'Text',
              type: 1
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'Assigned User'
            }, {
              field: 'Hardware Part Number',
              field1: 'Software Part Number'
            }, {
              field: 'Test Coverage',
              field1: 'Suite Version'
            }]
          },
          {
            name: 'Trace',
            fieldType: 1,
            configs: [
              {
                field: 'Tests For',
                config: {
                  domId: 'tForRelationship',
                  pagination: false,
                  toolbarId: 'tForRelationship-Toolbar',
                  columns: [
                    {title: 'ID', field: 'ID'},
                    {title: 'Type', field: 'Type'},
                    {title: 'State', field: 'State'},
                    {title: 'Summary', field: 'Summary'},
                    {title: 'Assigned User', field: 'Assigned User'}
                  ]
                }
              }
            ]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      },
      {
        name: 'Test Case',
        tabs: [
          {
            name: 'General',
            fields: [{
              field: 'Test Case Name'
            }, {
              field: 'State',
              field1: 'Project'
            }, {
              field: 'FMP Priority',
              field1: 'Priority'
            }, {
              field: 'Test Executer',
              field1: 'Test Execution Date'
            }, {
              field: 'FDS Version'
            }, {
              field: 'Requirement ID',
              field1: 'Issue Number'
            }, {
              field: 'Function Area1',
              field1: 'Function Group1'
            }, {
              field: 'Function1',
              field1: 'Sub-Function1'
            }, {
              field: 'Acceptance Test',
              field1: 'Regression'
            }, {
              field: 'Safety',
              field1: 'Automatical Test'
            }, {
              field: 'Homologation',
              field1: 'FMEA Test'
            }, {
              field: 'Test Platform',
              field1: 'Component'
            }, {
              field: 'Purpose'
            }, {
              field: 'Initial State / Precondition',
              type: 1
            }, {
              field: 'Operating Element'
            }, {
              field: 'Operating / Action 1',
              type: 1
            }, {
              field: 'Expected Results 1',
              type: 1
            }, {
              field: 'Actual Results 1',
              type: 1
            }, {
              field: 'Operating / Action 2',
              type: 1
            }, {
              field: 'Expected Results 2',
              type: 1
            }, {
              field: 'Actual Results 2',
              type: 1
            }, {
              field: 'Operating / Action 3',
              type: 1
            }, {
              field: 'Expected Results 3',
              type: 1
            }, {
              field: 'Actual Results 3',
              type: 1
            }, {
              field: 'Operating / Action 4',
              type: 1
            }, {
              field: 'Expected Results 4',
              type: 1
            }, {
              field: 'Actual Results 4',
              type: 1
            }, {
              field: 'Operating / Action 5',
              type: 1
            }, {
              field: 'Expected Results 5',
              type: 1
            }, {
              field: 'Actual Results 5',
              type: 1
            }, {
              field: 'Operating / Action 6',
              type: 1
            }, {
              field: 'Expected Results 6',
              type: 1
            }, {
              field: 'Actual Results 6',
              type: 1
            }, {
              field: 'Operating / Action 7',
              type: 1
            }, {
              field: 'Expected Results 7',
              type: 1
            }, {
              field: 'Actual Results 7',
              type: 1
            }]
          },
          {
            name: 'History',
            fieldType: 2,
            configs: [{
              field: 'History',
              url: suffix + '/rest/history?id={id}'
            }]
          }
        ]
      }
    ]
  }

};
