<template>
  <div class="hello">
    <div class="hello">
      <h1>springboot data:{{message}}</h1>
      <el-button @click="getdata()">获取数据</el-button>
      <el-button @click="go">点我跳转</el-button>
      <el-button @click="test">跳转</el-button>
    </div>
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
    },
    go: function () {
      this.$router.push('/Registered')
    },
    test: function () {
      this.$router.push('/Test')
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
