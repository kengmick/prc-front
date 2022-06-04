<template>
  <div>
    <div v-if="band">
      <div
        style="z-index: -99999999"
        class="background_custom object-fill para relative h-[500px]"
        :style="{
          'background-image': `url(${band.bandProfileImg.url})`,
        }"
      >
        <div
          :class="load ? 'bottom-20' : 'bottom-0'"
          class="w-full absolute left-0 h-40 mx-auto transition-all duration-500"
        >
          <div
            :class="!hide ? '' : 'bg-opacity-80'"
            class="mx-auto w-11/12 sm:w-3/4 xl:w-1/2 h-40 bg-black transition-all flex flex-col items-center justify-center duration-500"
          >
            <h1 class="text-white text-center">
              {{ band.bandName }}
            </h1>
            <div
              :class="!hide ? '' : 'opacity-0 ß'"
              class="flex transition-all duration-1000"
            >
              <img src="~/static/red.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <section class="mx-auto w-full z-50">
        <div
          :class="load ? '-mt-24' : 'mt-0'"
          class="px-6 w-11/12 sm:w-3/4 xl:w-1/2 bg-black lg:px-16 py-10 mx-auto transition-all duration-500 z-50"
        >
          <h2 class="text-white text-4xl mb-14">BIO</h2>
          <div class="pb-24">
            <p class="text-white text-xl">{{ band.bio }}</p>
          </div>
        </div>
      </section>
      <!-- details section -->
      <section class="w-11/12 sm:w-3/4 xl:w-1/2 mx-auto mt-6 px-14">
        <div class="flex items-center gap-10">
          <h1 class="mb-0">Band Details</h1>

          <nuxtLink
            v-if="$strapi.user !== null && userPermission === $strapi.user.id"
            :to="{
              path: '/bandadmin',
              query: { band: band.id },
            }"
            class="btn_custom"
            >Edit</nuxtLink
          >
        </div>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full mb-6 sm:w-3/4 my-auto flex">
            <div class="w-full">
              <h2 class="text-3xl chedder main_red_text">Genre</h2>
              <p>{{ band.genre }}</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div class="w-full">
              <h2 class="text-3xl chedder main_red_text">HomeTown</h2>
              <p>{{ band.city }}, {{ band.state }}</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Manager</h2>
              <p>{{ band.bandManager }}</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Record Label</h2>
              <p>{{ band.recordLabel }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <!-- col two of details  -->
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Members</h2>
              <span
                v-for="(member, index) in band.members"
                :key="index + member.id"
                class="mr-4"
                >{{ member.name }}</span
              >
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Band Email</h2>
              <p>{{ band.bandEmail }}</p>
            </div>
          </div>
        </div>
      </section>
      <!-- edit component -->
      <section class="sm:w-3/4 mx-auto">
        <h2 v-if="band.album">
          Albums
          <span class="ptmono pl-4 text-xl">by {{ band.bandName }} </span>
        </h2>
        <SliderContainer v-if="band.album" id="main-container" class="py-10">
          <AlbumCard
            v-for="(album, index) in band.album"
            :key="index"
            :album="album"
            :band="band.id"
            :class="band.album.length <= 1 ? 'w-screen' : ''"
          />
        </SliderContainer>
        <h2 v-if="videos">
          Music Videos
          <span class="ptmono pl-4 text-xl">by {{ band.bandName }}</span>
        </h2>
        <!-- <VideoSlider id="video-container" class="py-10">
          <VideoCard
            v-for="(video, index) in videos"
            :key="index"
            class="scrollVideo"
            :video="video"
            :bandName="video.band.bandName"
          />
        </VideoSlider> -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      band: null,
      load: false,
      hide: false,
      userPermissions: null,
      videos: [],
    }
  },
  async mounted() {
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
      this.userPermission = band.users_permissions_user.id
    } catch (error) {
      return error
    }
  },
}
</script>

<style scoped>
.btn_custom {
  padding: 0.5em 1.5em;
  border: 1px solid black;
  background: black;
  color: white;
}

.background_custom {
  background-position: center center;
  background-size: fill;
  background-repeat: no-repeat;
}
</style>
