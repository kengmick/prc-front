<template>
  <!--  :style="{ backgroundImage: `url(/punk-background.png)` }"  -->
  <div
    class="relative w-screen h-[100%] border-box border-black border-[2px] overflow-y-scroll"
  >
    <nuxt-img
      class="custom_b"
      format="webp"
      preload
      :src="band.bandProfileImg.url"
      width="300"
      height="400"
    />
    <!-- header -->
    <section
      class="h-[38px] w-screen bg-black flex items-center justify-center fixed l-0 top-[48px] border-box border-black border-[2px] z-50"
    >
      <h2 class="chedder text-[36px] text-white leading-none">
        {{ band.bandName }}
      </h2>
    </section>
    <!-- info box  -->
    <section class="w-auto mt-[45px] mx-2">
      <section class="w-full bg-black text-white p-2">
        <NuxtLink
          class="chedder underline pb-3 inline-block"
          :to="{
            path: '/bands/bandprofile',
            hash: '#showz',
            query: { band: band.id },
          }"
          >Showz</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#releases',
            query: { band: band.id },
          }"
          >Releases</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#songs',
            query: { band: band.id },
          }"
          >Songs</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#videos',
            query: { band: band.id },
          }"
          >Videos</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#bio',
            query: { band: band.id },
          }"
          >Biography</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#members',
            query: { band: band.id },
          }"
          >Members</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#pictures',
            query: { band: band.id },
          }"
          >Pictures</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#merch',
            query: { band: band.id },
          }"
          >Merch</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#links',
            query: { band: band.id },
          }"
          >Links</NuxtLink
        >
        <NuxtLink
          class="chedder underline pb-2"
          :to="{
            path: '/bands/bandprofile',
            hash: '#chatroom',
            query: { band: band.id },
          }"
          >Chat Room</NuxtLink
        >
      </section>
      <section class="my-4 mx-2">
        <div class="bg-black flex flex-col justify-center items-center p-4">
          <p v-if="band.genre" class="chedder text-[16px] text-white">
            {{ band.genre }}
          </p>
          <p v-if="band.genreAlt" class="chedder text-[16px] text-white">
            {{ band.genreAlt }}
          </p>
          <p v-else class="chedder text-[16px] text-white">PUNK</p>
          <p class="chedder text-[16px] text-white">
            {{ band.city }}, {{ band.state }}
          </p>
          <p class="chedder text-[16px] text-white">{{ band.dateStarted }}</p>
        </div>
      </section>
    </section>
    <section class="container mx-auto h-[45vh]">
      <div class="grid grid-cols-2 gap-4 h-[40vh]">
        <div class="bg-black h-[40vh]">
          <nuxt-img
            class="object-cover w-full h-full grayscale"
            :src="band.bandProfileImg.url"
            alt=""
          />
        </div>
        <div class="bg-black flex justify-center items-center">
          <p class="text-white chedder">+ Add Featured Card</p>
        </div>
      </div>
    </section>

    <section
      v-if="!announcement"
      class="bg-white text-black w-[95%] h-[76px] mx-auto px-[4px] py-[4px] mt-[8px]"
    >
      <h2 class="text-[18px]">Announcement</h2>
      <p class="text-[12px]">This is the body of the text ...</p>
    </section>
    <section
      v-if="announcement"
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px] mt-[8px]"
    >
      <h2 class="text-[18px]">{{ announcement.title }}</h2>
      <p class="text-[12px]">{{ announcement.text }}</p>
    </section>
    <!-- scrollable content here -->
    <!-- band info  -->

    <section class="container mx-auto mt-2">
      <section v-if="band.bio" class="mx-auto w-full z-50">
        <div
          class="px-1 w-11/12 sm:w-3/4 xl:w-3/4 bg-black lg:px-16 py-10 mx-auto"
        >
          <h2
            class="text-white text-2xl sm:text-4xl text-center sm:text-left mb-8"
          >
            History/Bio/Message
          </h2>
          <div class="px-2">
            <p class="text-white text-base sm:text-xl">{{ band.bio }}</p>
          </div>
          <!-- <div v-if="band.logo" class="m-4 max-w-[200px]">
            <img :src="band.logo.url" alt="" />
          </div> -->
        </div>
      </section>
    </section>

    <section v-if="band.members" class="my-2">
      <h2 id="members" class="chedder text-2xl my-6 text-center">
        <span class="bg-black text-white px-4 py-2">Performers</span>
      </h2>
      <div class="flex gap-4 overflow-y-scroll ml-2">
        <div
          v-for="performer in band.members"
          :key="performer.name"
          class="my-6"
        >
          <div class="w-[230px]">
            <SimpleCardsPerformers :performer="performer" />
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto">
      <h3 class="text-white text-2xl text-center mt-5">
        <span class="bg-black text-white px-4 py-2">Showz</span>
      </h3>
      <div
        v-if="band.events.length > 0"
        class="flex gap-4 overflow-y-scroll ml-2"
      >
        <div v-for="event in band.events" :key="event.title" class="my-6">
          <!-- <CardsShowCard :event="event" /> -->
          <div class="w-[230px] h-auto">
            <NuxtLink
              :to="{ path: '/events/eventview', query: { event: event.id } }"
            >
              <SimpleCardsEvent :event="event" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- releases -->
      <section class="my-5 ml-2">
        <h2 id="releases" class="chedder text-2xl text-white text-center my-4">
          Discography
        </h2>
        <!-- add releases button  -->
        <div>
          <div v-if="band.releases" class="flex gap-4 overflow-y-scroll">
            <!-- <pre>{{ band.releases }}</pre> -->
            <div
              v-for="release in band.releases"
              :key="release.title"
              :class="{ 'pl-2': band.releases.length === 1 }"
            >
              <div class="w-[230px] h-auto">
                <NuxtLink
                  :to="{
                    path: '/releases',
                    query: { releaseId: release.id, bandId: band.id },
                  }"
                >
                  <MobileReleases :release="release" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- songs -->
      <section class="my-5 mx-2 bg-white">
        <MobileSongs :band="band" />
      </section>
      <!-- photos -->
      <h2 id="releases" class="chedder text-2xl text-white text-center my-4">
        Photos
      </h2>
      <section v-if="band.photos" class="flex gap-4 overflow-y-scroll mb-10">
        <div v-for="(pic, index) in band.photos" :key="pic + index">
          <div class="w-[150px] h-[150px]">
            <img :src="pic.pic.url" alt="" class="h-full w-full" />
          </div>
        </div>
      </section>
    </section>
    <!-- buttons  -->
    <section
      class="flex justify-around items-center fixed bottom-0 left-0 bg-black w-screen h-[40px]"
    >
      <div
        class="w-[18%] h-[24px] bg-black flex justify-center items-center text-[14px] chedder text-white"
      >
        <span class="flex items-center justify-between w-full px-2 text-[14px]"
          ><img class="h-[12px] w-[12px]" src="/share.svg" alt="" />Share</span
        >
      </div>
      <div
        class="w-[66px] h-[24px] bg-black flex justify-center items-center text-[10px] chedder"
      >
        <span
          class="flex items-center justify-between w-full px-2 cursor-pointer text-white text-[14px]"
          @click="favorite('bands', band)"
          ><img
            v-if="isFav"
            class="h-[12px] w-[12px]"
            src="/heart.svg"
            alt=""
          /><img
            v-if="!isFav"
            class="h-[12px] w-[12px]"
            src="/notheart.svg"
            alt=""
          />Favorite</span
        >
      </div>
      <div
        class="w-[66px] h-[24px] bg-black flex justify-center items-center text-[14px] chedder"
      >
        <span
          v-if="!disableAll"
          class="flex items-center justify-between w-full px-2 cursor-pointer text-white text-[14px]"
          @click="goToAddCard(band)"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
        <span
          v-else
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
      </div>

      <div
        class="w-[70px] h-[24px] bg-black flex justify-center items-center text-[14px] chedder"
      >
        <span
          class="flex items-center justify-between w-full px-2 cursor-pointer text-white text-[14px]"
          @click="
            $router.push({
              path: '/qr',
              query: {
                route: `https://punkrockcompound.com/bands/bandprofile?band=${band.id}`,
              },
            })
          "
          ><img class="h-[12px] w-[12px]" src="/qr1.svg" alt="" />QR Code</span
        >
      </div>
    </section>
    <section
      v-if="addingCard"
      class="flex justify-center items-center relative top-[10px]"
    >
      <div
        class="w-11/12 bg-black text-white flex justify-center items-center text-[14px] chedder mt-[4px] py-4 mb-6 cursor-pointer"
        @click="$emit('selectUsersCard', band.id)"
      >
        <span v-if="usersCard">Add to this Card !!!</span>
        <span v-else>Add this Card !!!</span>
      </div>
    </section>
    <Modal class="z-50" v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
// import Button from './Button.vue'
export default {
  // components: { Button },
  props: {
    band: {
      type: Object,
      default() {
        return {}
      },
    },
    user: {
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
    disableAll: {
      type: Boolean,
      default() {
        return false
      },
    },
    addingCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    userBandToAddToo: {
      type: String || Number,
      default() {
        return ''
      },
    },
    addThisCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    addToYourCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    cardToAdd: {
      type: Object,
      default() {
        return {}
      },
    },

    selectUsersCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    usersCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    isFav: {
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
      chatComp: false,
      showModal: false,
    }
  },
  head: {
    bodyAttrs: {
      class: 'overflow-hidden',
    },
  },
  computed: {
    announcement() {
      return this.band.announcements[this.index] || ''
    },
    announcements() {
      return this.band.announcements || ''
    },
  },
  async mounted() {
    if (this.$strapi.user) {
      const f = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      this.favs = f.sort((a, b) => {
        if (a.type < b.type) {
          return -1
        }
        if (a.type > b.type) {
          return 1
        }
        return 0
      })
    }
  },
  methods: {
    async genCode() {
      const id = await this.band.id
      const temp = `bands/bandprofile/?band=${id}`
      console.log(temp)
      this.$router.push({
        path: '/qr',
        query: { type: temp, color: 'bands' },
      })
    },

    async favorite(type, data) {
      this.$emit('updatedFavs')
      if (!this.$strapi.user) {
        return (this.showModal = true)
      }
      if (this.$strapi.user) {
        try {
          const curFavs = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          if (curFavs.length > 0) {
            const isSame = curFavs.filter((f) => {
              return f.data.id === data.id && f.type === type
            })
            if (isSame) {
              this.unFollowFunc(type, data.id)
            }
            if (isSame.length === 0) {
              const fav = await this.$strapi.create('favs', {
                users_permissions_user: this.$strapi.user.id,
                data: data,
                type: type,
              })
              this.$emit('updatedFavs')
              console.log(fav, 'this is the fav')
            }
            this.$emit('updatedFavs')
          } else if (curFavs.length === 0) {
            const fav = await this.$strapi.create('favs', {
              users_permissions_user: this.$strapi.user.id,
              data: data,
              type: type,
            })
            this.$emit('updatedFavs')
            console.log(fav, 'this is the fav')
          } else {
            this.$emit('updatedFavs')
          }
          const f = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          this.$emit('createdFavs', f)
          this.$emit('updatedFavs')
        } catch (error) {
          console.log('there was an error in the create favs function')
        }
      }
      this.message = 'You must be logged in '
    },
    async unFollowFunc(type, id) {
      console.log('hello world')
      const curFavs = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(curFavs, ' cur favs ')
      this.$emit('updatedFavs')
      const filtered = curFavs.filter((f) => {
        console.log(f.data.id, ' the data id ', id)
        return f.data.id === id
      })
      console.log('============================= unfollow function " ')
      this.$emit('updatedFavs')

      if (filtered) {
        await this.$strapi.delete('favs', filtered[0].id)
        this.$emit('updatedFavs')
      }
      this.$emit('updatedFavs')
    },
    startChat(user) {
      console.log('user from the poster card ', user, ' the id ', user.id)
      this.$emit('startChat', user)
    },
    addFeaturedToBandCard() {
      // this will emit an event to add a card to the card that was clicked on .... the user owned card
      this.$emit('addFeaturedToBandCard', this.band)
    },
    goToAddCard(band) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        if (band.users_permissions_user.id === this.$strapi.user.id) {
          this.$router.push({
            path: '/addcardpage',
            query: { band: band.id, usersCard: true },
          })
        } else {
          this.$router.push({
            path: '/addcardpage',
            query: { band: band.id, usersCard: false },
          })
        }
      } else {
        return (this.showModal = true)
      }
    },
    addCardToData(userBandToAddToo, band) {
      // Check if user is logged in
      if (this.$strapi.user) {
        this.showModal = false
      } else {
        return (this.showModal = true)
      }
      console.log(band.users_permissions_user.id, this.$strapi.user.id)
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
  font-size: 18px;
}

.modal {
  height: 100vh;
  width: 100vw;
  background: green;
}
.scaleDown {
  transform: scale(30%);
  margin-left: -105px;
  margin-top: -140px;
}

.scaleDownThree {
  transform: scale(47.4%);
  margin-left: -80px;
  margin-top: -105px;
}
.custom_b {
  z-index: -999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  filter: blur(4px);
  filter: grayscale(1);
}
</style>
