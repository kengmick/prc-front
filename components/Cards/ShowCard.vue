<template>
  <div>
    <div
      v-if="event"
      class="w-[300px] h-[400px] border-box border-[#BA39A4] border-[2px] relative overscroll-none text-white"
    >
      <nuxt-img
        v-if="event.eventPoster"
        class="absolute top-0 negetive-index object-fill"
        format="webp"
        :src="`${event.eventPoster.url}`"
        width="600"
        height="600"
      />
      <NuxtLink
        v-if="!addingCard && !disableAll"
        class=""
        :to="{
          path: '/eventview',
          query: {
            event: event.id,
          },
        }"
      >
        <!-- header -->
        <section
          class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
        >
          <h2 class="chedder text-[36px] text-white leading-none">
            <span v-if="event.title">{{ event.title }} </span>
          </h2>
        </section>
      </NuxtLink>

      <!-- info box  -->
      <section
        class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]"
      >
        <NuxtLink
          v-if="!addingCard && !disableAll"
          :to="{
            path: '/eventview',
            query: {
              band: event.id,
            },
          }"
        >
          <div
            class="bg-[#BA39A4] w-[132px] h-[36px] flex flex-col justify-center items-center"
          >
            <span v-if="event.bandsPlaying">
              <span v-if="event.bandsPlaying.length > 0">
                <p
                  class="text-[12px] chedder"
                  v-for="band in event.bandsPlaying.slice(0, 2)"
                  :key="band.bandName"
                >
                  {{ band.bandName }}
                </p>
              </span>
            </span>
          </div>
        </NuxtLink>
        <div
          v-else
          class="bg-[#BA39A4] w-[132px] h-[36px] flex flex-col justify-center items-center"
        >
          <span v-if="event.bandsPlaying">
            <span v-if="event.bandsPlaying.length > 0">
              <p
                class="text-[12px] chedder text-center"
                v-for="band in event.bandsPlaying.slice(0, 2)"
                :key="band.bandName"
              >
                {{ band.bandName }}
              </p>
            </span>
          </span>
        </div>
        <div
          class="bg-[#BA39A4] w-[132px] h-[36px] flex flex-col justify-center items-center"
        >
          <span>
            <p class="text-[12px] chedder text-center">
              starts {{ moment(String(event.date)).format('MMM') }}
              {{ moment(String(event.date)).format('Do') }}
            </p>
          </span>
        </div>
      </section>

      <!-- logo and card  -->
      <section class="w-full flex justify-between px-[4px] mb-[8px]">
        <NuxtLink
          v-if="!addingCard && !addThisCard && !disableAll"
          :to="{
            path: '/eventview',
            query: {
              event: event.id,
            },
          }"
        >
          <div class="w-[141px] h-[186px]">
            <nuxt-img
              v-if="event.eventPoster"
              class="h-full object-cover"
              format="webp"
              :src="`${event.eventPoster.url}`"
              alt=""
              width="141"
              height="186"
            />
          </div>
        </NuxtLink>
        <div v-else class="w-[141px] h-[186px]">
          <nuxt-img
            v-if="event.eventPoster"
            format="webp"
            class="h-full object-cover"
            :src="`${event.eventPoster.url}`"
            alt=""
            width="141"
            height="186"
          />
        </div>
        <!-- first featured Card  -->
        <div class="w-[141px] h-[186px] bg-[#27ed5f25] cursor-pointer">
          <span v-if="event.hasFeaturedCard && !addingCard && !disableAll">
            <NuxtLink
              v-if="!disableAll"
              :to="{
                path: '/tourview',
                query: { event: event.cardData.id },
              }"
            >
              <!-- <BasicFeaturedCard
              :cardData="band.cardData"
              v-if="event.cardType === 'band'"
            /> -->
            </NuxtLink>
          </span>

          <div
            v-if="!event.hasFeaturedCard && !addingCard"
            class="flex justify-center items-center h-full w-full border-2"
          >
            <!--   v-if="band.users_permissions_user.id === $strapi.user.id" -->
            <NuxtLink
              v-if="$strapi.user && !addThisCard && !disableAll"
              class="h-full w-full flex justify-center items-center"
              :to="{
                path: '/addCardPage',
                query: {
                  event: event.id,
                },
              }"
            >
              <div>
                <p class="chedder text-center">
                  <span v-if="addThisCard" class="block">Add this</span>Featured
                  Card
                </p>
              </div>
            </NuxtLink>
            <div v-else class="h-full w-full flex justify-center items-center">
              <p class="chedder text-center">
                <span v-if="addThisCard" class="block">Add this</span>Featured
                Card
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- announcment box  -->
      <section
        v-if="!announcement"
        class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
      >
        <h2 class="text-[18px]">Announcement</h2>
        <p class="text-[12px]">This is the body of the text ...</p>
      </section>
      <section
        v-if="announcement"
        class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px]"
      >
        <h2 class="text-[18px]">{{ announcement.title }}</h2>
        <p class="text-[12px]">{{ announcement.text }}</p>
      </section>

      <!-- buttons  -->
      <section class="flex justify-around mt-[8px]">
        <div
          class="w-[66px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
        >
          <span class="flex items-center justify-between w-full px-2"
            ><img
              class="h-[12px] w-[12px]"
              src="/share.svg"
              alt=""
            />Share</span
          >
        </div>
        <div
          class="w-[66px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
        >
          <span class="flex items-center justify-between w-full px-2"
            ><img
              class="h-[12px] w-[12px]"
              src="/heart.svg"
              alt=""
            />Favorite</span
          >
        </div>
        <div
          class="w-[66px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
        >
          <span
            v-if="!disableAll"
            class="flex items-center justify-between w-full px-2 cursor-pointer"
            @click="goToAddCard(event)"
            ><img
              class="h-[12px] w-[12px]"
              src="/add.svg"
              alt=""
            />Feature</span
          >
          <span
            v-else
            class="flex items-center justify-between w-full px-2 cursor-pointer"
            ><img
              class="h-[12px] w-[12px]"
              src="/add.svg"
              alt=""
            />Feature</span
          >
        </div>

        <div
          class="w-[70px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
        >
          <span class="flex items-center justify-between w-full px-2"
            ><img class="h-[12px] w-[12px]" src="/qr1.svg" alt="" />QR
            Code</span
          >
        </div>
      </section>
      <section
        v-if="addingCard"
        class="flex justify-center items-center relative top-[10px]"
      >
        <div
          class="w-11/12 bg-black text-white flex justify-center items-center text-[14px] chedder mt-[4px] py-4 mb-6 cursor-pointer"
          @click="$emit('selectUsersCard', event.id)"
        >
          <span v-if="usersCard">Add to this Card !!!</span>
          <span v-else>Add this Card !!!</span>
        </div>
      </section>
      <Modal class="z-50" v-if="showModal" @close="showModal = false" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

// import Button from './Button.vue'
export default {
  // components: { Button },
  props: {
    event: {
      type: Object,
      default() {
        return {}
      },
    },
    addingCard: {
      type: Boolean,
      default() {
        return false
      },
    },
    user: {
      type: Object,
      default() {
        return {}
      },
    },
    userBandToAddToo: {
      type: String || Number,
      default() {
        return ''
      },
    },
    isHome: {
      type: Boolean,
      default() {
        return false
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
    disableAll: {
      type: Boolean,
      default() {
        return false
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
  },

  data() {
    return {
      errorMessage: '',
      userFavs: [],
      updated: null,
      index: 0,
      chatComp: false,
      addFeatured: false,
      showModal: false,
    }
  },
  computed: {
    announcement() {
      return [
        { title: 'Annocements', text: 'This is the body of the text ...' },
      ]
    },
    announcements() {
      return [
        { title: 'Annocements', text: 'This is the body of the text ...' },
      ]
    },
  },

  methods: {
    moment,
    goToAddCard(event) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        if (event.users_permissions_user.id === this.$strapi.user.id) {
          this.$router.push({
            path: 'addcardpage',
            query: { event: event.id, usersCard: true },
          })
        } else {
          this.$router.push({
            path: 'addcardpage',
            query: { event: event.id, usersCard: false },
          })
        }
      } else {
        return (this.showModal = true)
      }
    },
    addCardToData(userBandToAddToo, event) {
      // Check if user is logged in
      if (this.$strapi.user) {
        this.showModal = false
      } else {
        return (this.showModal = true)
      }
      console.log(event.users_permissions_user.id, this.$strapi.user.id)
    },
    startChat(user) {
      console.log('user from the poster card ', user, ' the id ', user.id)
      this.$emit('startChat', user)
    },

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

.negetive-index {
  z-index: -999;
  filter: blur(4px);
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
  transform: scale(47.4%);
  margin-left: -79px;
  margin-top: -108px;
}

.scaleDownTwo {
  transform: scale(47.4%);
  margin-left: -80px;
  margin-top: -105px;
}
</style>
