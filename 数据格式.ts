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

// 战斗单位列表
const combatUnitList = [
  {
    camp: '敌方', // 敌方/友方
    unit: '法师(1001)', // 单位
    unitCategory: '职业', // 单位类型: 职业 | 宠物 | 怪物
    // 属性
    property: [
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
        effectId: 609,
        effectTypeClass: 1,
        name: '移除buff集效果',
        description: '',
        _nodeType: 83,
        nodeId: 1579,
        effectParam: '1|222',
        effectType: 1010,
        matchParam: '',
        prob: 222,
        scaleRule: '1',
        triggerConditionParam: '',
        triggerType: ''
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
