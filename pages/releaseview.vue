<template>
  <div>
    <h1 class="text-center">Releases view</h1>
    <section v-if="release" class="container mx-auto">
      <h2>{{ release.title }}</h2>
      <div v-if="release.image">
        <img :src="release.image.url" class="object-fix max-h-[400px]" alt="" />
      </div>
      <div v-else class="h-[400px] bg-black flex items-center justify-center">
        <img
          src="~/static/imageIcon.svg"
          class="object-fix max-h-[40px]"
          alt=""
        />
      </div>
      <!-- edit button  -->
      <div v-if="edit && release" class="my-6 w-full">
        <div class="w-full">
          <NuxtLink
            :to="{ path: 'releaseedit', query: { release: release.id } }"
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 w-full bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Edit Release</h3>
          </NuxtLink>
        </div>
      </div>
      <div v-if="release.date">
        <h2>Date Released</h2>
        <p>{{ release.date }}</p>
      </div>
      <div v-else>
        <h2>Date Released</h2>
        <p>No link added ...</p>
      </div>
      <div v-if="release.history">
        <h2>History</h2>
        <p>{{ release.history }}</p>
      </div>
      <div v-else>
        <h2>History</h2>
        <p>No history added ...</p>
      </div>
      <div v-if="release.link">
        <h2>Link</h2>
        <p>{{ release.link }}</p>
      </div>
      <div v-else>
        <h2>Link</h2>
        <p>No link added ...</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      release: {},
      merch: '',
      error: '',
      edit: false,
      user: '',
    }
  },
  async mounted() {
    try {
      const release = await this.$strapi.findOne(
        'releases',
        this.$route.query.release
      )
      if (release.users_permissions_user.id === this.$strapi.user.id) {
        this.edit = true
      }
      this.release = release
    } catch (error) {
      console.log(error)
      this.error = error
    }
  },
}
</script>
