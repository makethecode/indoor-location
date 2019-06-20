<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-tabs type="border-card">
        <el-tab-pane label="网关">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <!--搜索框-->
            <div style="width:250px; padding-bottom: 10px; float: left;">
              <el-input
                v-model="filterText"
                placeholder="输入编号/名称"
              >
                <el-button slot="append" icon="el-icon-refresh" />
              </el-input>
            </div>
            <div style="width:50px; padding-bottom: 10px; float: left;" />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right" /></el-button>
          </el-header>
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
              label="设备编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconId }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备数量"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备类型"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconType }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备状态"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconStatus }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备X轴坐标"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.beaconX }}
              </template>
            </el-table-column>
            <el-table-column
              label="设备Y轴坐标"
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
        </el-tab-pane>
        <el-tab-pane label="标签">
        <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
        <!--搜索框-->
        <div style="width:250px; padding-bottom: 10px; float: left;">
        <el-input
        v-model="filterText"
        placeholder="输入名称/编号/标识符"
        >
                <el-button slot="append" icon="el-icon-refresh" />
              </el-input>
            </div>
            <div style="width:50px; padding-bottom: 10px; float: left;" />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right" /></el-button>
          </el-header>
          <!--表格-->
          <el-table
            :data="cardTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
              label="人员编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.personId }}
              </template>
            </el-table-column>
            <el-table-column
              label="标签编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.cardId }}
              </template>
            </el-table-column>
            <el-table-column
              label="标签数量"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.cardNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="标签类型"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.cardType }}
              </template>
            </el-table-column>
            <el-table-column
              label="标签状态"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.cardStatus }}
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
          <div class="block" style="float: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cardTableList.length">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基站">
          <!--<el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">-->
            <!--&lt;!&ndash;搜索框&ndash;&gt;-->
            <!--<div style="width:250px; padding-bottom: 10px; float: left;">-->
              <!--<el-input-->
                <!--v-model="filterText"-->
                <!--placeholder="输入编号/名称"-->
              <!--&gt;-->
                <!--<el-button slot="append" icon="el-icon-refresh" />-->
              <!--</el-input>-->
            <!--</div>-->
            <!--<div style="width:50px; padding-bottom: 10px; float: left;" />-->
            <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
            <!--<el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加基站</el-button>-->
            <!--<el-dialog title="添加基站" :visible.sync="dialogFormVisible" width="750px">-->
              <!--<el-form :model="form">-->
                <!--<el-form-item label="名称:" :label-width="formLabelWidth" style="width: 600px">-->
                  <!--<el-input v-model="form.name" autocomplete="off" />-->
                <!--</el-form-item>-->
                <!--<el-form-item label="mac:" :label-width="formLabelWidth" style="width: 600px">-->
                  <!--<el-input v-model="form.mac" autocomplete="off" />-->
                <!--</el-form-item>-->
                <!--<el-form-item label="楼层:" :label-width="formLabelWidth" style="width: 800px">-->
                  <!--<el-select v-model="form.floor">-->
                    <!--<el-option label="1" value="shanghai" />-->
                    <!--<el-option label="2" value="beijing" />-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
              <!--</div>-->
            <!--</el-dialog>-->
          <!--</el-header>-->
          <!--表格-->
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
              label="基站编号"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerId }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站数量"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerNum }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站类型"
              sortable
              min-width="10">
              <template slot-scope="scope">
                {{ scope.row.routerType }}
              </template>
            </el-table-column>
            <el-table-column
              label="基站状态"
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
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
import { getdStates } from '../../api/dStates'
import { getCardInfo } from '../../api/card'
import { getRouterInfo } from '../../api/router'
export default {
  filters: {

  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      data: [],
      beaconlist: [],
      cardlist: [],
      routerlist: [],
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

    'beaconTableList': function() {
      return this.beaconlist.filter(item => {
        // if (!this.createDate || !this.overDate) {
        //   return true
        // }
        // if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) { return true } else { return false }
        return true
      })
    },
    'cardTableList': function() {
      return this.cardlist.filter(item => {
        // if (!this.createDate || !this.overDate) {
        //   return true
        // }
        // if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) { return true } else { return false }
        return true
      })
    },
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
      getdStates().then(response => {
        this.beaconlist = response.data
      })
      getCardInfo().then(response => {
        this.cardlist = response.data
      })
      getRouterInfo().then(response => {
        this.routerlist = response.data
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
