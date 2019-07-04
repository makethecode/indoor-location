<template>
  <div class="app-container">
    <div class="map" />
    <el-button type="text" @click="open"></el-button>
  </div>

</template>

<script>
import L from 'leaflet'
import LeafletDraw from 'leaflet-draw'
import { getElectricFence } from '@/api/electricFence'
export default {
  name: 'TestMap',
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
    // LPopup,
    // LTooltip,
    // LFeatureGroup
  },
  data() {
    return {
      map: null,
      normal: null,
      stat: null,
      location: []
    }
  },
  beforeUpdate() {
    console.log('beforeupdated')
  },
  updated() {
    console.log(this.$root.LOCATION)
  },
  mounted() {
    let that = this
    var location = []
    that.map = L.map(that.$el, {
      crs: L.CRS.Simple,
      minZoom: -5,
      zoomControl: false,
      attributionControl: false
    })
    var bounds = [[0, 0], [500, 500]]
    var image = L.imageOverlay('map.png', bounds).addTo(that.map)
    that.map.fitBounds(bounds)
    var drawnItems = new L.FeatureGroup()
    that.map.addLayer(drawnItems)
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    })
    that.map.addControl(drawControl)
    that.map.on(L.Draw.Event.CREATED, function(event) {
      drawnItems.addLayer(event.layer)
      var data = event.layer._latlngs[0]
      var ans = []
      for (var i = 0; i < data.length; i++) {
        ans.push({ 'X': data[i].lat, 'Y': data[i].lng })
      }
      location.push(ans)
      that.take(location.length)
    })
    that.map.on(L.Draw.Event.DELETED, function(event) {
      alert('qingkong')
    })
  },
  methods: {
    take(location) {
      alert(location)
    }
  }
}
</script>

<style scoped>
  .map{
    width:100%;
    height:calc(100vh);
  }
  .sr-only {
    display: none;
  }
</style>
