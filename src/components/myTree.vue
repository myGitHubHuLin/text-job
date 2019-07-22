<template>
  <div>
    <el-row v-for="(item,index) in data" :key="index" class="my-tree-main">
      <div class="tree-list" @click="clickTitle(item.areId)">
        <i class="el-icon-menu"></i>
        <span>{{`${item.areId}(${item.num || 0})`}}</span>
      </div>
      <dl v-show="item.areId===selectAreId" v-for="(patient,index1) in item.children" :key="index1" class="tree-detail">
        <dt @click="clickPatient(index1)" :class="{'border':index1===selectIndex}">
          <span>{{`${patient && patient.leve}`}}</span>
          <span>{{`${patient && patient.bed}|${patient.name}|${patient.phone}`}}</span>
        </dt>
        <dd v-show="index1===selectIndex" v-for="(list,index2) in menu" :key="index2">
          <div :class="{'selectColor' : list === selectMenu}" @click="clickMenu(list)">{{list}}</div>
        </dd>
      </dl>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: ['data', 'menu'],
    name: 'MyTree',
    data() {
      return {
        selectAreId: -1,
        selectIndex: -1,
        selectMenu: -1,
      }
    },
    methods: {
      clickTitle(name) { // 区域大菜单切换
        console.log(name);
        if (this.selectAreId === name) {
          this.selectAreId = -1
        } else {
          this.selectAreId = name
        }
        if(this.selectIndex !==-1){
          this.selectIndex = -1
        }
        if(this.selectMenu !== -1){
          this.selectMenu = -1
        }
      },
      clickPatient(index) { // 点击患者
        console.log(index);
        if (this.selectIndex === index) {
          this.selectIndex = -1
        } else {
          this.selectIndex = index
        }
        if(this.selectMenu !== -1){
          this.selectMenu = -1
        }
      },
      clickMenu(index) {  // 点击菜单
        this.selectMenu = index
      },
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
  @white: #fff;
  .my-tree-main {
    text-align: left;
    .tree-list {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      border-bottom: 1px solid @border;
      i {
        margin: 0 10px;
      }
    }
    .tree-detail {
      padding: 0 10px;
      background: @white;
      dt, dd {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        font-size: 15px;
      }
      dt {
        border-bottom: 1px solid @border;
        > span:first-child {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: @white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          margin-right: 10px;
        }
      }
      dd {
        margin-left: 30px;
      }
    }
  }

  .border {
    border-bottom: 1px solid @main-back !important;
    color: @main-back !important;
  }

  .selectColor {
    color: @main-back !important;
  }
</style>
