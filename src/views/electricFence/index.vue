<template>
  <div class="app-container">
    <div class="map" />
    <el-button type="text" @click="open"></el-button>
    <!--保存-->
    <div>
      <el-dialog title="保存" :visible.sync="dialogSaveFormVisible" width="500px">
        <el-form ref="savelist" :model="savelist" :rules="rules" label-position="left" label-width="140px" style="width: 430px; margin-left:50px;">
          <el-form-item label="区域编号:" prop="mapId">
            <el-input v-model="savelist.mapId" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="可容纳最大人数:" prop="capability">
            <el-input v-model="savelist.capability" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="等级:" prop="level">
            <el-input v-model="savelist.level" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSaveFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save('savelist')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import L from 'leaflet'
import LeafletDraw from 'leaflet-draw'
import { getElectricFence , saveElectricFence} from '@/api/electricFence'
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

      savelist: {
        mapId: '',
        // status: '',
        capability: '',
        level: ''
      },
      rules: {
        mapId: [
          { required: true, message: '请输入区域编号', trigger: 'blur' }
        ],
        capability: [
          { required: true, message: '请输入最大容纳人数', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入区域等级', trigger: 'blur' }
        ]
      },
      dialogSaveFormVisible: false,
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
      this.dialogSaveFormVisible = true
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogSaveFormVisible = false
          saveElectricFence(this.savelist.mapId, this.savelist.capability, this.savelist.level).then(res => {
            console.log(res)
            if (res.re === 1) {
              this.$refs[formName].resetFields()
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            } else {
              this.$message.error('保存失败')
            }
            this.fetchData()
          }).catch(e => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
