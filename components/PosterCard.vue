<template>
  <div
    class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px]"
    :style="{ backgroundImage: `url(${band.bandProfileImg.url})` }"
  >
    <NuxtLink
      v-if="!addingCard"
      class=""
      :to="{
        path: '/bandprofile',
        query: {
          band: band.id,
        },
      }"
    >
      <!-- header -->
      <section
        class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
      >
        <h2 class="chedder text-[36px] text-white leading-none">
          <span v-if="band.bandName">{{ band.bandName }}</span>
        </h2>
      </section>
    </NuxtLink>
    <section
      v-else
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">
        <span v-if="band.bandName">{{ band.bandName }}</span>
      </h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex justify-between px-[8px] [bg-blue-500 mb-[8px]">
      <NuxtLink
        v-if="!addingCard"
        :to="{
          path: '/bandprofile',
          query: {
            band: band.id,
          },
        }"
      >
        <div
          class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
        >
          <p class="text-[12px] chedder">
            Punk/<span v-if="band.genre">{{ band.genre }}</span>
          </p>
          <p class="text-[12px] chedder">{{ band.dateStarted }}</p>
        </div>
      </NuxtLink>
      <div
        v-else
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <p class="text-[12px] chedder">
          Punk/<span v-if="band.genre">{{ band.genre }}</span>
        </p>
        <p class="text-[12px] chedder">{{ band.dateStarted }}</p>
      </div>
      <div
        class="bg-[#27ED5E] w-[132px] h-[36px] flex flex-col justify-center items-center"
      >
        <NuxtLink
          v-if="addingCard"
          :to="{
            path: '/bandprofile',
            query: {
              band: band.id,
            },
          }"
        >
          <p class="text-[12px] chedder">{{ band.city }}, {{ band.state }}</p>
        </NuxtLink>
        <p v-else class="text-[12px] chedder">
          {{ band.city }}, {{ band.state }}
        </p>
        <span v-if="$strapi.user && !addingCard">
          <!-- add this  v-if="band.users_permissions_user.id !== $strapi.user.id" -->
          <p
            class="text-[12px] chedder text-blue-500 underline"
            @click="startChat(user)"
          >
            Internal Message
          </p>
        </span>
        <span v-else>
          <p class="text-[12px] chedder text-blue-500 underline">
            Internal Message
          </p>
        </span>
      </div>
    </section>

    <!-- logo and card  -->
    <section class="w-full flex justify-between px-[4px] mb-[8px]">
      <NuxtLink
        v-if="!addingCard"
        :to="{
          path: '/bandprofile',
          query: {
            band: band.id,
          },
        }"
      >
        <div class="w-[141px] h-[186px] shadow-xl">
          <img
            class="h-full object-cover"
            :src="`${band.bandProfileImg.url}`"
            alt=""
          />
        </div>
      </NuxtLink>
      <div v-else class="w-[141px] h-[186px] shadow-xl">
        <img
          class="h-full object-cover"
          :src="`${band.bandProfileImg.url}`"
          alt=""
        />
      </div>
      <!-- first featured Card  -->
      <div class="w-[141px] h-[186px] bg-[#27ED5E] shadow-xl cursor-pointer">
        <span v-if="band.hasFeaturedCard && !addingCard">
          <BasicFeaturedCard
            :cardData="band.cardData"
            v-if="band.cardType === 'band'"
          />
        </span>

        <div
          v-if="!band.hasFeaturedCard && $strapi.user && !addingCard"
          class="flex justify-center items-center h-full w-full"
        >
          <NuxtLink
            v-if="band.users_permissions_user.id === $strapi.user.id"
            class="h-full w-full flex justify-center items-center"
            :to="{
              path: '/addCardPage',
              query: {
                band: band.id,
              },
            }"
          >
            <p class="chedder text-center">+ Add Featured Card</p>
          </NuxtLink>
          <p
            v-else
            class="chedder text-center cursor-pointer"
            @click="addCardToData"
          >
            Featured Card Go Here
          </p>
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
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
          ><img class="h-[12px] w-[12px]" src="/share.svg" alt="" />Share</span
        >
      </div>
      <div
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
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
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
      </div>

      <div
        class="w-[70px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
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
        @click="addCardToData"
      >
        Add This Card !!!
      </div>
    </section>
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
      chatComp: false,
      addFeatured: false,
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
  mounted() {
    console.log(this.band)
  },
  methods: {
    async addCardToData() {
      try {
        const updated = await this.$strapi.update(
          'bands',
          this.$route.query.band,
          {
            hasFeaturedCard: true,
            cardType: 'band',
            cardData: JSON.stringify(this.band),
          }
        )
        console.log('this profile has been updated', updated)
        if (updated) {
          const stringId = this.band.id.split('').indexOf('-')
          const bandIdToPage = stringId + 1
          this.$router.push({
            path: '/bandprofile',
            query: { band: this.band.id.substring(bandIdToPage) },
          })
        }
      } catch (error) {
        console.log(error, 'three was an error when trying to make the update')
      }
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
