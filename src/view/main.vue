<template>
  <el-row >
    <el-col class="main-left" :span="6">
      <el-col class="left-header">
        <el-input v-model="input" placeholder="患者姓名/编号/床号"></el-input>
        <el-button type="primary">查询</el-button>
      </el-col>
      <el-col>
        <MyTree :data="data" :menu="menu"></MyTree>
      </el-col>
    </el-col>
    <el-col class="main-right" :span="18">
      <el-col>
        <Base :base="base" :baseClum="baseClum" :turnAre="turnAre"/>
      </el-col>
      <el-col class="main-right-content">
        <el-col class="content-header">

        </el-col>
        <el-col class="content-search">
          <span>医嘱类别：</span>
          <el-checkbox v-for="(data,index) in type" :key="index" v-model="checked">{{data.title}}</el-checkbox>
          <el-radio-group v-model="radios">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">长期</el-radio>
            <el-radio :label="3">临时</el-radio>
          </el-radio-group>
          <el-button class="baseButton greenButton">刷新</el-button>
          <el-button class="baseButton">快速医嘱</el-button>
        </el-col>
        <el-col class="content-button">
          <el-button  v-for="(item,index) in buttonContent" :key="index" :class="`${item.del ? 'redButton' : ''} baseButton`">{{item.title}}</el-button>
        </el-col>
        <el-col class="content-main"></el-col>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import {MyTree,Base} from '@/components'

  export default {
    name: 'Main',
    components: {
      MyTree,
      Base,
    },
    data() {
      return {
        input: '',
        data: [  // 左侧列表组件
          {
            areId: '红区',
            num: '10',
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
        menu:['患者概览','诊断','医嘱','电子病历','报告预览','医嘱执行','出入量维护','观察项维护','导管维护','病情记录','特护单','护理评估单','会诊','时间轴'],
        base:{name:'杨青青',id:'1234567',green:'孕产妇',age:'42岁',faber:'自费',doctor:'程倩',bad:'L02',trialGrade:'二级',nursGrade:'二级',diagnosis:'特指呼吸道结核',},
        baseClum:[{fild:'name',title:'姓名'},{fild:'id',title:'患者ID'},{fild:'green',title:'绿色通道'},{fild:'age',title:'年龄'},{fild:'faber',title:'费别'},
          {fild:'doctor',title:'首席医师'},{fild:'bad',title:'床号'},{fild:'trialGrade',title:'分诊等级'},{fild:'nursGrade',title:'护理等级'},{fild:'diagnosis',title:'诊断'},],
        turnAre:[{title:'结束就诊',color:'#999999'},{title:'转住院',color:'#0DA4D2'},{title:'入科',color:'#cdcdcd'},{title:'转红区',color:'#F80001'},
          {title:'转黄区',color:'#E56505'} ,{title:'转绿区',color:'#09BB00'} ,{title:'转留观区',color:'#F5AA00'}],
        type:[{title:'治疗'},{title:'药物'},{title:'检验'},{title:'检查'},{title:'用血'},{title:'手术'}],
        checked:true,
        radios:'1',
        buttonContent:[{title:'新增'},{title:'子医嘱'},{title:'复制'},{title:'检查'},{title:'检验'},{title:'作废',del:'1'},{title:'保存'},{title:'提交'},],
      }
    }
  }
</script>
<style lang="less">
  @main-back: #61B6E1;
  @back-9: #999999;
  @choose: #0DA4D2;
  @red: #F80001;
  @orang: #E56505;
  @green: #09BB00;
  @border:#cdcdcd;
  .main-left {
    height: 700px;
    overflow-y: auto;
    border: 1px solid #cdcdcd;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top: 0;
    background: #f3f3f3;
    .left-header {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid @border;
      button {
        margin: 0 10px;
      }
    }
  }
.main-right{
 padding-left: 20px;
  .main-right-content{
    margin-top: 30px;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    .content-header{

    }
    .content-search{
      .greenButton{
        background: @green;
      }
    }
    .content-button{
      .redButton{
        background:  @red!important;
      }
    }
    .content-main{

    }
  }
}
  .baseButton{
    color: #fff;
    font-size: 12px;
    background: @main-back;
  }
</style>

