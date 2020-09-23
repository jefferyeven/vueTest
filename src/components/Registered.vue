<template>
  <div class="hello">
    <h1>我是Registered</h1>
    <button @click="back">点我返回</button>
  </div>
</template>

<script>
export default {
  name: 'Registered',
  methods: {
    back: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
