<template>
<el-container>
  <el-header>
    <Header></Header>
  </el-header>
  <el-main style="padding: 0 20px">
    <router-view/>
  </el-main>
</el-container>
</template>
<script>
  import Header from './header/index'
  export default {
    name:'TextObj',
    components:{
      Header
    },
  }
</script>
