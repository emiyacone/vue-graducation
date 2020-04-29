<template>
  <div>
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
   </el-breadcrumb>
   <el-card class="box-card">
      <!--列表-->
      <el-table
        :data="orderlist"
        style="width: 100%;font-size:10px">
          <el-table-column
          :index="item.id"
          v-for="item in tablelabels"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
         </el-table-column>
           <el-table-column
      align="right">
    </el-table-column>
    </el-table>
    <!--分页-->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
   </el-card>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      // 获取用户参数对象
      queryInfo: {
        // 当前页数
        pageNum: 1,
        // 一页显示多少
        pageSize: 2,
        BatchNo: ''
      },
      orderlist: [],
      tablelabels: [
        {
          id: 1,
          prop: 'userno',
          label: 'ID',
          width: '120'
        },
        {
          id: 2,
          prop: 'userid',
          label: '用户名',
          width: '120'
        }
      ],
      total: 0,
      treedata: []
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    async getUserlist () {
      this.queryInfo.BatchNo = this.$route.params.BatchNo
      const { data: result } = await this.$http.post('user/list.do', qs.stringify(this.queryInfo))
      if (result.status !== 0) return this.$message.error(result.msg)
      this.$message.success('获取数据成功')
      console.log(result)
      this.orderlist = result.data.list
      this.total = result.data.total
    },
    // 监听pagesize变化
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserlist()
    },
    // 监听当前页数该百年
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getUserlist()
    }
  }
}
</script>

<style lang="less" scoped>
 .el-select {
    width: 130px;
  }
 .search-input{
     background-color: #fff;
  }
</style>
