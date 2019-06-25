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
            <el-button slot="append" icon="el-icon-refresh" @click=" empty" />
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
        <!--<div style="width: 650px;float: left">-->
          <!--&lt;!&ndash;选择日&ndash;&gt;-->
          <!--<div class="block" style="width: 250px;float: left" gutter="20">-->
            <!--<el-date-picker-->
              <!--v-model="day"-->
              <!--type="date"-->
              <!--placeholder="选择日期"-->
            <!--/>-->
          <!--</div>-->
          <!--&lt;!&ndash;时间选择器&ndash;&gt;-->
          <!--<div style="float: right">-->
            <!--<el-time-picker-->
              <!--v-model="time"-->
              <!--is-range-->
              <!--range-separator="-"-->
              <!--start-placeholder="开始时间"-->
              <!--end-placeholder="结束时间"-->
              <!--placeholder="选择时间范围"-->
            <!--/>-->
          <!--</div>-->
        <!--</div>-->
        <div class="block">
          开始时间：
          <el-date-picker v-model="createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsStart" style="margin-right: 10px;" @change="startTimeStatus" />
          至
          <el-date-picker v-model="overDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" style="margin-left: 10px;" @change="endTimeStatus" />
        </div>
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
            <l-polyline
              :lat-lngs="polyline.latlngs"
              :color="polyline.color">
            </l-polyline>
          </l-map>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import { getLocation } from '../../api/location'

export default {
  name: 'TraceReplay',
  data() {
    return {
      // // 时间选择器
      // time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      // // 选择日
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now()
      //   }
      // },
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
      day: '',
      // 单选框组
      radio: 3,
      mapsource: 'map.png',
      bounds: [[-300, -300], [600, 600]],
      crs: L.CRS.Simple,
      zoom: 8,
      center: [47.413220, -1.319482],
      markerLatLng: [47.313220, -1.319482],
      testarray: [[]],
      polyline: {
        latlngs: [[]],
        color: 'green'
      },
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
    // this.fetchLocation()
  },
  mounted() {
    setTimeout(() => {
      console.log(this.stars, 'mounted')
    }, 2000)
  },
  methods: {
    startTimeStatus: function(value) {
      this.createDate = value
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.overDate = value
    },
    empty() {
      this.filterText = ''
    },

    fetchLocation() {
      getLocation({
        // startTime: '2019-06-24 12:00:00',
        // endTime: '2019-06-24 12:59:10',
        startTime: this.createDate,
        endTime: this.overDate,
        major: '10004',
        minor: '2504'
      }).then(response => {
        this.list = response.data
        let i = 0
        for (i; i < this.list.length; i++) {
          this.testarray[i] = [this.list[i].x, this.list[i].y]
        }
        this.polyline.latlngs = this.testarray
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
