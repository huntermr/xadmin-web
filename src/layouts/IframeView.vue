<template>
  <iframe
    :id="id"
    :src="url"
    frameborder="0"
    width="100%"
    height="800px"
    scrolling="auto"></iframe>
</template>

<script>

export default {
  name: 'IframeView',
  data () {
    return {
      url: '',
      id: ''
    }
  },
  created () {
    this.goUrl()
  },
  updated () {
    this.goUrl()
  },
  watch: {
    $route (to, from) {
      this.goUrl()
    }
  },
  methods: {
    goUrl () {
      const url = this.$route.meta.url
      if (url !== null && url !== undefined) {
        this.url = url
        // window.open(this.url);
      }
    }
  }
}
</script>

<style scoped>

</style>
