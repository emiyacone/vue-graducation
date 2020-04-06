<template>
  <div>
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产工单查询</el-breadcrumb-item>
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
        style="width: 100%">
          <el-table-column
          :index="'/'+item.id"
          v-for="item in tablelabels"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
         </el-table-column>
          <el-table-column
            prop="uploadtime"
            label="上传时间">
          </el-table-column>
    </el-table>
   </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      // 获取用户参数对象
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      orderlist: [],
      tablelabels: [
        {
          id: '0',
          prop: 'orderno',
          label: '工单号',
          width: '80'
        },
        {
          id: '1',
          prop: 'factoryname',
          label: '工厂名',
          width: '80'
        },
        {
          id: '2',
          prop: 'batchno',
          label: '批次号',
          width: '80'
        },
        {
          id: '3',
          prop: 'prono',
          label: '产品编号',
          width: '80'
        },
        {
          id: '4',
          prop: 'proname',
          label: '产品名称',
          width: '80'
        },
        {
          id: '5',
          prop: 'orderno',
          label: '工单号',
          width: '80'
        },
        {
          id: '6',
          prop: 'plancount',
          label: '计划产量',
          width: '80'
        },
        {
          id: '7',
          prop: 'realcount',
          label: '实际产量',
          width: '80'
        },
        {
          id: '8',
          prop: 'startdate',
          label: '开始时间',
          width: '80'
        },
        {
          id: '8',
          prop: 'finishdate',
          label: '结束时间',
          width: '80'
        },
        {
          id: '9',
          prop: 'isfinish',
          label: '是否完成',
          width: '80'
        }
      ]
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    getUserlist () {
      const { data: result } = this.$http.post('users', { params: this.queryInfo })
      if (result.status !== 0) return this.$message.error('获取数据失败')
      this.$message.success('获取数据成功')
      this.orderlist = result.data.list
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
