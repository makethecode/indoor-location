<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-tabs type="border-card">
        <el-tab-pane label="表格">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <!--选择日-->
            <div class="block" style="width:250px; padding-bottom: 10px; float: left;">
              <el-date-picker
                v-model="day"
                type="date"
                placeholder="选择日期"
              />
            </div>
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
          </el-header>
          <!--表格-->
          <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--style="width: 100%"-->
          <!--&gt;-->
          <el-table
            :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%">
            <el-table-column
              fixed
              prop="name"
              label="名称"
              width="150"
            />
            <el-table-column
              fixed
              prop="no"
              label="设备号"
              width="150"
            />
            <el-table-column
              prop="0"
              label="00:00"
              width="120"
            />
            <el-table-column
              prop="1"
              label="01:00"
              width="120"
            />
            <el-table-column
              prop="2"
              label="02:00"
              width="120"
            />
            <el-table-column
              prop="3"
              label="03:00"
              width="120"
            />
            <el-table-column
              prop="4"
              label="04:00"
              width="120"
            />
            <el-table-column
              prop="5"
              label="05:00"
              width="120"
            />
            <el-table-column
              prop="6"
              label="06:00"
              width="120"
            />
            <el-table-column
              prop="7"
              label="07:00"
              width="120"
            />
            <el-table-column
              prop="8"
              label="08:00"
              width="120"
            />
            <el-table-column
              prop="9"
              label="09:00"
              width="120"
            />
            <el-table-column
              prop="10"
              label="10:00"
              width="120"
            />
            <el-table-column
              prop="11"
              label="11:00"
              width="120"
            />
            <el-table-column
              prop="12"
              label="12:00"
              width="120"
            />
            <el-table-column
              prop="13"
              label="13:00"
              width="120"
            />
            <el-table-column
              prop="14"
              label="14:00"
              width="120"
            />
            <el-table-column
              prop="15"
              label="15:00"
              width="120"
            />
            <el-table-column
              prop="16"
              label="16:00"
              width="120"
            />
            <el-table-column
              prop="17"
              label="17:00"
              width="120"
            />
            <el-table-column
              prop="18"
              label="18:00"
              width="120"
            />
            <el-table-column
              prop="19"
              label="19:00"
              width="120"
            />
            <el-table-column
              prop="20"
              label="20:00"
              width="120"
            />
            <el-table-column
              prop="21"
              label="21:00"
              width="120"
            />
            <el-table-column
              prop="22"
              label="22:00"
              width="120"
            />
            <el-table-column
              prop="23"
              label="23:00"
              width="120"
            />
          </el-table>
          <!--分页-->
          <div class="block" style="float: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="data.length">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图表">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <!--选择日-->
            <div class="block" style="width:250px; padding-bottom: 10px; float: left;">
              <el-date-picker
                v-model="day"
                type="date"
                placeholder="选择日期"
              />
            </div>
            <div style="width:50px; padding-bottom: 10px; float: left;" />
            <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-download">保存为图片</el-button>
          </el-header>
          <div class="chart-container">
            <chart height="100%" width="100%" />
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-container>
  </div>
</template>

<script>

import Chart from '@/components/Charts/MixChart'

export default {
  name: 'Onlinestat',
  components: { Chart },
  data() {
    return {
      data: [],
      currentPage: 1,
      pagesize: 20,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      day: '',
      filterText: ''
    }
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }

}
</script>
<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>
