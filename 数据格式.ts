// [] 游戏内的 技能栏是张雨(三楼)做
// [] 下拉搜索的数据从哪来?
// [] 单位名称 属于 谁?
// 王瑞峥 策划
// 接口请求 问 张强 or 张延宏

// 确认传递的 数据格式

// 敌方宠物, 我方宠物

// 1. buff 都是 json

// 注册事件
// 游戏demo功能,游戏demo日志列表
const register = {
  toolBars: [
    {
      key: 'isShowCollisionBox',
      label: '碰撞盒显示',
      defaultValue: true, // 碰撞盒显示
      renderType: 'switch'
    },
    {
      label: '显示技能体路径',
      renderType: 'switch',
      isShowSkillPath: true // 显示技能体路径
    },
    {
      label: 'AOE技能伤害范围指示',
      renderType: 'switch',
      isShowAOESkillHarmAreaHint: true //
    }
  ],
  logList: []
}

// event(key, value)
// event(onplay, value)

const data = {
  // 战斗单位
  combatUnitList: [
    {
      camp: '敌方', // 敌方/友方
      unit: '法师(1001)', // 单位
      unitCategory: '职业 | 宠物 | 怪物', // 单位类型
      // 属性
      property: [
        {
          propertyName: '最大生命',
          propertyValue: 111
        }
      ],
      // 技能
      skill: [
        {
          skillName: '火球术',
          skillSort: 1,
          技能详情数据: {} // 技能详情数据 是 json  // 需要效果嵌套
        }
      ],
      buff: [
        {
          buffValue: '攻击上升23%',
          buff数据: {} // buff数据 是 json
        }
      ]
    }
  ]
}
