import Mock from 'mockjs' //引入mockjs，npm已安装

const vehicle = Mock.mock(
  '/main/index','get', (req, res) =>{
    return  {
      code:200,
      data:[  // 左侧列表组件
        {
          areId: '红区',
          num: '10',
          color:'#F80001',
          children: [
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
          ]
        },
        {
          areId: '黄区',
          num: '2',
          color:'#E56505',
          children: [
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
          ]
        },
        {
          areId: '绿区',
          num: '10',
          color:'#09BB00',
          children: [
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
          ]
        },
        {
          areId: '留观区',
          num: '10',
          color:'yellow',
          children: [
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
          ]
        },
        {
          areId: '未入科',
          num: '10',
          color:'#999999',
          children: [
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
            {
              leve: '1',
              bed: 'L02床',
              name: '杨青青',
              phone: '1234567',
            },
          ]
        },
      ],
      message:'查询成功'
    }
  } )

const menu = Mock.mock('/get/menu','get',(req,res)=>{
  return{
    code:200,
    data:['患者概览', '诊断', '医嘱', '电子病历', '报告预览', '医嘱执行', '出入量维护', '观察项维护', '导管维护', '病情记录', '特护单', '护理评估单', '会诊', '时间轴'],

  }
})
export default {vehicle}

