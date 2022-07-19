<template>
  <div>
    <!-- if band has logo then will render it else will default to prc background  -->
    <div
      class="w-full sm:w-[432px] h-auto pb-[16px] border-4 border-main-red"
      :style="[
        band.logo
          ? { background: `url(${band.logo.url})` }
          : { background: 'url(/punk-background.png)' },
      ]"
    >
      <!-- header of card -->
      <div class="h-[58px] w-full bg-black flex items-center justify-center">
        <p
          v-if="band.bandName"
          class="chedder text-center card_header_size text-white m-0"
        >
          <!-- add band.bandName -->
          {{ band.bandName }}
        </p>
      </div>
      <!-- end header of card -->
      <!-- innder container for card info -->
      <section class="p-[16px]">
        <!-- basic info component -->
        <section class="flex gap-[16px]">
          <div
            class="w-[238px] h-[160px] border-4 p-[16px] border-black bg-white flex flex-col justify-center"
          >
            <p v-if="band.genre" class="card_basic_info_text chedder">
              Punk/{{ band.genre }}
            </p>
            <p v-if="band.gereAlt" class="card_basic_info_text chedder">
              Punk/{{ band.genreAlt }}
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
            <p class="card_basic_info_text chedder">555-555-5555</p>
          </div>
          <!-- secondary info box -->
          <div
            class="w-[144px] h-[160px] border-4 p-[16px] border-black bg-white flex flex-col justify-center"
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
            <NuxtLink
              :to="{
                path: '/bandprofile',
                hash: '#posts',
                query: { band: band.id },
              }"
            >
              <p class="text-[16px] chedder underline text-main-red">
                Chat Room
              </p>
            </NuxtLink>
          </div>
        </section>
        <!-- end of basic info component -->
        <!-- Logo Box and Add Box -->
        <section class="flex gap-[16px] mt-[16px]">
          <!-- logo -->
          <div v-if="band.logo" class="h-[240px] w-[240px]">
            <img
              class="object-cover w-full h-full border-4 border-black"
              :src="band.logo.url"
              alt=""
            />
          </div>
          <div v-else class="h-[240px] w-[240px]">
            <img
              class="object-cover w-full h-full border-4 border-black"
              src="~/static/punk-background.png"
              alt=""
            />
          </div>
          <!-- addvertisement box -->
          <div class="h-[240px] w-[144px] border-4 border-main-red bg-white">
            <!-- create action to take user to create add page ... think  -->
            <p class="underline chedder card_basic_info_text text-center">
              Create Add
            </p>
          </div>
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
          <h2 class="text-[13px]">Latest Announments !!!</h2>
          <!-- this data is an array and a slider ... content will change on click -->
          <div class="flex gap-2">
            <!-- placeholder image box -->
            <div class="h-[72px] w-[72px] bg-slate-400 flex-grow"></div>
            <div class="w-10/12 flex items-center">
              <p class="text-[12px]">
                This is some really cool announcement about our new show or band
              </p>
            </div>
          </div>
          <!-- button -->
          <div class="bg-black pt-2 pb-2">
            <p class="text-white text-center text-[13px]">View Announcement</p>
          </div>
        </div>
        <!-- end of context -->
        <!-- This is the end of content container thing   -->
      </section>
      <!-- action buttons  -->
      <section class="flex justify-around px-[16px] pt-[8px]">
        <Button text="Become Fanatic" @click.native="fav(band.id)" />
        <Button text="$ 1 Add" />
        <Button text="$ 3 Classified" />
        <Button text="Share" />
      </section>
    </div>
    <section
      v-if="errorMessage"
      class="w-screen h-full fixed top-0 right-0 flex items-center justify-center bg-black opacity-50 z-40"
      @click="close"
    ></section>
    <div
      v-if="errorMessage"
      class="w-1/2 h-1/2 fixed top-1/4 right-1/4 flex justify-center items-center bg-white z-50"
    >
      <h2 class="text-xl text-black">{{ errorMessage }} something</h2>
      <div class="absolute top-2 right-2 cursor-pointer" @click="close">
        Close <span class="text-2xl">x</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    band: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      errorMessage: '',
      userFavs: [],
      updated: null,
    }
  },

  methods: {
    async fav(bandId) {
      const stringId = bandId.toString()
      console.log(stringId)
      if (!this.$strapi.user) {
        this.errorMessage = 'You have to be logged in to your favorites '
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
          this.errorMesage = 'error'
          console.log(error, 'this is the error message')
        }
      }
      // if (this.updated) {
      //   this.$router.push({
      //     path: 'favorites',
      //     query: { user: this.$strapi.user.id, favs: this.updated },
      //   })
      // }
    },
    close() {
      this.errorMessage = ''
    },
  },
}
</script>

<style scoped>
.card_header_size {
  font-size: 56px;
}
.card_basic_info_text {
  font-size: 27px;
}
</style>
