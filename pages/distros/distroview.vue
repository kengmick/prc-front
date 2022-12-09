<template>
  <div>
    <section v-if="distro" class="container mx-auto my-6">
      <CardsDistroFullCard class="mx-auto" :distro="distro" />
    </section>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl">Showz</h2>
      </section>
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Bio</h2>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl">Pictures</h2>
      </section>
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl">Members</h2>
      </section>
      <section class="my-2">
        <h2 id="merch" class="chedder text-2xl">Merch</h2>
      </section>

      <section class="my-2">
        <h2 id="links" class="chedder text-2xl">Links</h2>
      </section>
      <section class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
      </section>
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
