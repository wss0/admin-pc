<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div id="title">大佬后台</div>
        <div id="nav">
          <div class="left">
            
          </div>
          <div class="right"></div>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          

        </el-aside>
        <!-- 主体 -->
        <el-main>
          <calendar></calendar>
          <!-- <router-view></router-view> -->
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import calendar from "@/components/calendar.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    calendar
  }
};
</script>
<style lang="less" scope>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
