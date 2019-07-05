<template>
  <div class="app-container">
    <el-container style="height: 100%; min-height:800px;" direction="vertical">
      <el-container>
        <el-main>
          <l-map style="height: 100%; width: 100%" :options="{zoomControl: false}" :crs="crs" :center="center">
            <l-image-overlay
              :url="mapsource"
              :bounds="bounds"
              style="height: 900px; width: 100%"
            />
            <l-polygon
              :lat-lngs="polygon.latlngs"
              :color="polygon.color"
            />
          </l-map>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import { getElectricFence } from '@/api/electricFence'
export default {
  name: 'Show',
  data() {
    return {
      arr: [],
      list: [],
      index: '',
      mapsource: 'map.png',
      bounds: [[0, 0], [500, 500]],
      crs: L.CRS.Simple,
      polygon: {
        latlngs: [],
        color: 'blue'
      },
      center: [300, 300]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var finalarr = [[]]
      getElectricFence().then(response => {
        this.list = response.data.location
        this.arr = this.list.split('-')
        for (var i = 0; i < this.arr.length; i++) {
          var arr1 = this.arr[i]
          var arr2 = arr1.split(';')
          for (var j = 0; j < arr2.length; j++) {
            var x = arr2[j].split(',')[0]
            var y = arr2[j].split(',')[1]
            var myarr = []
            myarr[j] = [x, y]
            finalarr[i][j] = myarr[j]
            //alert(myarr[j])
          }
          alert(finalarr[i][j])
        }
        // // this.polygon.latlngs = response.data.location
        // for (this.index; this.index < this.list.length; this.index++) {
        //   // 数组值变化并且重新渲染的方法
        //   alert(this.index)
        //   this.$set(this.polygon.latlngs, this.index, this.list[this.index].location)
        // }

        console.log(this.list)
      })
    }
  }
}
</script>

