// [] 游戏内的 技能栏是张雨(三楼)做
// [] 下拉搜索的数据从哪来?
// [] 单位名称 属于 谁?
// 王瑞峥 策划
// 接口请求 问 张强 or 张延宏

// 确认传递的 数据格式

// 敌方宠物, 我方宠物

// 1. buff 都是 json

// 注册事件
// 游戏demo功能, 游戏demo日志列表

const register = {
  toolBars: [
    {
      key: 'isShowCollisionBox',
      label: '碰撞盒显示',
      defaultValue: true, // 布尔类型
      renderType: 'switch'
    },
    {
      key: 'isShowSkillPath',
      label: '显示技能体路径',
      defaultValue: true, // 布尔类型
      renderType: 'switch'
    },
    {
      key: 'isShowAOESkillHarmAreaHint',
      label: 'AOE技能伤害范围指示',
      defaultValue: true, // 布尔类型
      renderType: 'switch'
    }
  ]
}

// logList: []

// event(key, value)
// event(onplay, value)
// { label: '职业', value: 'playerClass' },
//               { label: '宠物', value: 'pet' },
//               { label: '怪物', value: 'monster' },
// 战斗单位列表
const combatUnitList = [
  {
    camp: 'enemy', // 敌友: enemy: 敌方; teammate: 友方
    unitCategory: 'playerClass', // 单位类型: playerClass - 职业, pet - 宠物, monster- 怪物
    // 单位
    unitId: 22,
    unit: {
      attr: '1001123|111;2000251|222;1001124|333',
      id: 22,
      name: '雷雷职业',
      nodeId: 312,
      skill: '100129|2;100130|3',
      world: 1003,
      _nodeType: 21
    },
    // 属性
    attr: [
      {
        min: 10,
        name: '奥术飞弹冷却时间',
        id: 1001093,
        type: 1,
        _nodeType: 17,
        nodeId: 1593,
        max: 1000,
        displayName: '奥术飞弹冷却时间222',
        displayType: 0,
        funcLabel: 'CurHP',
        isBroadcastProp: 1,
        isClientProp: 1,
        objType: '1|3',
        score: 22,
        source: '1001076',
        tag: 0,
        valueType: 0
      }
    ],
    // 技能
    skill: [
      {
        owner: 3,
        maxLevel: 5,
        autoUpgrade: 0,
        initLevel: 1,
        name: '奥数飞弹',
        description: '技能备注',
        id: 100042,
        tag: 9,
        type: 1,
        _nodeType: 91,
        nodeId: 1560,
        openCondition: '91|22|100000182',
        effects: [
          {
            effectId: 329,
            effectTypeClass: 1,
            name: '冰冻',
            description: '',
            _nodeType: 83,
            nodeId: 1579,
            effectParam: '3|10',
            effectType: 109,
            matchParam: '',
            prob: 100,
            scaleRule: '',
            triggerConditionParam: '1|1|1$2$3;2|1||2|',
            triggerType: ''
          },
          {
            parentEffectId: 329,
            effectId: 330,
            effectTypeClass: 1,
            name: '冰冻',
            description: '',
            _nodeType: 83,
            nodeId: 1579,
            effectParam: '3|10',
            effectType: 109,
            matchParam: '',
            prob: 100,
            scaleRule: '',
            triggerConditionParam: '1|1|1$2$3;2|1||2|',
            triggerType: ''
          }
        ]
      }
    ],
    buff: [
      {
        continueTime: '1000',
        continueEffect: '138|2000201|80000',
        stackLayer: '1',
        label: '8',
        _nodeType: 81,
        coolDown: '0',
        funcLabelClass: '15',
        stackMode: '3',
        buffId: 11,
        isSyncGameProp: 1,
        minContinueTime: '1000',
        name: '改变怪物移动速度百分比',
        class: 6,
        disRule: '1|4|3',
        isClentProp: 0,
        nodeId: 166,
        order: 1
      }
    ]
  }
]
