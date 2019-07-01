<template>
  <div class="app-container">
    <div class="map" />
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
  mounted() {
    this.map = L.map(this.$el, {
      drawControl: true,
      crs: L.CRS.Simple,
      minZoom: -5,
      zoomControl: false,
      attributionControl: false
    })
    var bounds = [[0, 0], [500, 500]]
    var image = L.imageOverlay('map.png', bounds).addTo(this.map)
    this.map.fitBounds(bounds)
    var drawnItems = new L.FeatureGroup()
    this.map.addLayer(drawnItems)
    var drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      }
    })
    this.map.addControl(drawControl)
    this.map.on(L.Draw.Event.CREATED, function(event) {
      drawnItems.addLayer(event.layer)
      var data = event.layer._latlngs[0]
      var ans = ''
      for (var i = 0; i < data.length; i++) {
        ans += data[i].lat + ',' + data[i].lng + '|'
      }
      // this.location = ans
      getElectricFence({ 'ans': ans }).then(res => {
        console.log(res)
      }).catch(e => {

      })
    })
  },
  methods: {

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
