<template>
  <div class="app-container">
    <el-container style="height: 100%;" direction="vertical">
      <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
       <!--选择框-->
      <div style="width:250px; padding-bottom: 10px; float: left;">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
          <!--选择日-->
          <div class="block" style="width:250px; padding-bottom: 10px; float: left;">
            <el-date-picker
              v-model="day"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
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
        <div style="width:50px; padding-bottom: 10px; float: left;">
        </div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary">导出<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-header>
          <!--表格-->
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'time', order: 'descending'}"
          >
            <el-table-column
              prop="name"
              label="名称"
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="no"
              label="编号"
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="details"
              label="详情"
              style="width: 20%">
              <!--:formatter="formatter"  不知道要不要用 1/2-->
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间"
              sortable
              style="width: 20%">
            </el-table-column>
          </el-table>
        <!--分页-->

    </el-container>
    <div class="block" style="float: right" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'AlarmRecord',
  data() {
    return {
      currentPage3: 5,
      // 传表格数据
      // tableData:
      // 选择框
      options: [{
        value: '选项1',
        label: '名称'
      }, {
        value: '选项2',
        label: '编号'
      }, {
        value: '选项3',
        label: '类型'
      }, {
        value: '选项4',
        label: '时间'
      }],
      value: '',
      // 选择日
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      day: '',
      // 搜索框
      filterText: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    // this.fetchLocation1(this)
  },
  mounted() {
    setTimeout(() => {
      console.log(this.stars, 'mounted')
    }, 2000)
  },
  methods: {
    // 不知道要不要用 2/2
    // formatter(row, column) {
    //   return row.address;
    // }
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    fetchLocation() {
      var choosen = JSON.stringify(this.$refs.tree2.getCheckedKeys())
      var arr = choosen.substring(1, choosen.length - 1).split(',')
      // if (!this.checkList.includes('离线显示')) {
      //   return
      // }
      const self = this
      axios.post('http://indoor.yunweizhi.net/index.php?r=loc/gettagpos',
        qs.stringify({
          'key': 'MgRekY432YP3jeUsMfah',
          'mapId': 'leaftest',
          'tags':
            [
              { 'major': arr[0], 'minor': 2598 }
            ]
        }))
        .then(function(response) {
          var ob1 = JSON.stringify(response.data)
          var json = JSON.parse(ob1)
          var data = JSON.parse(JSON.stringify(json.data))
          var tags = JSON.parse(JSON.stringify(data.tags))
          // if (!self.stars.includes({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })) {
          //   self.stars.push({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })
          // }
          self.stars.push({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })
          // console.log(self.stars.length, 'aaaaaaaaaaa')
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    fetchLocation1(self) {
      axios.post('http://indoor.yunweizhi.net/index.php?r=loc/gettagpos',
        qs.stringify({
          'key': 'MgRekY432YP3jeUsMfah',
          'mapId': 'leaftest',
          'tags':
            [
              { 'major': 10004, 'minor': 2598 }
            ]
        }))
        .then(function(response) {
          var ob1 = JSON.stringify(response.data)
          var json = JSON.parse(ob1)
          var data = JSON.parse(JSON.stringify(json.data))
          var tags = JSON.parse(JSON.stringify(data.tags))
          self.stars.push({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })
          console.log(self.stars.length, 'aaaaaaaaaaa')
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNode(data) {
      console.log(data.id)
    }
  }
}

</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-table-filter {
    max-height: 700px;
    overflow: auto;
  }
</style>
