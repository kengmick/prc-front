<template>
  <div>
    <section v-if="superman">
      <h1 class="text-center text-main-red">Admin</h1>
      <p>Welome !!!</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      superman: false,
    }
  },
  mounted() {
    if (this.$strapi.user) {
      if (
        this.$strapi.user.username === 'superman' &&
        this.$strapi.user.id === 60
      ) {
        this.superman = true
      } else {
        this.$router.push('/')
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
