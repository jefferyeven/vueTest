<template>
  <el-row>
    <el-col :span="12">
      <div>
        <el-upload
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="upload">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div class="container">
          <div class="paramItem">
            <strong>点击在以下图片,获取要替换的颜色：</strong>
            <div class="center" id="canvasImg">
              <canvas id="myCanvas" @click="clickCanvas">
              </canvas>
            </div>
            <div id="colorGet2-color">
            </div>
          </div>
        </div>
    </div>
    </el-col>
    <el-col :span="12">
      <div>
        <strong>选择颜色</strong><colorPicker  v-model="color"></colorPicker>{{color}}
      </div>
      <div>
        <el-button round @click="insteadImageColor">替换颜色</el-button>
      </div>
      <div id="resultimgdiv" style="width: 700px;height: 500px">
      </div>
    </el-col>
  </el-row>
</template>
<script scoped>
import {getPixelColor} from './js/getcolor'
import {AutoAlignImage} from './js/imageUtil'
import $ from 'jquery'
export default {
  name: 'Index',
  props: {
  },
  components: {
  },
  computed: {
    resultImageUrl: {
      get: function () {
        return 'http://localhost:8443/down?filename=' + this.resultImageName
      },
      set: function (newvalue) {
        this.resultImageName = newvalue
      }
    }
  },
  data () {
    return {
      imageUrl: '',
      fileName: '',
      color: '#ff0000',
      canvasColor: '',
      resultImageName: ''
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      } else {
        // 使用画布画出图片
        this.imageUrl = window.URL.createObjectURL(file)
        this.drawimage('myCanvas', this.imageUrl)
        console.log(this.imageUrl)
      }
      return isJPG
    },
    drawimage (aim, imageurl) {
      var img = new Image()
      img.src = imageurl
      img.onload = function () {
        img = AutoAlignImage(img, 700, 500)
        var c = document.getElementById(aim)
        console.log(img.width)
        c.width = img.width
        c.height = img.height
        var ctx = c.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
      }
    },
    clickCanvas (ev) {
      var x, y
      x = ev.layerX
      y = ev.layerY
      console.log(x)
      var colorData = getPixelColor('myCanvas', x, y)
      this.canvasColor = colorData.hex
      $('#colorGet2-color').html('<div style="height:40px;width:30%;display:inline-block;background-color:' + colorData.hex + '">当前点击位置颜色：<br/>十六位颜色：' + colorData.hex + '<br/>')
    },
    upload (params) {
      let formData = new FormData()
      formData.append('file', params.file)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post('/upload', formData, config).then(res => {
          const data = res.data
          if (data.code === 200) {
            this.fileName = data.fileName
          } else {
            this.fileName = ''
          }
          this.resultImageUrl = ''
        })
    },
    handleChangeColor (val) {
      console.log('输出颜色值', val) // 颜色 #6c8198
    },
    insteadImageColor () {
      if (this.canvasColor === '') {
        alert('请点击选择元素')
        return
      }
      this.$axios({
        url: '/insteadImageColor',
        method: 'get',
        params: {
          imagesrc: this.fileName,
          colorfrom: this.canvasColor,
          colorto: this.color
        }
      }).then(res => {
        const data = res.data
        if (data.code === 200) {
          this.resultImageUrl = this.fileName
          $('#resultimgdiv').html('<div style="width: 700px;height: 500px"> <img style="width: 700px" src="' + this.resultImageUrl + '&math=' + Math.random() + '"></div>')
        } else {
          this.resultImageName = ''
          alert(data.msg)
        }
      })
    }
  },
  mounted () {

  },
  created () {
  }
}
</script>

<style scoped>
</style>
