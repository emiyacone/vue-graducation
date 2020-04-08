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
            prop="uploadtime"
            label="上传时间">
          </el-table-column>
           <el-table-column
      align="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handlemore(scope.$index, scope.row)">板号</el-button>
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
    <el-dialog
    title="通过批次号查看产品详情"
    :visible.sync="dialogVisible"
    width="30%">
    <el-button type="primary" @click="getmessage"></el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    title="产品详情"
    :visible.sync="prodetailvisible"
    width="30%">
    <span>这是另一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="prodetailvisible = false">取 消</el-button>
      <el-button type="primary" @click="prodetailvisible = false">确 定</el-button>
    </span>
  </el-dialog>
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
        pageSize: 2
      },
      orderlist: [],
      tablelabels: [
        {
          id: 1,
          prop: 'orderno',
          label: '工单号',
          width: '120'
        },
        {
          id: 2,
          prop: 'factoryname',
          label: '工厂名',
          width: '120'
        },
        {
          id: 3,
          prop: 'batchno',
          label: '批次号',
          width: '80'
        },
        {
          id: 4,
          prop: 'prono',
          label: '产品编号',
          width: '120'
        },
        {
          id: 5,
          prop: 'proname',
          label: '产品名称',
          width: '180'
        },
        {
          id: 6,
          prop: 'orderno',
          label: '工单号',
          width: '80'
        },
        {
          id: 7,
          prop: 'plancount',
          label: '计划产量',
          width: '80'
        },
        {
          id: 8,
          prop: 'realcount',
          label: '实际产量',
          width: '80'
        },
        // {
        //   id: 9,
        //   prop: 'startdate',
        //   label: '开始时间',
        //   width: '80'
        // },
        // {
        //   id: 10,
        //   prop: 'finishdate',
        //   label: '结束时间',
        //   width: '80'
        // },
        {
          id: 11,
          prop: 'isfinish',
          label: '是否完成',
          width: '50'
        }
      ],
      total: 0,
      dialogVisible: false,
      prodetailvisible: false
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    async getUserlist () {
      const { data: result } = await this.$http.post('order/list.do', qs.stringify(this.queryInfo))
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
    handlemore (index, row) {
      // 查询批次号下所有的板号
      console.log(row.batchno)
      this.dialogVisible = true
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
