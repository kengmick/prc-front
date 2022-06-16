<template>
  <div>
    <div v-if="band">
      <div
        style="z-index: -99999999"
        class="background_custom object-cover para relative h-[500px]"
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
            <h1 class="text-white text-2xl sm:text-4xl text-center">
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
          <h2
            class="text-white text-2xl sm:text-4xl text-center sm:text-left mb-14"
          >
            History/Bio/Message
          </h2>
          <div class="pb-24">
            <p class="text-white text-base sm:text-xl">{{ band.bio }}</p>
          </div>
          <!-- <div v-if="band.logo" class="m-4 max-w-[200px]">
            <img :src="band.logo.url" alt="" />
          </div> -->
        </div>
      </section>
      <!-- details section -->
      <div
        class="flex items-center gap-10 w-11/12 mx-auto sm:w-3/4 lg:w-1/2 mt-4"
      >
        <nuxtLink
          v-if="$strapi.user !== null && userPermission === $strapi.user.id"
          :to="{
            path: '/bandadmin',
            query: { band: band.id },
          }"
          class="btn_custom text-lg font-medium"
          >EDIT</nuxtLink
        >
      </div>
      <!-- photo section -->
      <div class="md:container mx-auto w-full sm:w-full md:w-1/2">
        <h2 v-if="band.photos">Band Photos</h2>
      </div>
      <section
        v-if="band.photos.length > 0"
        class="flex flex-col sm:grid sm:grid-cols-3 sm:container sm:mx-auto w-full md:w-1/2 sm:gap-4"
      >
        <div v-for="(pic, index) in band.photos" :key="pic + index">
          <img
            class="h-[400px] w-screen object-cover"
            :src="pic.pic.url"
            alt=""
          />
        </div>
      </section>

      <section class="container w-full px-4 xl:w-1/2 mx-auto mt-6 sm:px-0">
        <!-- logo here -->

        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div v-if="band.genreAlt" class="w-full">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>{{ band.genreAlt }}</p>
            </div>
            <div v-if="band.genre && !band.genreAlt">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>{{ band.genreAlt }}</p>
            </div>
            <div v-if="!band.genre && !band.genreAlt">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Genre
              </h2>
              <p>No Genre</p>
            </div>
          </div>
          <!-- col two of details  -->
          <div class="w-full mb-6 sm:w-3/4 flex">
            <div class="w-full">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Location
              </h2>
              <div v-if="band.city && band.state">
                <p>{{ band.city }}, {{ band.state }}</p>
              </div>
              <div v-if="band.country && band.city">
                <p>{{ band.country }}, {{ band.city }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->

          <!-- col two of details  -->
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Record Label
              </h2>
              <p>{{ band.recordLabel }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center mb-4">
          <!-- col one of details  -->
          <!-- col two of details  -->
          <div class="w-full flex">
            <div class="w-full mb-6">
              <div>
                <h2
                  class="text-3xl chedder main_red_text mb-6 underline underline-offset-4 pb-2"
                >
                  Members
                </h2>
              </div>

              <div class="block">
                <div
                  v-for="(member, index) in band.members"
                  :key="index + member.id"
                  class="mr-4"
                >
                  <div v-if="member.image" class="w-full mb-6">
                    <div class="w-full flex flex-col sm:flex-row">
                      <img
                        class="object-cover pb-6 h-[120px] min-w-[100px] max-w-[100px] sm:w-[200px] sm:h-[150px] sm:max-w-[200px] pr-2"
                        :src="member.image.url"
                        alt=""
                      />
                      <div class="flex-grow flex flex-col w-full">
                        <div>
                          <p class="text-xl font-bold">{{ member.name }}</p>
                          <div v-if="member.dateStart" class="text-gray-500">
                            started
                            {{
                              moment(String(member.dateStart)).format(
                                'MMMM Do YYYY'
                              )
                            }}
                          </div>
                        </div>
                        <div v-if="member.instrument" class="pt-2">
                          <p>Playing {{ member.instrument }}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div flex flex-col sm:flex-row items-center mb-4>
          <div
            v-if="band.contact && band.altContacts.length === 0"
            class="w-full sm:w-3/4 flex"
          >
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Contacts
              </h2>
              <p>{{ band.contact }}</p>
            </div>
          </div>
          <div v-if="band.altContacts.length > 0" class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Band Contact
              </h2>
              <p
                v-for="(contact, index) in band.altContacts"
                :key="contact.contact + index"
              >
                {{ contact.contact }}
              </p>
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Date Started
              </h2>
              <p>{{ band.dateStarted }}</p>
            </div>
          </div>
          <div class="w-full sm:w-3/4 flex">
            <div class="w-full mb-6">
              <h2
                class="text-3xl chedder main_red_text underline underline-offset-4 pb-2"
              >
                Links
              </h2>

              <div v-if="band.linkOne">
                <a
                  v-if="band.linkOne"
                  class="underline-offset-2 underline"
                  :href="band.linkOne"
                  target="_blank"
                  >{{ band.linkOne }}</a
                >
              </div>
              <h3 v-else>No Links Added ...</h3>
            </div>
          </div>
        </div>
      </section>
      <!-- shows, releases(historic information): photos, title, reacord label, date released, album, song(playable ) | merch  -->
      <!-- edit component -->

      <section class="container w-full px-4 sm:px-0 xl:w-1/2 mx-auto mt-6">
        <h2 class="text-3xl main_red_text underline underline-offset-2 pb-6">
          Showz
        </h2>
        <div v-if="band.events" class="mb-6">
          <div v-if="band.events.length > 0">
            <section class="mx-auto">
              <div
                v-for="(event, index) in band.events"
                :key="event.title + index"
                class="w-full h-full mx-auto flex flex-col ms:h-64 sm:mx-auto sm:flex-row transition-all duration-200 hover:scale-105"
              >
                <NuxtLink
                  :to="{ path: 'eventview', query: { event: event.id } }"
                >
                  <div v-if="event.eventPoster" class="w-full h-44 sm:h-64">
                    <img
                      class="h-full w-full"
                      :src="event.eventPoster.url"
                      alt=""
                    />
                  </div>
                </NuxtLink>

                <div class="flex flex-col flex-grow py-4 px-6 sm:p-6 bg-black">
                  <NuxtLink
                    :to="{ path: 'eventview', query: { event: event.id } }"
                  >
                    <div class="text-white">
                      <p v-if="event.title" class="chedder text-xl">
                        {{ event.title }}
                        {{ moment(String(event.date)).format('MMM') }}
                        {{ moment(String(event.date)).format('Do') }}
                      </p>
                      <p>
                        {{ moment(String(event.date)).format('LT') }} -
                        {{ moment(event.timeEnds, 'h').format('LT') }}
                      </p>
                      <p
                        v-if="event.headlinerOne"
                        class="text-lg font-black pb-2"
                      >
                        Featuring {{ event.headlinerOne }}
                      </p>
                      <p
                        v-if="event.streetAddress && event.streetName"
                        class="text-lg"
                      >
                        The Vic, {{ event.streetAddress }}
                        {{ event.streetName }}
                      </p>
                      <p v-if="event.city && event.state" class="text-lg">
                        {{ event.city }}, {{ event.state }}
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div v-else class="my-6"><h3>No Upcoming Showz</h3></div>
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
        <section>
          <h2
            class="text-3xl chedder main_red_text chedder underline underline-offset-4 pb-2"
          >
            Releases
          </h2>
          <div v-if="band.releases">
            <section v-if="band.releases.length > 0" class="mb-6">
              <div class="flex flex-col sm:grid-cols-3 sm:grid">
                <div
                  v-for="(r, index) in band.releases"
                  :key="r + index"
                  class="max-w-[350px] hover:scale-110 duration-200 transition-all ease-linear"
                >
                  <a :href="r.link" target="_blank">
                    <div
                      v-if="r.title"
                      class="py-4 px-2 border-2 border-black bg-black"
                    >
                      <h3 class="text-white">{{ r.title }}</h3>
                    </div>
                    <div v-if="r.image">
                      <img :src="r.image.url" alt="" />
                    </div>
                    <div class="p-2 bg-black text-white">
                      <div v-if="r.date">
                        <h3>{{ r.date }}</h3>
                      </div>
                      <div v-if="r.link">
                        <h3>
                          <a :href="r.link" target="_blank">{{ r.link }}</a>
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          </div>
          <h3 v-else>No Releases</h3>
        </section>
        <section v-if="band.album === 'hello'">
          <h2 class="text-3xl main_red_text mb-4">Albums</h2>
          <!-- <SliderContainer v-if="band.album" id="main-container" class="py-10">
            <AlbumCard
              v-for="(album, index) in band.album"
              :key="index"
              :album="album"
              :band="band.id"
              :class="band.album.length <= 1 ? 'w-screen' : ''"
            />
          </SliderContainer> -->
          <!-- album -->
          <!-- <pre>{{ band.album }}</pre> -->
          <!-- add picture, title, dateReleased -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <tr>
                <th v-if="band.album[0].albumCover" class="text-left chedder">
                  Image
                </th>
                <th class="text-left chedder">Title</th>
                <th class="text-left chedder">Release Date</th>
                <th class="text-left chedder">Link</th>
              </tr>
              <tr
                v-for="(album, index) in band.album"
                :key="album.title + index"
              >
                <td v-if="album.albumCover">
                  <img
                    v-if="album.albumCover"
                    class="w-[100px] h-[66px] object-cover"
                    :src="album.albumCover.formats.thumbnail.url"
                    alt=""
                  />
                  <div
                    v-else
                    class="w-[100px] h-[66px] bg-black flex items-center justify-center"
                  >
                    <img src="~/static/imageIcon.svg" alt="" />
                  </div>
                </td>
                <td v-if="album.title">{{ album.title }}</td>
                <td v-if="album.dateReleased">{{ album.dateReleased }}</td>
                <td v-else>No Date</td>
                <td v-if="album.link"><a :href="album.link">View Song</a></td>
                <td v-else>No Link</td>
              </tr>
            </table>
          </div>
        </section>
        <div v-if="band.merch" class="mb-6">
          <h2
            v-if="band.merch.length > 0"
            class="text-3xl chedder main_red_text my-4 chedder"
          >
            Merch
          </h2>
        </div>
        <!-- merch goes here  -->
        <div v-if="band.merch">
          <section v-if="band.merch.length > 0">
            <div class="flex flex-col gap-4 sm:grid-cols-3 sm:grid sm:gap-4">
              <div
                v-for="(m, index) in band.merch"
                :key="m + index"
                class="w-full sm:w-[300px] hover:scale-110 transition-all ease-linear duration-200"
              >
                <a :href="m.productLink" target="_blank">
                  <div v-if="m.productImage">
                    <div
                      v-if="m.productName"
                      class="py-4 px-2 border-2 border-black bg-black"
                    >
                      <h3 class="text-white">{{ m.productName }}</h3>
                    </div>
                    <div>
                      <img :src="m.productImage.url" alt="" />
                    </div>
                    <div class="p-2 bg-black text-white">
                      <div v-if="m.productLink">
                        <h3>
                          <a :href="m.productLink" target="_blank">{{
                            m.productLink
                          }}</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <!-- <table class="w-full">
                <tr>
                  <th
                    v-if="band.merch[0].productImage"
                    class="text-left chedder"
                  >
                    Image
                  </th>
                  <th class="text-left chedder">Description</th>
                  <th class="text-left chedder">Link</th>
                </tr>
                <tr v-for="(m, index) in band.merch" :key="m.title + index">
                  <td v-if="m.productImage">
                    <img
                      v-if="m.productImage"
                      class="w-[100px] h-[66px] object-cover"
                      :src="m.productImage.url"
                      alt=""
                    />
                    <div
                      v-else
                      class="w-[100px] h-[66px] bg-black flex items-center justify-center"
                    >
                      <img src="~/static/imageIcon.svg" alt="" />
                    </div>
                  </td>
                  <td v-if="m.productName">{{ m.productName }}</td>
                  <td v-else>No Description</td>
                  <td v-if="m.productLink">
                    <a :href="m.productLink">View Merch</a>
                  </td>
                  <td v-else>No Link</td>
                </tr>
              </table> -->
            </div>
          </section>
        </div>
        <h2
          class="text-3xl chedder main_red_text chedder underline underline-offset-4 pb-2 mt-6"
        >
          Songs
        </h2>
        <!-- songs -->

        <div v-if="band.singles">
          <section v-if="band.singles.length > 0">
            <div class="overflow-x-auto">
              <table class="w-full">
                <tr>
                  <th class="text-left chedder">Title</th>
                  <th class="text-left chedder">Release Date</th>
                  <th class="text-left chedder">Link</th>
                </tr>
                <tr
                  v-for="(song, index) in band.singles"
                  :key="song.songTitle + index"
                >
                  <td v-if="song.songTitle">
                    <a :href="song.link" target="_blank" class="underline">{{
                      song.songTitle
                    }}</a>
                  </td>
                  <td v-else>No Title</td>
                  <td v-if="song.date">{{ song.date }}</td>
                  <td v-else>No Release Date</td>
                  <td v-if="song.link">
                    <a :href="song.link" target="_blank">View Song</a>
                  </td>
                  <td v-else>No Link</td>
                </tr>
              </table>
            </div>
          </section>
        </div>
        <div v-else class="my-4"><h3>No Songs Uploaded</h3></div>
      </section>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      band: null,
      load: false,
      hide: false,
      bandEvents: [],
      userPermission: null,
      videos: [],
      posts: [],
      formValues: {},
    }
  },
  async mounted() {
    // get bands
    try {
      const band = await this.$strapi.findOne('bands', this.$route.query.band)
      this.band = band
      this.userPermission = band.users_permissions_user.id
      const bandEvents = await this.$strapi.find('events', {
        title: band.title,
      })
      this.bandEvents = bandEvents
      console.log(bandEvents)
    } catch (error) {
      return error
    }
    // get events

    // const posts = await this.$strapi.find('posts', {
    //   band: this.band.id,
    // })
    // this.posts = posts
  },
  methods: {
    moment,
  },
}
</script>

<style land="scss" scoped>
.btn_custom {
  padding: 0.5em 1.5em;
  border: 2px solid black;
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
}

.background_custom {
  background-position: center center;
  background-size: fill;
  background-repeat: no-repeat;
}
.text-background {
  background: url('~/static/live_background.png');
  background-clip: text;
  color: transparent;
}
</style>
