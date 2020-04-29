<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div>
        <span>数据查询系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' :'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <!--侧边栏菜单区域-->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          router
          :collapse="isCollapse"
          :default-active="activePath">
          <el-menu-item :index="'/'+item.path" v-for="item in menulist" :key="item.id" @click="saveNavState('/'+item.path)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [
        {
          id: '0',
          path: 'listorder',
          name: '生产工单查询'
        },
        // {
        //   id: '1',
        //   path: 'confirmmessage',
        //   name: '发货单确认'
        // },
        {
          id: '2',
          path: 'listinvoice',
          name: '发货信息明细'
        },
        {
          id: '3',
          path: 'usermanage',
          name: '用户管理'
        }
      ],
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 点击按钮，菜单折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    logout () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    height:100%;
  }
  .el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  .el-aside{
    background-color: #333744;
  }
  .toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .home-main{
    background-color:'#EAEDF2'
  }
</style>
