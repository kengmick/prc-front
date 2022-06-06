<template>
  <div>
    <section v-if="distro && image" class="container mx-auto mt-6">
      <div
        v-if="distro.logo"
        class="flex flex-col items-center mb-4 sm:flex-row"
      >
        <img class="h-16 pr-6" :src="distro.logo.url" alt="" />
        <h1 class="main_red_text chedder text-4xl">{{ distro.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ distro.name }}</h1>
      </div>
      <div
        class="h-[500px] back"
        :style="`background-image: url(${image})`"
      ></div>
      <!-- gallery  -->
      <!-- media Gallery -->
      <section v-if="distroImages" class="container mx-auto px-2 sm:px-0">
        <h2 class="my-6">Pictures</h2>
        <section
          class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <div v-for="(img, index) in distroImages" :key="img.id + index">
            <img :src="img.formats.medium.url" alt="" />
          </div>
        </section>
      </section>
      <!-- description -->
      <h2 class="mt-4 text-3xl px-2 sm:px-0">History/Bio/Message</h2>
      <div v-if="distro.description.split('\n')" class="my-6 px-2 sm:px-0">
        <p
          v-for="(description, index) in distro.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ distro.description }}</p>
    </section>
    <section class="container mx-auto px-2 sm:px-0">
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl mb-4">Location</h3>
      <p v-if="distro.streetNumber" class="text-xl">
        {{ distro.streetNumber }} {{ distro.streetName }}, {{ distro.city }},
        {{ distro.state }} {{ distro.zip }}
      </p>
      <!-- <div v-if="distro.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ distro.genre }}
        </p>
      </div> -->
      <div v-if="distro.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Date Started</h3>
        <p class="text-xl">
          {{ distro.dateOpened }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
      <div v-if="distro.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Merch</h3>
        <p class="text-xl">
          {{ distro.contact }}
        </p>
      </div>
    </section>
    <!-- comments  -->
    <!-- comment box -->
    <section class="container mx-auto my-10">
      <h2 class="text-center text-2xl">Comments</h2>
      <div class="container shadow-md size p-10 my-10">
        <div v-if="posts">
          <div v-for="post in posts" :key="post.data">
            <div class="my-6">
              <div v-if="post.image">
                <img :src="post.image.formats.thumbnail.url" alt="" />
              </div>
              <p>
                <span class="main_red_text chedder"
                  >{{ post.users_permissions_user.username }} ...
                </span>
                {{ post.data }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>There are no comments on this classified add</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distro: {},
      image: '',
      distroImages: [],
      posts: [],
    }
  },
  async mounted() {
    try {
      const distro = await this.$strapi.findOne(
        'record-labels',
        this.$route.query.distro
      )
      this.distro = distro
      this.image = distro.distroImage.url
      this.distroImages = distro.distroImages
    } catch (error) {
      console.log(error)
    }
    try {
      const posts = await this.$strapi.find('posts', {
        record_label: this.$route.query.distro,
      })
      this.posts = posts
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
}
</style>
