<template>
  <!-- get gallery working  -->
  <div>
    <section v-if="venue && image" class="container mx-auto mt-6 px-2 sm:px-0">
      <div
        v-if="venue.logo"
        class="flex flex-col sm:flex-row items-center mb-4"
      >
        <img class="h-16 pr-6" :src="venue.logo.url" alt="" />
        <h1 class="main_red_text chedder">{{ venue.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ venue.name }}</h1>
      </div>
      <div
        class="h-[500px] back"
        :style="`background-image: url(${image})`"
      ></div>
      <!-- gallery  -->
      <!-- media Gallery -->
      <section v-if="venueImages.lenghth > 0" class="container mx-auto">
        <h2 class="my-6">Gallery</h2>
        <section
          class="mx-6 my-10 flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <div v-for="(img, index) in venueImages" :key="img.id + index">
            <img :src="img.formats.medium.url" alt="" />
          </div>
        </section>
      </section>
      <!-- description -->
      <h2 class="mt-4 text-3xl">History/Bio/Message</h2>
      <div v-if="venue.description.split('\n')" class="mt-6">
        <p
          v-for="(description, index) in venue.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ venue.description }}</p>
    </section>
    <section class="container mx-auto px-2 sm:px-0">
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl my-4">Location</h3>
      <p v-if="venue.streetNumber" class="text-xl">
        {{ venue.streetNumber }} {{ venue.streetName }}, {{ venue.city }},
        {{ venue.state }} {{ venue.zip }}
      </p>
      <!-- <div v-if="venue.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ venue.genre }}
        </p>
      </div> -->
      <div v-if="venue.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Date Started</h3>
        <p class="text-xl">
          {{ venue.dateOpened }}
        </p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ venue.contact }}
        </p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <!-- link to punk shows  -->
        <h3 class="text-3xl mb-4">Showz</h3>
        <p class="text-xl">add shows</p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <!-- link to punk shows  -->
        <h3 class="text-3xl mb-4">Links</h3>
        <p class="text-xl">add links</p>
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
      venue: {},
      image: '',
      venueImages: [],
      posts: [],
    }
  },
  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      this.image = venue.venueImg.url
      this.venueImages = venue.venueImages
    } catch (error) {
      console.log(error)
    }
    try {
      const posts = await this.$strapi.find('posts', {
        venue: this.$route.query.venue,
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
