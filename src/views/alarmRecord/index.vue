<template>
  <div class="app-container">
      <div class="block">
        开始时间：
        <el-date-picker v-model="createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsStart" style="margin-right: 10px;" @change="startTimeStatus" />
        至
        <el-date-picker v-model="overDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" style="margin-left: 10px;" @change="endTimeStatus" />
      </div>
      <!--表格-->
      <!--<el-table-->
        <!--v-loading="listLoading"-->
        <!--:data="list"-->
        <!--element-loading-text="Loading"-->
        <!--border-->
        <!--fit-->
        <!--highlight-current-row-->
      <!--&gt;-->
        <el-table
                  :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="警告编号"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.alarmId }}
          </template>
        </el-table-column>
        <el-table-column
          label="卡片编号"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.cardId }}
          </template>
        </el-table-column>
        <el-table-column
          label="警告详情"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.alarmContent }}
          </template>
        </el-table-column>
        <el-table-column
          label="警告时间"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.alarmTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="X轴坐标"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.X }}
          </template>
        </el-table-column>
        <el-table-column
          label="Y轴坐标"
          sortable
          align="center"
          min-width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.Y }}
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
    <div class="block" style="float: right">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableList.length">
    </el-pagination>
    </div>
  </div>
</template>

<script>

import { getAlarmInfo } from '../../api/alarm'

export default {
  name: 'AlarmRecord',
  filters: {

  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      data: [],
      list: [],
      listLoading: true,
      createDate: '',
      overDate: '',
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.overDate
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.createDate
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime()
            )
          }
        }
      },
      // 搜索框
      filterText: ''
    }
  },
  computed: {

    'tableList': function() {
      return this.list.filter(item => {
        if (!this.createDate || !this.overDate) {
          return true
        }
        if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) { return true } else { return false }
      })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      this.listLoading = true
      getAlarmInfo().then(response => {
        this.list = response.data
      })
      this.listLoading = false
    },
    startTimeStatus: function(value) {
      this.createDate = value
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.overDate = value
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
