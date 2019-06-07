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
            <div style="width:50px; padding-bottom: 10px; float: left;">
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-header>
            <!--表格-->
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :default-sort = "{prop: 'no', order: 'descending'}"
            >
              <el-table-column
                prop="no"
                label="编号"
                sortable
                style="width: 20%">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                sortable
                style="width: 20%">
              </el-table-column>
              <el-table-column
                prop="floor"
                label="楼层"
                sortable
                style="width: 5%">
              </el-table-column>
              <el-table-column
                prop="edition"
                label="版本"
                sortable
                style="width: 10%">
                <!--:formatter="formatter"  不知道要不要用 1/2-->
              </el-table-column>
              <el-table-column
                prop="time"
                label="最后连接时间"
                sortable
                style="width: 15%">
              </el-table-column>
            </el-table>
          <!--分页-->
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
            <div style="width:50px; padding-bottom: 10px; float: left;">
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-header>
          <!--表格-->
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :default-sort = "{prop: 'no', order: 'descending'}"
          >
            <el-table-column
              prop="no"
              label="编号"
              sortable
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              sortable
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="identity"
              label="标识号"
              sortable
              style="width: 5%">
            </el-table-column>
            <el-table-column
              prop="Electric "
              label="电量"
              sortable
              style="width: 10%">
              <!--:formatter="formatter"  不知道要不要用 1/2-->
            </el-table-column>
            <el-table-column
              prop="time"
              label="最后定位时间"
              sortable
              style="width: 15%">
            </el-table-column>
          </el-table>
          <!--分页-->
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
        </el-tab-pane>
        <el-tab-pane label="基站">
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
            <div style="width:50px; padding-bottom: 10px; float: left;">
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary" icon="el-icon-edit"  @click="dialogFormVisible = true">添加基站</el-button>
            <el-dialog title="添加基站" :visible.sync="dialogFormVisible" width="750px">
              <el-form :model="form">
                <el-form-item label="名称:" :label-width="formLabelWidth" style="width: 600px">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="mac:" :label-width="formLabelWidth" style="width: 600px">
                  <el-input v-model="form.mac" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="楼层:" :label-width="formLabelWidth" style="width: 800px">
                  <el-select v-model="form.floor" >
                    <el-option label="1" value="shanghai"></el-option>
                    <el-option label="2" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </el-header>
          <!--表格-->
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :default-sort = "{prop: 'no', order: 'descending'}"
          >
            <el-table-column
              prop="no"
              label="编号"
              sortable
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              sortable
              style="width: 20%">
            </el-table-column>
            <el-table-column
              prop="floor"
              label="楼层"
              sortable
              style="width: 5%">
            </el-table-column>
            <el-table-column
              prop="edition"
              label="版本"
              sortable
              style="width: 10%">
              <!--:formatter="formatter"  不知道要不要用 1/2-->
            </el-table-column>
            <el-table-column
              prop="time"
              label="最后连接时间"
              sortable
              style="width: 15%">
            </el-table-column>
          </el-table>
          <!--分页-->
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
        </el-tab-pane>

      </el-tabs>
      <el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'DStates',
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        mac: '',
        floor: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
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
