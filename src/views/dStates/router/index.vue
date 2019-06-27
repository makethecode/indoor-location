<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height: 100%;" direction="vertical">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <!--搜索框-->
            <div style="width:250px; padding-bottom: 10px; float: left;">
              <el-input
                v-model="filterText"
                placeholder="输入编号/名称"
                class="id_input"
                clearable
              >
                <el-button slot="append" icon="el-icon-refresh" />
              </el-input>
            </div>
            <div style="width:50px; padding-bottom: 10px; float: left;" />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right" /></el-button>
          </el-header>
          <el-table
            :data="routerTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            strip
            v-loading="listLoading"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            style="margin-top:10px">
            <el-table-column
              label="编号"
              sortable
              min-width="10">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
            </el-table-column>
            <el-table-column
              label="路由编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerId }}
              </template>
            </el-table-column>
            <el-table-column
              label="路由数量"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerId }}
              </template>
            </el-table-column>
            <el-table-column
              label="路由类型"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerType }}
              </template>
            </el-table-column>
            <el-table-column
              label="路由状态"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerStatus }}
              </template>
            </el-table-column>
            <el-table-column
              label="公司编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.companyId }}
              </template>
            </el-table-column>
          </el-table>
    </el-container>
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="routerTableList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getRouterInfo } from '../../../api/router'
export default {
  filters: {

  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      routerlist: [],
      listLoading: true,
      // 搜索框
      filterText: ''
    }
  },
  computed: {
    'routerTableList': function() {
      return this.routerlist.filter(item => {
        // if (!this.createDate || !this.overDate) {
        //   return true
        // }
        // if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) { return true } else { return false }
        return true
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRouterInfo().then(response => {
        this.routerlist = response.data
      })
      this.listLoading = false
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'th'
      }
      return ''
    },
    handleSizeChange: function(size) {
      this.pageSize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }

  }
}

</script>
<style>
</style>
