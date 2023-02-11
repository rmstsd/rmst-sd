const nodes = [
  {
    type: 'ifelse',
    disabled: false,
    inputs: {
      conditions: [
        {
          leftValue: 'string|11',
          operator: 'equals',
          rightValue: 'string|2'
        }
      ]
    },
    outputs: {},
    children: [
      {
        type: 'bgetopen',
        disabled: false,
        inputs: {
          type: 'chrome',
          mode: 'title',
          content: 'string|aa',
          rule: 'equal',
          isOpenNewWeb: 'false',
          newWebUrl: 'string|',
          $inner_dynamic$: 'undefined',
          gs_pre_timeout: 'number|0',
          gs_lat_timeout: 'number|0'
        },
        outputs: {
          output_page: 'web_obj_1'
        },
        children: []
      },
      {
        type: 'loop_times',
        disabled: false,
        inputs: {
          startNum: 'number|1',
          endNum: 'number|1',
          stepLenth: 'number|1',
          $inner_dynamic$: 'undefined'
        },
        outputs: {
          output_i: 'range_item_1'
        },
        children: [
          {
            type: 'bugettext',
            disabled: false,
            inputs: {
              page: 'variable|web_obj_1',
              ctrl: 'element|{"ctrlName":"element_11921","ctrlText":"行内元素_HTTP1","type":"Chrome","element":true}',
              $inner_dynamic$: 'undefined',
              ctrlIndex: 'number|1',
              timeout: 'number|10',
              gs_pre_timeout: 'number|0',
              gs_lat_timeout: 'number|0'
            },
            outputs: {
              output_text: 'web_text_1'
            },
            children: []
          }
        ]
      },
      {
        type: 'whileend',
        disabled: false,
        children: []
      }
    ]
  },
  {
    type: 'ifend',
    disabled: false,
    children: []
  }
]
