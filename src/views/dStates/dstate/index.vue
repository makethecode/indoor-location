<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height:100%;" direction="vertical">
          <el-table
            :data="beaconTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
              label="基站编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconId }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站数量"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站类型"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconType }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站状态"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconStatus }}
              </template>
            </el-table-column>
            <el-table-column
              label="X轴坐标"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconX }}
              </template>
            </el-table-column>
            <el-table-column
              label="Y轴坐标"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconY }}
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
        :total="beaconTableList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getdStates } from '../../../api/dStates'
export default {
  filters: {

  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      data: [],
      beaconlist: [],
      listLoading: true,
      // 搜索框
      filterText: ''
    }
  },
  computed: {

    'beaconTableList': function() {
      return this.beaconlist.filter(item => {
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
      getdStates().then(response => {
        this.beaconlist = response.data
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
