<template>
  <div v-if="band">
    <!-- if band has logo then will render it else will default to prc background  -->
    <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
      <div
        class="w-full sm:w-[432px] h-auto pb-[16px] border-4 border-main-red"
        :style="[
          band.bandProfileImg
            ? { background: `url(${band.bandProfileImg.url})` }
            : { background: 'url(/punk-background.png)' },
        ]"
      >
        <!-- header of card -->
        <div class="h-full w-full bg-black flex items-center justify-center">
          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <p
              v-if="band.bandName"
              class="chedder text-center card_header_size text-white m-0"
              style="text-decoration: underline"
            >
              <!-- add band.bandName -->
              {{ band.bandName }}
            </p>
          </NuxtLink>
        </div>
        <!-- end header of card -->
        <!-- innder container for card info -->
        <section class="p-[16px]">
          <!-- basic info component -->
          <section class="flex flex-col md:flex-row gap-[16px]">
            <!-- contact and location  -->
            <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
              <div
                class="w-full h-full md:w-[238px] md:h-[160px] border-4 p-[16px] border-black bg-white flex flex-col justify-center"
              >
                <p v-if="band.genre" class="card_basic_info_text chedder">
                  {{ band.genre }}
                </p>
                <p v-if="band.gereAlt" class="card_basic_info_text chedder">
                  {{ band.genreAlt }}
                </p>
                <p
                  v-if="band.city && band.state"
                  class="card_basic_info_text chedder"
                >
                  {{ band.city }}, {{ band.state }}
                </p>
                <p v-if="band.dateStarted" class="card_basic_info_text chedder">
                  {{ band.dateStarted }}
                </p>
              </div>
            </NuxtLink>
            <!-- secondary info box -->
            <div
              class="w-full h-full md:w-[144px] md:h-[200px] border-4 p-[16px] border-black bg-white flex flex-col justify-center"
            >
              <NuxtLink
                :to="{
                  path: '/bandprofile',
                  hash: '#showz',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">Showz</p>
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: '/tours',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">Tour</p>
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: '/classifieds',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">
                  Classified
                </p>
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: '/bandprofile',
                  hash: '#releases',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">
                  Releases
                </p>
              </NuxtLink>
              <NuxtLink
                :to="{
                  path: '/bandprofile',
                  hash: '#songs',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">Songs</p>
              </NuxtLink>
              <!-- <NuxtLink
              :to="{
                path: '/bandprofile',
                hash: '#links',
                query: { band: band.id },
              }"
            >
              <p class="text-[16px] chedder underline text-main-red">Links</p>
            </NuxtLink> -->
              <NuxtLink
                :to="{
                  path: '/bandprofile',
                  hash: '#posts',
                  query: { band: band.id },
                }"
              >
                <p class="text-[16px] chedder underline text-main-red">Posts</p>
              </NuxtLink>
            </div>
          </section>
          <!-- end of basic info component -->
          <!-- Logo Box and Add Box -->
          <section class="flex flex-col md:flex-row gap-[16px] mt-[16px]">
            <!-- logo -->

            <div
              v-if="band.bandProfileImg"
              class="h-full w-full md:h-[240px] md:w-[240px]"
            >
              <NuxtLink
                :to="{ path: '/bandprofile', query: { band: band.id } }"
              >
                <img
                  class="object-cover w-full h-full border-4 border-black hover:scale-110 transition-all duration-100"
                  :src="band.bandProfileImg.url"
                  alt=""
                />
              </NuxtLink>
            </div>
            <div v-else class="h-[240px] w-[240px]">
              <NuxtLink
                :to="{ path: '/bandprofile', query: { band: band.id } }"
              >
                <img
                  class="object-cover w-full h-full border-4 border-black hover:scale-110 transition-all duration-100"
                  src="~/static/punk-background.png"
                  alt=""
                />
              </NuxtLink>
            </div>
            <!-- addvertisement box -->
            <!-- <div
            class="h-full w-full md:h-[240px] md:w-[144px] border-4 border-main-red bg-white"
          >
            <p class="underline chedder card_basic_info_text text-center">
              Create Add
            </p>
          </div> -->
          </section>
          <!-- end of logo box and add box  -->
        </section>
        <!-- end basic info card -->
        <!-- annoucement card container -->
        <section class="pl-[16px] pr-[16px]">
          <!-- end of context -->
          <!-- this is the container of the content -->
          <div
            class="h-[187px] border-4 border-black p-[16px] bg-white flex flex-col justify-around"
          >
            <div v-if="announcement" class="flex items-center">
              <h2 class="text-[13px] grow">{{ announcement.title }}</h2>
              <div class="flex">
                <img
                  v-if="index !== 0"
                  src="~/static/left.svg"
                  alt=""
                  class="h-8"
                  @click="back"
                />
                <img
                  v-if="index !== announcements.length - 1"
                  src="~/static/right.svg"
                  alt=""
                  class="h-8"
                  @click="forward"
                />
              </div>
            </div>
            <div v-else>
              <h2 class="text-[13px]">Keep posted on upcoming announcements</h2>
            </div>

            <div v-if="announcement" class="flex gap-2">
              <div
                v-if="announcement.image"
                class="h-[72px] w-[72px] flex-grow"
              >
                <img
                  :src="announcement.image.url"
                  alt=""
                  class="object-fill h-full"
                />
              </div>
              <div v-else class="h-[72px] w-[72px] flex-grow">
                <img
                  src="~/static/punk-background.png"
                  alt=""
                  class="object-fill h-full"
                />
              </div>
              <div class="w-10/12 flex items-center">
                <p class="text-[12px]">
                  {{ announcement.text }}
                </p>
              </div>
            </div>

            <div v-else class="flex gap-2">
              <div class="h-[72px] w-[72px] flex-grow">
                <img
                  src="~/static/punk-background.png"
                  alt=""
                  class="object-fill h-full"
                />
              </div>
              <div class="w-10/12 flex items-center">
                <p class="text-[12px]">
                  There are no annoucements yet released
                </p>
              </div>
            </div>

            <div v-if="announcement" class="bg-black pt-2 pb-2">
              <NuxtLink
                :to="{
                  path: 'announcement',
                  query: {
                    profileId: band.id,
                    announcementId: announcement.id,
                    profileType: 'bands',
                    profileName: band.bandName,
                  },
                }"
              >
                <p class="text-white text-center text-[13px]">
                  View Announcement
                </p>
              </NuxtLink>
            </div>
          </div>
          <!-- end of context -->
          <!-- This is the end of content container thing   -->
        </section>
        <!-- action buttons  -->
        <section class="hidden justify-around px-[16px] pt-[8px]">
          <Button text="Become Fanatic" @click.native="fav(band.id)" />
          <Button text="$ 1 Add" />
          <Button text="$ 3 Classified" />
          <Button text="Share" />
        </section>
        <section class="px-[16px] pt-[8px]">
          <NuxtLink :to="{ path: '/bandprofile', query: { band: band.id } }">
            <Button
              class="bg-black chedder text-xl"
              text="View Profile"
              @click="logit"
            />
          </NuxtLink>
        </section>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import Button from './Button.vue'
export default {
  components: { Button },
  props: {
    band: {
      type: Object,
      default() {
        return {}
      },
    },
    isHome: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      errorMessage: '',
      userFavs: [],
      updated: null,
      index: 0,
    }
  },

  computed: {
    announcement() {
      return this.band.announcements[this.index] || ''
    },
    announcements() {
      return this.band.announcements || ''
    },
  },

  methods: {
    logit() {
      console.log('hey this is a double click')
    },
    async fav(bandId) {
      const stringId = bandId.toString()

      if (!this.$strapi.user) {
        alert('you must be logged in to favorite')
        console.log('the user is not logged in ')
        return this.$emit('popup', 'this event logged ....')
      } else {
        // get all user favorite stuff ... if they have any ... add a new favorite to it ... then resave all favoites to the user favs then route to favorite page the userFavs is an array so you can iterate over it using an array method wich is really an object at the end of the day or it wouldn't be about to have a method attached to it. Thank you for coming ... please come again soon.
        const user = await this.$strapi.user
        this.userFavs = await user.favs
        const json = { favObject: { type: 'band', id: stringId } }
        this.userFavs.push(json)
        //  favs: [...this.userFavs, { favObject: { ...json } }],
        console.log(this.userFavs)
        try {
          const f = await this.$strapi.update('users', this.$strapi.user.id, {
            favs: this.userFavs,
          })

          console.log(f)
        } catch (error) {
          this.errorMessage = 'error'
          console.log(error, 'this is the error message')
        }
      }

      this.$router.push({
        path: 'favorites',
        query: { user: this.$strapi.user.id, favs: this.updated },
      })
    },
    close() {
      this.errorMessage = ''
    },
    forward() {
      if (this.index !== this.announcements.length - 1) {
        this.index++
      }
    },
    back() {
      if (this.index !== 0) {
        this.index--
      }
    },
  },
}
</script>

<style scoped>
.card_header_size {
  font-size: 56px;
}
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
.card_basic_info_text {
  font-size: 27px;
}

.modal {
  height: 100vh;
  width: 100vw;
  background: green;
}
</style>
