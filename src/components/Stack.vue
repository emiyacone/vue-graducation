<template>
  <div>
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产工单查询</el-breadcrumb-item>
      <el-breadcrumb-item>板号</el-breadcrumb-item>
   </el-breadcrumb>
   <el-card class="box-card">
     <!--搜索添加区-->
     <el-row>
        <el-col :span="15">
            <el-input class="search-input" placeholder="请输入内容" v-model="input3">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
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
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handlemore(scope.$index, scope.row)">桶明细</el-button>
      </template>
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
          prop: 'label',
          label: '板号',
          width: '120'
        }
      ],
      total: 0,
      dialogVisible: false,
      prodetailvisible: false,
      treedata: [],
      defaultProps: {
        children: 'chirden',
        label: 'label'
      },
      prodetail: {}
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    async getUserlist () {
      this.queryInfo.BatchNo = this.$route.params.BatchNo
      const { data: result } = await this.$http.post('prodetail/selectbybatchno.do', qs.stringify(this.queryInfo))
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
    },
    async handlemore (index, row) {
      // 查询批次号下所有的板号
      console.log(row)
      this.$router.push({ name: 'ProDetail', params: { StackNo: row.label } })
    },
    getmessage () {
      this.prodetailvisible = true
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
