<template>
  <div>
    <Nav />
    <Nuxt
      :class="{
        'h-[calc(100vh-88px)]': isProfilePage,
      }"
    />
    <Footer
      :class="{
        hidden: isProfilePage,
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      isProfilePage: false,
    }
  },
  mounted() {
    if (this.$route.name === 'bands-bandProfile') {
      this.isProfilePage = true
    }
  },
}
</script>

<style scoped>
.error {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  z-index: 9999999999999;
  background: red;
}
</style>
