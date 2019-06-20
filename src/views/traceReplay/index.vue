<template xmlns:border-radius="">
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: right; font-size: 12px">
        <div style="width:250px; padding-bottom: 10px; float: left;">
          <el-input
            v-model="filterText"
            placeholder="输入编号/名称"
            class="filterText"
            clearable
          >
            <el-button slot="append" icon="el-icon-refresh" @click=" empty"/>
          </el-input>
        </div>
        <div style="width: 100px;float: left">
          <el-button type="primary" icon="el-icon-view" circle @click="fetchLocation" />
        </div>
        <!--单选框组-->
        <div style="width: 250px;float: left">
        <el-radio-group v-model="radio">
        <el-radio :label="3">1X</el-radio>
        <el-radio :label="6">2X</el-radio>
        <el-radio :label="9">4X</el-radio>
        </el-radio-group>
        </div>
        <div  style="width: 650px;float: left" >
          <!--选择日-->
          <div class="block" style="width: 250px;float: left" gutter="20">
            <el-date-picker
              v-model="day"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <!--时间选择器-->
          <div style="float: right">
            <el-time-picker
              is-range
              v-model="time"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
        </div>

        <!--<div style="width: 250px;float: left">-->
          <!--<el-checkbox-group v-model="checkList">-->
            <!--<el-checkbox label="离线显示" />-->
            <!--<el-checkbox label="多信息窗" />-->
          <!--</el-checkbox-group>-->
        <!--</div>-->
        <!--<div style="width: 150px;float: left">-->
          <!--<el-dropdown>-->
            <!--<span class="el-dropdown-link">-->
              <!--刷新频率：1秒<i class="el-icon-arrow-down el-icon&#45;&#45;right" />-->
            <!--</span>-->
            <!--<el-dropdown-menu slot="dropdown"><el-dropdown-item>1秒</el-dropdown-item>-->
              <!--<el-dropdown-item>2秒</el-dropdown-item>-->
              <!--<el-dropdown-item>5秒</el-dropdown-item>-->
              <!--<el-dropdown-item>10秒</el-dropdown-item>-->
              <!--<el-dropdown-item>20秒</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        <!--</div>-->

      </el-header>
      <el-container>

        <el-aside>
          <div class="el-table-filter">
            <el-tree
              ref="tree2"
              class="filter-tree"
              :data="data"
              border-radius:0px
              show-checkbox
              node-key="id"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNode"
            />
          </div>

        </el-aside>
        <el-main>
          <l-map style="height: 100%; width: 100%" :options="{zoomControl: false}" :crs="crs">
            <l-image-overlay
              :url="mapsource"
              :bounds="bounds"
              style="height: 900px; width: 100%"
            />
            <l-marker
              v-for="star in stars"
              :key="star.name"
              :lat-lng="star"
            >
              <l-popup
                :content="'mapid:'+star.name +
                  '<br>'+'battery:100'+'<br>'
                  +'status:safe'
                "
              />
            </l-marker>
          </l-map>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'TraceReplay',
  data() {
    return {
      // 时间选择器
      time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      // 选择日
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      day: '',
      // 单选框组
      radio: 3,
      mapsource: 'map.png',
      bounds: [[-300, -300], [600, 600]],
      crs: L.CRS.Simple,
      stars: [],
      checkList: [],
      filterText: '',
      data: [{
        id: 1,
        label: '根节点',
        children: [{
          id: 2,
          label: 'TAG',
          children: [{
            id: 10004,
            label: '10004'
          }, {
            id: 11,
            label: '2513'
          }, {
            id: 12,
            label: '1000402598'
          }]
        }, {
          id: 3,
          label: 'SZTG',
          children: [{
            id: 20,
            label: '22354'
          }, {
            id: 21,
            label: '22468'
          }]
        }, {
          id: 4,
          label: '手环',
          children: [{
            id: '橙色手环',
            label: '橙色手环'
          }, {
            id: 31,
            label: '红色手环'
          }, {
            id: 32,
            label: '演示手环'
          }]
        }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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

    empty() {
      this.filterText = ''
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
