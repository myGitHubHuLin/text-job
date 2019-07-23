import Mock from 'mockjs' //引入mockjs，npm已安装

const vehicle = Mock.mock(
  '/main/index','get', (req, res) =>{
    return  {
      code:200,
      data:[{
        id:1,
        licNumber:'陕A79898',
        color:1,
        buyTime:'2017-04-01'

      },{
        id:1,
        licNumber:'陕A79898',
        color:1,
        buyTime:'2017-04-01'

      }],
      message:'查询成功'
    }
  } )
export default {vehicle}

