<template>
  <!--  :style="{ backgroundImage: `url(/punk-background.png)` }"  -->
  <div
    v-if="tour"
    class="relative w-[300px] h-[400px] border-box border-[#BA39A4] border-[2px] text-white"
  >
    <span v-if="tour.touringPoster">
      <nuxt-img
        class="absolute top-0 negetive-index object-fill"
        format="webp"
        preload
        :src="tour.touringPoster.url"
        width="300"
        height="400"
      />
    </span>
    <!-- header -->
    <section
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">
        {{ tour.title }}
      </h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex">
      <section class="w-[202px] h-[230px] flex flex-col">
        <!-- info box -->
        <div
          class="w-[160px] h-[102px] bg-[#BA39A4] ml-[4px] flex flex-col items-center justify-center shadow-2xl"
        >
          <span v-if="tour.touringBands">
            <p
              v-for="band in tour.touringBands.slice(0, 2)"
              :key="band.bandName"
              class="chedder text-[16px] text-center"
            >
              {{ band.bandName }}
            </p></span
          >

          <p class="chedder text-[16px] text-center" v-if="tour.dateStart">
            {{ moment(String(tour.dateStart)).format('YY') }}
            {{ moment(String(tour.dateStart)).format('MMM') }}
            {{ moment(String(tour.dateStart)).format('Do') }} -
            {{ moment(String(tour.dateStart)).format('YY') }}
            {{ moment(String(tour.dateStart)).format('MMM') }}
            {{ moment(String(tour.dateStart)).format('Do') }}
          </p>
          <!-- maybe show interal chat featured if the user is not logged in and then prompt user to log in on click event -->
          <span v-if="tour.users_permissions_user">
            <span v-if="tour.users_permissions_user.id !== $strapi.user">
              <p
                v-if="4 !== $strapi.user.id"
                class="text-[12px] chedder underline"
                @click="startChat(user)"
              >
                Internal Message
              </p>
            </span>
          </span>
          <span v-else>
            <p class="text-[12px] chedder underline">Internal Message</p>
          </span>
        </div>
        <div class="w-[202px] h-[120px] mt-[8px] flex justify-around">
          <!-- logo -->
          <div v-if="tour.touringPoster" class="w-[90px] h-[120px] shadow-2xl">
            <nuxt-img
              class="h-full object-cover"
              :src="tour.touringPoster.url"
              alt=""
              width="90"
              height="120"
            />
          </div>
          <!-- first featured card  -->
          <div
            v-if="tour.hasFeaturedCard"
            class="w-[90px] h-[120px] bg-[#BA39A4] shadow-2xl"
          >
            <NuxtLink
              :to="{
                path: '/tours/tourview',
                query: { tour: tour.cardData.id },
              }"
            >
              <FeaturedCardFull :cardData="tour.cardData" />
            </NuxtLink>
          </div>
          <div
            v-else
            class="h-[120px] w-[90px] bg-gray-500 flex flex-col justify-center items-center"
            @click="addFeaturedToBandCard(tour)"
          >
            <p class="chedder text-lg text-center">+ Add</p>
            <p class="chedder text-lg text-center">Featured Card</p>
          </div>
        </div>
      </section>
      <section
        class="w-[94px] h-[230px] bg-[#BA39A4] mr-[4px] flex flex-col justify-between items-center pt-[3px] shadow-2xl"
      >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#showz',
            query: { tour: tour.id },
          }"
          >Showz</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#videos',
            query: { tour: tour.id },
          }"
          >Videos</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#bio',
            query: { tour: tour.id },
          }"
          >bio</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#pictures',
            query: { tour: tour.id },
          }"
          >Pictures</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#members',
            query: { tour: tour.id },
          }"
          >Members</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/merch',
            hash: '#bio',
            query: { tour: tour.id },
          }"
          >Merch</NuxtLink
        >

        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#links',
            query: { tour: tour.id },
          }"
          >Links</NuxtLink
        >

        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/tours/tourview',
            hash: '#chatroom',
            query: { tour: tour.id },
          }"
          >Chat Room</NuxtLink
        >
      </section>
    </section>

    <section
      v-if="!announcement"
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px] mt-[8px]"
    >
      <h2 class="text-[18px]">Announcement</h2>
      <p class="text-[12px]">This is the body of the text ...</p>
    </section>
    <section
      v-if="announcement"
      class="bg-white text-black w-[288px] h-[76px] mx-auto px-[4px] py-[4px] mt-[8px]"
    >
      <h2 class="text-[18px]">{{ announcement[0].title }}</h2>
      <p class="text-[12px]">{{ announcement[0].text }}</p>
    </section>
    <!-- buttons  -->
    <section class="flex justify-around mt-[8px]">
      <div
        class="w-[66px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
          ><img class="h-[12px] w-[12px]" src="/share.svg" alt="" />Share</span
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
          @click="goToAddCard(tour)"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
        <span
          v-else
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
      </div>

      <div
        class="w-[70px] h-[24px] bg-[#BA39A4] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
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
        @click="$emit('selectUsersCard', tour.id)"
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
import moment from 'moment'
export default {
  // components: { Button },
  props: {
    tour: {
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
  computed: {
    announcement() {
      // return this.tour.announcements[this.index] || []
      return [{ title: 'hello', text: 'hello ' }]
    },
    // announcements() {
    //   //   return this.tour.announcements || []
    //   return [{ title: 'hello', text: 'hello ' }]
    // },
  },

  methods: {
    moment,
    startChat(user) {
      console.log('user from the poster card ', user, ' the id ', user.id)
      this.$emit('startChat', user)
    },
    addFeaturedToBandCard() {
      // this will emit an event to add a card to the card that was clicked on .... the user owned card
      this.$emit('addFeaturedToBandCard', this.tour)
    },
    goToAddCard(tour) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        if (tour.users_permissions_user.id === this.$strapi.user.id) {
          this.$router.push({
            path: 'addcardpage',
            query: { tour: tour.id, usersCard: true },
          })
        } else {
          this.$router.push({
            path: 'addcardpage',
            query: { tour: tour.id, usersCard: false },
          })
        }
      } else {
        return (this.showModal = true)
      }
    },
    addCardToData(userBandToAddToo, tour) {
      // Check if user is logged in
      if (this.$strapi.user) {
        this.showModal = false
      } else {
        return (this.showModal = true)
      }
      console.log(tour.users_permissions_user.id, this.$strapi.user.id)
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
        const json = { favObject: { type: 'tour', id: stringId } }
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
.negetive-index {
  z-index: -999;
  filter: blur(4px);
}
</style>
