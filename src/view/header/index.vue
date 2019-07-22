<template>
  <el-row class="header-row" type="flex" justify="center" align="middle">
    <el-col :xs="2" :sm="8" :md="8" :lg="4" :xl="6" class="header-col">
      <div>{{title}}</div>
    </el-col>
    <el-col :xs="20" :sm="14" :md="14" :lg="16" :xl="16" :offset="2">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">预检分诊</el-menu-item>
        <el-menu-item index="2">患者管理</el-menu-item>
        <el-menu-item index="3">查询统计</el-menu-item>
        <el-menu-item index="4">质控</el-menu-item>
        <el-menu-item index="5">交接班</el-menu-item>
        <el-menu-item index="6">系统设置</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="header-row-right">
      <i class="el-icon-edit"></i>
      <span>管理员</span>
      <i class="el-icon-share"></i>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'Header',
    data() {
      return {
        title: '医护一体化急诊医疗信息平台',
        activeIndex: '2', // 选中的值
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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
  @white: #fff;
  .header-row {
    background: @main-back;
    color: @white;
    overflow: hidden;
    font-size: 20px;
    font-weight: bold;
    ul {
      background: @main-back;
      border-bottom: 0;
      li.is-active{
        background: @choose !important;
        color: @white !important;
      }
      li{
        color: @white !important;
        &:hover, &:focus, &:active ,&:visited{
          background: @choose !important;
        }
      }
    }
    .header-row-right { // 右侧管理员样式
      font-size: 16px;
      span{
        margin: 0 10px;
      }
      i{
        cursor: pointer;
      }
    }
  }
</style>
