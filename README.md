## 前端相关配置

### (1)设置反向代理

```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 最上面 import 了几个模块，其中 vue 模块在 node_modules 中，App 即 App.vue 里定义的组件，router 即 router 文件夹里定义的路由

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 注册axios
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

### (2)跨域支持

在 `config\index.js` 中，找到 proxyTable 位置，

**proxyTable**: {

 *// 添加以下内容*  **'/api'**: {

  **target**: **'http://localhost:8443'**,

  **changeOrigin**: **true**  }

},

断开服务器Ctrl + C 然后Enter

运行服务器 npm run dev

### (3)具体使用某一接口

```javascript
<template>
  <div class="hello">
    <h1>springboot data:{{message}}</h1>
    <button @click="getdata()">获取数据</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: 'this is the front\'message'
    }
  },
  methods: {
    getdata: function () {
      this.$axios
        .post('/test').then(successResponse => {
          console.log(successResponse.data)
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

# 