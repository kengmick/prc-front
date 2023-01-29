<template>
  <!--  :style="{ backgroundImage: `url(/punk-background.png)` }"  -->
  <div
    v-if="distro"
    class="relative w-[300px] h-[400px] border-box border-[#F5A01F] border-[2px] text-black"
  >
    <span v-if="distro.distroImage">
      <nuxt-img
        class="absolute top-0 negetive-index object-fill"
        format="webp"
        preload
        :src="distro.distroImage.url"
        width="300"
        height="400"
      />
    </span>
    <!-- header -->
    <section
      class="h-[38px] bg-black flex items-center justify-center mb-[8px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none">
        {{ distro.name }}
      </h2>
    </section>
    <!-- info box  -->
    <section class="w-full flex">
      <section class="w-[202px] h-[230px] flex flex-col">
        <!-- info box -->
        <div
          class="w-[160px] h-[102px] bg-[#22E8FF] ml-[4px] flex flex-col items-center justify-center shadow-2xl"
        >
          <!-- maybe show interal chat featured if the user is not logged in and then prompt user to log in on click distro -->
          <p v-if="distro.city && distro.state" class="text-[16px] chedder">
            {{ distro.city }}, {{ distro.state }}
          </p>
          <p class="text-[16px] chedder text-center" v-if="distro.dateOpened">
            {{ moment(String(distro.dateOpened)).format('MMM Do YYYY') }}
          </p>

          <span>
            <span>
              <p class="text-[12px] chedder underline" @click="startChat(user)">
                Internal Message {{ user }}
              </p>
            </span>
          </span>
        </div>
        <div class="w-[202px] h-[120px] mt-[8px] flex justify-around">
          <!-- logo -->
          <div v-if="distro.distroImage" class="w-[90px] h-[120px] shadow-2xl">
            <nuxt-img
              class="h-full object-cover"
              :src="distro.distroImage.url"
              alt=""
              width="90"
              height="120"
            />
          </div>
          <!-- first featured card  -->
          <div
            v-if="distro.hasFeaturedCard"
            class="w-[90px] h-[120px] bg-[#22E8FF] shadow-2xl"
          >
            <NuxtLink
              :to="{
                path: '/distros/distroview',
                query: { distro: distro.cardData.id },
              }"
            >
              <div v-if="distro.cardType === 'band'">
                <BasicFeaturedCard
                  :cardData="distro.cardData"
                  :fullCard="true"
                />
              </div>
              <div v-if="distro.cardType === 'distro'">
                <CardsDistroFeatured
                  :distro="distro.cardData"
                  :fullCard="true"
                />
              </div>
              <div v-if="distro.cardType === 'event'">
                <CardsShowFeatured :event="distro.cardData" :fullCard="true" />
              </div>
              <div v-if="distro.cardType === 'venue'">
                <CardsVenueFeatured :venue="distro.cardData" :fullCard="true" />
              </div>
              <div v-if="distro.cardType === 'tour'">
                <CardsTourFeatured :tour="distro.cardData" :fullCard="true" />
              </div>
              <div v-if="distro.cardType === 'article'">
                <CardsClassifiedFeatured
                  :article="distro.cardData"
                  :fullCard="true"
                />
              </div>
            </NuxtLink>
          </div>
          <div
            v-else
            class="h-[120px] w-[90px] bg-gray-500 flex flex-col justify-center items-center"
            @click="addFeaturedToBandCard(distro)"
          >
            <p class="chedder text-lg text-center">+ Add</p>
            <p class="chedder text-lg text-center">Featured Card</p>
          </div>
        </div>
      </section>
      <section
        class="w-[94px] h-[230px] bg-[#22E8FF] mr-[4px] flex flex-col justify-between items-center pt-[3px] shadow-2xl"
      >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#showdetails',
            query: { distro: distro.id },
          }"
          >Show Details</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#videos',
            query: { distro: distro.id },
          }"
          >Videos</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#bio',
            query: { distro: distro.id },
          }"
          >bio</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#pictures',
            query: { distro: distro.id },
          }"
          >Pictures</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#members',
            query: { distro: distro.id },
          }"
          >Members</NuxtLink
        >
        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#merch',
            query: { distro: distro.id },
          }"
          >Merch</NuxtLink
        >

        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#links',
            query: { distro: distro.id },
          }"
          >Links</NuxtLink
        >

        <NuxtLink
          class="chedder text-[15px] underline"
          :to="{
            path: '/distros/distroview',
            hash: '#chatroom',
            query: { distro: distro.id },
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
        class="w-[66px] h-[24px] bg-[#22E8FF] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
          ><img class="h-[12px] w-[12px]" src="/share.svg" alt="" />Share</span
        >
      </div>
      <div
        class="w-[66px] h-[24px] bg-[#22E8FF] flex justify-center items-center text-[10px] chedder"
      >
        <span
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          @click="favorite('record-labels', distro)"
        >
          <img
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
        class="w-[66px] h-[24px] bg-[#22E8FF] flex justify-center items-center text-[10px] chedder"
      >
        <span
          v-if="!disableAll"
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          @click="goToAddCard(distro)"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
        <span
          v-else
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
      </div>

      <div
        class="w-[70px] h-[24px] bg-[#22E8FF] flex justify-center items-center text-[10px] chedder"
      >
        <span
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          @click="genCode"
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
        @click="$emit('selectUsersCard', distro.id)"
      >
        <span v-if="usersCard">Add to this Card !!!</span>
        <span v-else>Add this Card !!!</span>
      </div>
    </section>
    <Modal class="z-50" v-if="showModal" @close="showModal = false" />
    <section v-if="chat">
      <Chat
        :chatInfo="chat"
        :chatWithId="chat.chatWith.id"
        class="z-[9999999]"
        @closeChat="renderChatComp"
      />
    </section>
  </div>
</template>

<script>
// import Button from './Button.vue'
import moment from 'moment'
export default {
  // components: { Button },
  props: {
    distro: {
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
      favs: null,
      chat: null,
      finalChat: null,
      hasChat: false,
    }
  },
  computed: {
    announcement() {
      // return this.distro.announcements[this.index] || []
      return [{ title: 'hello', text: 'hello ' }]
    },
    // announcements() {
    //   //   return this.distro.announcements || []
    //   return [{ title: 'hello', text: 'hello ' }]
    // },
  },
  async mounted() {
    if (this.$strapi.user) {
      const f = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      if (f) {
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
    }
  },
  methods: {
    moment,

    async genCode() {
      const id = await this.distro.id
      const temp = `distros/distroview/?distro=${id}`
      console.log(temp)
      this.$router.push({
        path: '/qr',
        query: { type: temp, color: 'distro' },
      })
    },
    async favorite(type, data) {
      console.log('fav function')
      if (this.$strapi.user) {
        try {
          const curFavs = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          console.log(curFavs, 'the current favs ')

          if (curFavs.length > 0) {
            const isSame = curFavs.filter((f) => {
              return f.data.id === data.id && f.type === type
            })
            if (isSame.length === 0) {
              console.log(isSame, ' this is same')
              const fav = await this.$strapi.create('favs', {
                users_permissions_user: this.$strapi.user.id,
                data: data,
                type: type,
              })
              const upFav = await this.$strapi.find('favs', {
                users_permissions_user: this.$strapi.user.id,
              })
              console.log('emit created hreer', fav, upFav)
              this.$router.push('/profile')
            }
            this.$router.push('/profile')
          } else if (curFavs.length === 0) {
            const fav = await this.$strapi.create('favs', {
              users_permissions_user: this.$strapi.user.id,
              data: data,
              type: type,
            })
            console.log('emit createdfdsfdsfs')
            console.log(curFavs, 'this is the fav', fav)
            this.$router.push('/profile')
          } else {
            await this.$strapi.find('favs', {
              users_permissions_user: this.$strapi.user.id,
            })
          }
          const f = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          this.$emit('createdFavs', f)
          console.log(
            'emited create createdFavscreatedFavscreatedFavscreatedFavs',
            f
          )
        } catch (error) {
          console.log('there was an error in the create favs function', error)
        }
      }
      this.message = 'You must be logged in '
    },
    favCheck(type, id) {
      if (this.favs) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ', f)
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      }
    },
    startChat(user) {
      console.log('interanl messages ')
      if (this.$strapi.user) {
        this.$emit('startChat', user)
      } else {
        return (this.showModal = true)
      }
    },
    addFeaturedToBandCard() {
      // this will emit an distro to add a card to the card that was clicked on .... the user owned card
      this.$emit('addFeaturedToBandCard', this.distro)
    },
    goToAddCard(distro) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        if (distro.users_permissions_user.id === this.$strapi.user.id) {
          this.$router.push({
            path: 'addcardpage',
            query: { distro: distro.id, usersCard: true },
          })
        } else {
          this.$router.push({
            path: 'addcardpage',
            query: { distro: distro.id, usersCard: false },
          })
        }
      } else {
        return (this.showModal = true)
      }
    },
    addCardToData(userBandToAddToo, distro) {
      // Check if user is logged in
      if (this.$strapi.user) {
        this.showModal = false
      } else {
        return (this.showModal = true)
      }
      console.log(distro.users_permissions_user.id, this.$strapi.user.id)
    },

    logit() {
      console.log('hey this is a double click')
    },
    async fav(bandId) {
      const stringId = bandId.toString()

      if (!this.$strapi.user) {
        alert('you must be logged in to favorite')
        console.log('the user is not logged in ')
        return this.$emit('popup', 'this distro logged ....')
      } else {
        // get all user favorite stuff ... if they have any ... add a new favorite to it ... then resave all favoites to the user favs then route to favorite page the userFavs is an array so you can iterate over it using an array method wich is really an object at the end of the day or it wouldn't be about to have a method attached to it. Thank you for coming ... please come again soon.
        const user = await this.$strapi.user
        this.userFavs = await user.favs
        const json = { favObject: { type: 'distro', id: stringId } }
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
