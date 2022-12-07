<template>
  <div>
    <section v-if="distro" class="container mx-auto my-6">
      <CardsDistroFullCard class="mx-auto" :distro="distro" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distro: false,
      // image data
      image: '',
      distroImages: [],
      // user logged in data
      user: null,
      // event data
      eventPosterFile: '',
      eventForm: false,
      events: [],
      // form vals
      formValues: {},
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
    }
  },
  async mounted() {
    try {
      const distro = await this.$strapi.findOne(
        'record-labels',
        this.$route.query.distro
      )
      this.distro = distro
      this.user = distro.id
      this.image = distro.distroImage.url
      this.distroImages = distro.distroImages
      this.user = this.$strapi.user.id
      this.events = this.distro.events
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" scoped></style>
