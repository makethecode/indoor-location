<template>
  <div class="map" />
</template>

<script>
import L from 'leaflet'
import LeafletDraw from 'leaflet-draw'

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
      stat: null
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
