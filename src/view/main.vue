<template>
  <el-row>
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
          <el-col :span="6" class="header-tabs">
            <span :class="{'no-buttom':tabClicks===1}" @click="tabClick(1)">医嘱单</span>
            <span :class="{'no-buttom':tabClicks===2}" @click="tabClick(2)">综合医嘱</span>
            <span :class="{'no-buttom':tabClicks===3}" @click="tabClick(3)">输血医嘱</span>
            <span :class="{'no-buttom':tabClicks===4}" @click="tabClick(4)">手术医嘱</span>
          </el-col>
          <el-col :span="14" :offset="4" class="header-tip">
            <div>注：</div>
            <span>未提交</span>
            <span>已保存</span>
            <span>已提交</span>
            <span>已作废</span>
          </el-col>
        </el-col>
        <el-col class="content-search">
          <span>医嘱类别：</span>
          <el-checkbox v-for="(data,index) in type" :key="index" v-model="checked">{{data.title}}</el-checkbox>
          <span>医嘱类型：</span>
          <el-radio-group v-model="radios">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">长期</el-radio>
            <el-radio :label="3">临时</el-radio>
          </el-radio-group>
          <el-button class="baseButton greenButton button">刷新</el-button>
          <el-button class="baseButton button">快速医嘱</el-button>
        </el-col>
        <el-col class="content-button">
          <el-button
            v-for="(item,index) in buttonContent"
            :key="index"
            :class="`${item.del ? 'redButton' : ''} baseButton`"
            @click="buttonsClick(index,item.title)"
          >
            {{item.title}}
          </el-button>
        </el-col>
        <el-col class="content-main">
          <el-table
            :data="tableData"
            style="width: 100%"
            @select="tableSelect"
            @select-all="selectAll"
            :row-class-name="tableRowClassName"
            height="500"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in tableColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width">
            </el-table-column>
          </el-table>
        </el-col>
      </el-col>
    </el-col>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :width="`${isShowRightFirst && isShowRightTwo ? '50%' : isShowRightFirst ? '35%' : isShowRightTwo ? '35%' :  '20%'}`"
      class="add-model"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="isShowRightFirst ? 11 : 24">
          <el-col class="add-model-header">
            <div>
              <span :class="`${spanValue === '长'&& 'activeSpan'} publicSpan`" @click="spanClick('长')">长</span>
              <span :class="`${spanValue === '临'&& 'activeSpan'} publicSpan`" @click="spanClick('临')">临</span>
            </div>
            <el-input></el-input>
            <div>
              <span :class="`${spanValue1 === '1'&& 'activeSpan'} publicSpan`" @click="spanClick('1',true)">药</span>
              <span :class="`${spanValue1 === '2'&& 'activeSpan'} publicSpan`" @click="spanClick('2',true)">治</span>
              <span :class="`${spanValue1 === '3'&& 'activeSpan'} publicSpan`" @click="spanClick('3',true)">验</span>
              <span :class="`${spanValue1 === '4'&& 'activeSpan'} publicSpan`" @click="spanClick('4',true)">查</span>
            </div>
          </el-col>
          <el-table
            :data="addTableData"
            class="addTable"
            border
            highlight-current-row
            :row-class-name="tableRowClassName"
            @row-click="addTableClick"
            @row-dblclick="addTableDbclick"
            style="width: 100%">
            <el-table-column
              v-for="(item,index) in addTableColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col v-show="isShowRightFirst" :span="13" class="add-model-right">
          <el-col :span="isShowRightTwo ? 12 : 24" class="right-first">
            <div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;剂量：</span>
              <el-input
                class="input input1"
                :value="partData.dose || ''"
                @input="(e)=>inputClick(e,'dose')"
                >
                <i slot="suffix" class="el-icon-caret-top" @click="partData.dose++"></i>
                <i slot="suffix" class="el-icon-caret-bottom" @click="partData.dose>0 ? partData.dose-- : partData.dose = 0"></i>
              </el-input>
              <span style="color: #2018CE;font-size: 12px">10亿单位</span>
            </div>
            <div style="display: flex;align-items: center">
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;频次：</span>
              <el-select :value="partData.frequency"
                         @change="(val)=>partSelect(val,'frequency')"
                         placeholder="请选择"
                         style="width: 120px">
                <el-option
                  v-for="item in [{value:'1',label:'每日一次'},{value:'2',label:'每日两次'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天数：</span>
              <el-input
                class="input input1"
                :value="partData.days || ''"
                @input="(e)=>inputClick(e,'days')"
              >
                <i slot="suffix" class="el-icon-caret-top" @click="partData.days++"></i>
                <i slot="suffix" class="el-icon-caret-bottom" @click="partData.days>0 ? partData.days-- : partData.days = 0"></i>
              </el-input>
            </div>
            <div>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量：</span>
              <el-input
                class="input input1"
                :value="partData.num || ''"
                @input="(e)=>inputClick(e,'num')"
              >
                <i slot="suffix" class="el-icon-caret-top" @click="partData.num++"></i>
                <i slot="suffix" class="el-icon-caret-bottom" @click="partData.num>0 ? partData.num-- : partData.num = 0"></i>
              </el-input>
              <span style="color: #2018CE;font-size: 12px">桶</span>
            </div>
            <div style="display: flex;align-items: center">
              <span>用药途径：</span>
              <el-select
                :value="partData.channel"
                @change="(val)=>partSelect(val,'channel')"
                placeholder="请选择" style="width: 120px">
                <el-option
                  v-for="item in [{value:'1',label:'口服'},{value:'2',label:'输液'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
            <div>
              <span>是否皮试：</span>
              <el-checkbox></el-checkbox>
            </div>
            <el-col style="display: flex">
              <el-button class="baseButton button" @click="showRightTwo">添加附加材料</el-button>
              <el-button class="baseButton button" @click="detailSave">直接保存</el-button>
            </el-col>
          </el-col>
          <el-col v-show="isShowRightTwo" :span="12">
            <el-col  style="min-height: 292px;position: relative ">
              <div class="my-table">
                <div class="my-table-header">
                  <span>耗材名称</span>
                  <span>数量</span>
                </div>
                <div class="my-table-cell">
                  <span>一次性耗材</span>
                  <span>
                      <el-input
                        class="input input1"
                        v-model="num1">
                 <i slot="suffix" class="el-icon-caret-top" @click="num1++"></i>
                 <i slot="suffix" class="el-icon-caret-bottom" @click="num1>0 ? num1-- : num1 = 0"></i>
              </el-input>
                  </span>
                </div>
              </div>
              <el-col style="display: flex;position: absolute;bottom: 10px;padding-left: 10px">
                <el-button class="baseButton button">取消材料</el-button>
                <el-button class="baseButton button" @click="lastSave">保存</el-button>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>
<script>
  import {MyTree, Base} from '@/components'
  import {textData} from '@/api/index'
  export default {
    name: 'Main',
    components: {
      MyTree,
      Base,
    },
    data() {
      return {
        input: '',
        data: [],
        menu: ['患者概览', '诊断', '医嘱', '电子病历', '报告预览', '医嘱执行', '出入量维护', '观察项维护', '导管维护', '病情记录', '特护单', '护理评估单', '会诊', '时间轴'],
        base: {
          name: '杨青青',
          id: '1234567',
          green: '孕产妇',
          age: '42岁',
          faber: '自费',
          doctor: '程倩',
          bad: 'L02',
          trialGrade: '二级',
          nursGrade: '二级',
          diagnosis: '特指呼吸道结核',
        },
        baseClum: [{fild: 'name', title: '姓名'}, {fild: 'id', title: '患者ID'}, {
          fild: 'green',
          title: '绿色通道'
        }, {fild: 'age', title: '年龄'}, {fild: 'faber', title: '费别'},
          {fild: 'doctor', title: '首席医师'}, {fild: 'bad', title: '床号'}, {
            fild: 'trialGrade',
            title: '分诊等级'
          }, {fild: 'nursGrade', title: '护理等级'}, {fild: 'diagnosis', title: '诊断'},],
        turnAre: [{title: '结束就诊', color: '#999999'}, {title: '转住院', color: '#0DA4D2'}, {
          title: '入科',
          color: '#cdcdcd'
        }, {title: '转红区', color: '#F80001'},
          {title: '转黄区', color: '#E56505'}, {title: '转绿区', color: '#09BB00'}, {title: '转留观区', color: '#F5AA00'}],
        type: [{title: '治疗'}, {title: '药物'}, {title: '检验'}, {title: '检查'}, {title: '用血'}, {title: '手术'}],
        tabClicks: 2, // tab点击
        checked: '',
        radios: '1',
        buttonContent: [{title: '新增'}, {title: '子医嘱'}, {title: '复制'}, {title: '检查'}, {title: '检验'}, {
          title: '作废',
          del: '1'
        }, {title: '保存'}, {title: '提交'},],
        tableColumn: [{prop: 'type', label: '类型', width: 180}, { prop: 'category',label: '类别', width: 180},
          {prop: 'days', label: '天数', width: 180}, {prop: 'num', label: '数量', width: 180},
          {prop: 'text', label: '医嘱内容', width: 180}, {prop: 'dose', label: '剂量', width: 180}, {prop: 'channel', label: '途径', width: 180
          }, {prop: 'frequency', label: '频次', width: 180}, {prop: 'stropTime', label: '停止时间', width: 180}, {prop: 'specs', label: '规格', width: 180}],
        tableData: [],
        tableSelectData:[],
        dialogVisible: false,
        addTableColumn: [{prop: 'text', label: '医嘱', width: 180}, {prop: 'specs', label: '规格'}],
        addTableData: [{text:'(甲)复方干草剂',specs:'180ml/瓶'},{text:'(甲)复方干草剂',specs:'180ml/瓶'},{text:'(甲)复方干草剂',specs:'180ml/瓶'},],
        addTableSelectData:[],
        spanValue: '临',
        spanValue1: '1',
        num1:'',
        partData:{dose:'',days:'',num:'',frequency:'',channel:''},
        isShowRightFirst:false,// 是否显示右边详情
        isShowRightTwo:false,// 是否显示右边消耗材料
      }
    },
    methods: {
      tabClick(key) { // tabclick
        this.tabClicks = key
      },
      buttonsClick(index, content) {
        console.log(index, content);
        switch (index) {
          case 0: // 新增
            this.dialogVisible = true
            break
          case 5:  // 作废
            let select = [...this.tableSelectData],data= [...this.tableData]
            for(let i=select.length-1;i>=0;i--){
              console.log(select[i].index);
              data.splice(select[i].index,1)
            }
            this.tableData = data
            break
          default:
            break
        }
      },
      tableSelect(selection, row){  // 主表的check事件
        this.tableSelectData = selection
      },
      selectAll(selection){
        this.tableSelectData = selection
      },
      handleClose() { // 弹框
        this.dialogVisible = false
        this.isShowRightFirst = false
        this.isShowRightTwo = false
        this.addTableSelectData = []
      },
      spanClick(val, falge) {
        if (falge) {
          this.spanValue1 = val
        } else {
          this.spanValue = val
        }
      },
      tableRowClassName ({row, rowIndex}) { // 把表格的下标放进每一行中
        row.index = rowIndex;
      },
      addTableClick(row, column, event){  // table行单击事件
        let data = {...row}
        data.index = this.tableData.length
        this.isShowRightFirst = true
        this.addTableSelectData = data
        console.log(row.index, column.index, event);
      },
      addTableDbclick(row, column, event){  // table双击事件
        let data = {...row}
        data.index = this.tableData.length
        this.tableData.push(data)
        this.handleClose()
      },
      showRightTwo(){  // 添加材料
        this.isShowRightTwo = true
      },
      inputClick(e,path){  // input的公共方法
        this.partData[path] = e
      },
      partSelect(val,path){  // select的公共方法
        this.partData[path] = val
      },
      detailSave(){  // 直接保存
        let data = {...this.addTableSelectData,...this.partData}
        this.addTableDbclick(data)
      },
      lastSave(){ // 材料保存
        let stuff = {stuff:this.num1}
        let data = {...stuff,...this.addTableSelectData,...this.partData}
        this.addTableDbclick(data)
      },
      loadData(){
        textData().then(data=>{
          console.log(data);
        })
      },
    },
    created(){
      this.$axios.get('/main/index').then(data=>console.log(data)  )
      // this.loadData()
    },
  }
</script>
<style lang="less">
  @main-back: #61B6E1;
  @back-9: #999999;
  @choose: #0DA4D2;
  @red: #F80001;
  @orang: #E56505;
  @green: #09BB00;
  @border: #cdcdcd;
  .main-left {
    height: 747px;
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

  .main-right {
    padding-left: 20px;
    .main-right-content {
      margin-top: 30px;
      border: 1px solid #cdcdcd;
      border-radius: 4px;
      .content-header {
        height: 50px;
        border-bottom: 1px solid #cdcdcd;
        .header-tabs {
          height: 100%;
          display: flex;
          align-items: center;
          > span {
            cursor: pointer;
            height: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
            background: #fff;
            border-right: 1px solid #cdcdcd;
          }
        }
        .header-tip { // 提示按钮
          height: calc(100% + 0px);
          display: flex;
          align-items: center;
          > div, span {
            display: inline-flex;
            align-items: center;
          }
          > span:nth-child(1) {
            color: @green;
          }
          > span:nth-child(2) {
            color: #0A0D99;
          }
          > span:nth-child(3) {
            color: @back-9;
          }
          > span:nth-child(4) {
            color: @red;
          }
          > span {
            height: 30px;
            padding: 0 10px;
            font-size: 12px;
            border: 1px solid #cdcdcd;
            margin-right: 20px;
          }
        }
      }
      .content-search {
        height: 50px;
        display: flex;
        align-items: center;
        text-align: left;
        border-bottom: 1px solid #cdcdcd;
        padding-left: 10px;
        > span {
          font-size: 14px;
        }
        .greenButton {

          margin-left: 20px;
          background: @green;
        }
      }
      .content-button {
        height: 50px;
        display: flex;
        align-items: center;
        text-align: left;
        > button:first-child {
          margin-left: 10px;
        }
        .redButton {
          background: @red !important;
        }
      }
      .content-main {
        border-top: 1px solid #cdcdcd;
        :global {
          .el-table th {
            background: #F9F9F9;
          }
        }
      }
    }
  }

  .baseButton {
    height: 26px;
    padding: 0 20px;
    color: #fff;
    font-size: 12px;
    background: @main-back;
    &:active, &:focus {
      opacity: 0.9;
      color: #fff;
      background: @main-back;
    }
  }

  .no-buttom {
    border-bottom: none !important;
    border-top: 2px solid @main-back !important;
  }

  .add-model { // 新增弹框
    .el-dialog__body > div {
      border: 1px solid #cdcdcd;
      height: 297px;
    }
    .add-model-header {
      border-bottom: 1px solid #cdcdcd;
      display: flex;
      height: 25px;
      justify-content: space-between;
      > div {
        display: inline-flex;
      }
      .el-input {
        height: 100%;
        > input {
          height: 100%;
          border: 0;
        }
      }
      .publicSpan {
        cursor: pointer;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid @border;
        background: #E5E5E5;
        font-size: 12px;
        width: 24px;
        height: 100%;
      }
      .activeSpan {
        color: #fff;
        background: @main-back;
      }
    }
    .add-model-right {
      .input {
        height: 30px;
        position: relative;
        > input {
          height: 30px;
          border-radius: 8px;
        }
        > span > span {
          position: relative;
          > i:first-child {
            position: absolute;
            top: -2px;
            left: -15px;
          }
          > i:last-child {
            position: absolute;
            top: 13px;
            left: -15px;
          }
          > i {
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
      .input1 {
        width: 90px;
        > input {
          width: 90px;
        }
      }
      .right-first {
        text-align: left;
        padding-left: 10px;
        padding-bottom: 10px;
        border-left: 1px solid #cdcdcd;
        border-right: 1px solid #cdcdcd;
        > div {
          margin-top: 10px;
        }
      }
    }
  }

  .my-table{
    max-height: calc(100% - 46px);
    overflow: auto;
    >div{
      height: 30px;
      font-size: 12px;
      text-align: left;
      display: flex;
      >span{
        display: inline-flex;
        align-items: center;
        padding-left: 10px;
        border-bottom: 1px solid #cdcdcd;
        border-right: 1px solid #cdcdcd;
      }
      >span:first-child{
        width: 55%;
      }
      >span:last-child{
        width: 45%;
      }
    }
    .my-table-header{
      font-weight: bold;
      background: #F5F5F5;
    }
    .my-table-cell{

    }
  }
  .el-table thead {
    color: #000;
  }
  .el-table th, .el-table__row td {
    padding: 6px 0;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: @main-back !important;
    color: #fff;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #cdcdcd;
  }

  .el-table--border th,
  .el-table--border th.gutter:last-of-type {
    border-bottom: 1px solid  #cdcdcd;
  }

  .el-table--border td,
  .el-table--border th {
    border-right: 1px solid  #cdcdcd;
  }
</style>

