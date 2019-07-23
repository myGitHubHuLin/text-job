<template>
  <el-row class="base-main">
    <el-col :span="2">
      <i class="el-icon-share" style="font-size: 60px"></i>
    </el-col>
    <el-col :span="17" class="base-table">
      <span v-for="(item,index) in baseClum" :key="index"  :class="{'no-border':index === baseClum.length-1 || index === 5,'border-buttom':index <= 5,'spWidth' : index === 5}">
        <b style="margin-right: 5px">{{`${item.title}:`}}</b>
        {{`${base[item.fild]}`}}
      </span>
    </el-col>
    <el-col :offset="1" :span="4" class="are">
      <span v-for="(item,index) in turnAre" :key="index" v-bind:style="{'background':item.color}">{{item.title}}</span>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    props: ['base', 'baseClum', 'turnAre'],
    name: 'Base',
  }
</script>
<style lang="less">
  .base-main {
    height: 60px;
    .base-table {
      border: 1px solid #cdcdcd;
      text-align: left;
      /*padding-right: 60px;*/
      > span {
        display: inline-flex;
        height: 30px;
        min-width: 140px;
        border-right: 1px solid #cdcdcd;
        border-top: 0;
        align-items: center;
        padding: 0 8px;
      }
    }
    .are {
      > span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        writing-mode: tb-rl;
        font-size: 14px;
        height: 100%;
        width: 100%/7;
        color: #fff;
      }
    }
  }
  .no-border{
    border-right: 0!important;
  }
  .border-buttom{
    border-bottom: 1px solid #cdcdcd;
  }
  .spWidth{
    width: calc(100% - 801px);
  }
</style>
