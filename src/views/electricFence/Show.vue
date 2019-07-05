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
        getElectricFence().then(response => {
          this.list = response.data.location
          this.arr = this.list.split('-')
          var i
          for (i = 0; i < this.arr.length; i++) {
            var arr1 = this.arr[i]
            var arr2 = arr1.split(';')
            var finalarr = []
            for (var j = 0; j < arr2.length; j++) {
              var myarr=[]
              var x = arr2[j].split(',')[0]
              var y = arr2[j].split(',')[1]
              myarr = [x, y]
              this.$set(finalarr, j , myarr)
            }
            this.$set(this.polygon.latlngs, i ,finalarr)
          }
        })
      }
    }
  }
</script>

