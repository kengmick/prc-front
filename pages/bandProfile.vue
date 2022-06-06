<template>
  <div>
    <!-- fix video slider -->
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
          <h2 class="text-white text-4xl mb-14">History/Bio/Message</h2>
          <div class="pb-24">
            <p class="text-white text-xl">{{ band.bio }}</p>
          </div>
        </div>
      </section>
      <!-- details section -->
      <section class="w-11/12 sm:w-3/4 xl:w-1/2 mx-auto mt-6 px-14">
        <div class="flex items-center gap-10">
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
        <div v-if="band.logo" class="my-4">
          <img :src="band.logo.url" alt="" />
        </div>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full mb-6 sm:w-3/4 my-auto flex">
            <div class="w-full">
              <h2 class="text-3xl chedder main_red_text">Genre</h2>
              <p>{{ band.genreAlt }}</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div class="w-full">
              <h2 class="text-3xl chedder main_red_text">Location</h2>
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
        </div>
        <div flex flex-col sm:flex-row items-center mb-4>
          <div v-if="band.contact" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Band Contact</h2>
              <p>{{ band.contact }}</p>
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Date Started</h2>
              <p>{{ band.dateStarted }}</p>
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2 class="text-3xl chedder main_red_text">Links</h2>
              <!-- add login to check link  -->
              <a
                v-if="band.linkOne"
                class="underline-offset-2 underline"
                :href="band.linkOne"
                target="_blank"
                >{{ band.linkOne }}</a
              >
              <a
                v-if="band.linkTwo"
                class="underline-offset-2 underline"
                :href="band.linkTwo"
                target="_blank"
                >{{ band.linkTwo }}</a
              >
            </div>
          </div>
        </div>
      </section>
      <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
      <!-- edit component -->

      <section class="w-11/12 sm:w-3/4 xl:w-1/2 mx-auto mt-6 px-14">
        <h2 class="text-3xl chedder main_red_text mb-6">Showz</h2>
        <div v-if="band.events">
          <pre>{{ band.events }}</pre>
          <section class="container mx-auto">
            <div
              v-for="(event, index) in band.events"
              :key="events.title + index"
              class="shadow-md w-full h-full flex flex-col ms:h-64 sm:my-12 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
            >
              <div v-if="event.eventPoster" class="w-full sm:w-1/3 h-64">
                <img
                  class="h-full w-full"
                  :src="event.eventPoster.url"
                  alt=""
                />
              </div>
              <div class="p-6">
                <p class="chedder text-xl inline sm:text-center sm:block">
                  {{ moment(String(event.date)).format('MMM') }}
                </p>
                <p class="chedder text-xl inline sm:text-center sm:block">
                  {{ moment(String(event.date)).format('Do') }}
                </p>
              </div>
              <div class="flex flex-col flex-grow p-6">
                <div>
                  <p v-if="event.title" class="chedder text-2xl">
                    {{ event.title }}
                  </p>
                  <p v-if="event.headlinerOne" class="text-xl font-black pb-2">
                    Featuring {{ event.headlinerOne }}
                  </p>
                  <p
                    v-if="event.streetAddress && event.streetName"
                    class="text-xl"
                  >
                    The Vic, {{ event.streetAddress }} {{ event.streetName }} /
                    {{ moment(String(event.date)).format('LT') }} -
                    {{ moment(event.timeEnds, 'h').format('LT') }}
                  </p>
                  <p v-if="event.city && event.state" class="text-xl">
                    {{ event.city }}, {{ event.state }}
                  </p>
                </div>
                <div class="flex-grow flex items-center my-4 sm:my-0">
                  <NuxtLink
                    :to="{ path: 'eventview', query: { event: event.id } }"
                    class="border-2 border-black px-4 py-2"
                    >View Event</NuxtLink
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
        <!-- <section v-if="band.oldShows" class="container mx-auto">
          <h2>Historic Shows</h2>
          <div v-for="(show, index) in band.oldShows" :key="show + index">
            <p>
              {{ show.date }} {{ show.title }}, @{{ show.venueName }},{{
                show.city
              }},{{ show.state }}
            </p>
          </div>
        </section> -->
        <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
        <h2 class="text-3xl chedder main_red_text mb-6">Releases</h2>
        <section v-if="band.album">
          <h2 class="text-3xl">
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
        </section>
        <h2 class="text-3xl chedder main_red_text">Merch</h2>
        <h2 class="text-3xl chedder main_red_text">Songs</h2>
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
      userPermission: null,
      videos: [],
      posts: [],
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
    // const posts = await this.$strapi.find('posts', {
    //   band: this.band.id,
    // })
    // this.posts = posts
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
