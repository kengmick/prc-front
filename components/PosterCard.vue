<template>
  <!-- :style="{ backgroundImage: `url(${band.bandProfileImg.url})` }" for background style tag replace regex replace(/\D/g, '')  -->
  <div
    v-if="band && band.bandProfileImg"
    class="w-[300px] h-[400px] border-box border-[#27ED5E] border-[2px] relative overscroll-none"
  >
    <nuxt-img
      class="absolute top-0 negetive-index object-fill"
      format="webp"
      :src="`${band.bandProfileImg.url}`"
      width="600"
      height="600"
    />
    <NuxtLink
      v-if="!addingCard && !disableAll"
      class=""
      :to="{
        path: '/bands/bandprofile',
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
          <span v-if="band.bandName">{{ band.bandName }} </span>
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
        v-if="!addingCard && !disableAll"
        :to="{
          path: '/bands/bandprofile',
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
          v-if="addingCard && !disableAll"
          :to="{
            path: '/bands/bandprofile',
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
      </div>
    </section>

    <!-- logo and card  -->
    <section class="w-full flex justify-between px-[4px] mb-[8px]">
      <NuxtLink
        v-if="!addingCard && !addThisCard && !disableAll"
        :to="{
          path: '/bands/bandprofile',
          query: {
            band: band.id,
          },
        }"
      >
        <div class="w-[141px] h-[186px]">
          <nuxt-img
            class="h-full object-cover"
            format="webp"
            :src="`${band.bandProfileImg.url}`"
            alt=""
            width="141"
            height="186"
          />
        </div>
      </NuxtLink>
      <div v-else class="w-[141px] h-[186px]">
        <nuxt-img
          format="webp"
          class="h-full object-cover"
          :src="`${band.bandProfileImg.url}`"
          alt=""
          width="141"
          height="186"
        />
      </div>
      <!-- first featured Card  -->
      <div class="w-[141px] h-[186px] bg-[#27ed5f25] cursor-pointer">
        <span v-if="band.hasFeaturedCard && !addingCard && !disableAll">
          <NuxtLink
            v-if="!disableAll"
            :to="{
              path: '/bands/bandprofile',
              query: { band: band.cardData.id },
            }"
          >
            <div v-if="band.cardType === 'band'">
              <BasicFeaturedCard :cardData="band.cardData" />
            </div>
            <div v-if="band.cardType === 'distro'">
              <CardsDistroFeatured :distro="band.cardData" />
            </div>
            <div v-if="band.cardType === 'event'">
              <CardsShowFeatured :event="band.cardData" />
            </div>
            <div v-if="band.cardType === 'venue'">
              <CardsVenueFeatured :venue="band.cardData" />
            </div>
            <div v-if="band.cardType === 'tour'">
              <CardsTourFeatured :tour="band.cardData" />
            </div>
            <div v-if="band.cardType === 'article'">
              <CardsClassifiedFeatured :article="band.cardData" />
            </div>
          </NuxtLink>
        </span>

        <div
          v-if="!band.hasFeaturedCard && !addingCard"
          class="flex justify-center items-center h-full w-full border-2"
        >
          <!--   v-if="band.users_permissions_user.id === $strapi.user.id" -->
          <NuxtLink
            v-if="$strapi.user && !addThisCard && !disableAll"
            class="h-full w-full flex justify-center items-center"
            :to="{
              path: '/addCardPage',
              query: {
                data: band.id,
                type: 'bands',
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
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span class="flex items-center justify-between w-full px-2"
          ><img class="h-[12px] w-[12px]" src="/share.svg" alt="" />Share</span
        >
      </div>
      <div
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span
          @click="favorite('bands', band)"
          class="flex items-center justify-between w-full px-2 cursor-pointer"
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
        class="w-[66px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span
          v-if="!disableAll"
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          @click="goToAddCard(band, 'band', 'PosterCard')"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
        <span
          v-else
          class="flex items-center justify-between w-full px-2 cursor-pointer"
          ><img class="h-[12px] w-[12px]" src="/add.svg" alt="" />Feature</span
        >
      </div>

      <div
        class="w-[70px] h-[24px] bg-[#27ED5E] flex justify-center items-center text-[10px] chedder"
      >
        <span
          class="flex items-center justify-between w-full px-2 cursor-pointer"
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
        @click="$emit('selectUsersCard', band, 'bands')"
      >
        <span v-if="usersCard">Add to this Card </span>
        <span v-else>Add this Card </span>
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
        return null
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
    unFollow: {
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
      addFeatured: false,
      showModal: false,
      message: null,
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
    share() {
      if (!this.$strapi.user) {
        this.showModal = false
      }
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
    goToAddCard(data, type, cardDataName) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        this.$router.push({
          path: 'addcardpage',
          query: {
            data: data.id,
            type,
            usersCard: true,
            cardDataName,
          },
        })
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
    },
    startChat(user) {
      console.log('interanl messages ')
      if (this.$strapi.user) {
        this.$emit('startChat', user)
      } else {
        return (this.showModal = true)
      }
    },

    logit() {
      console.log('hey this is a double click')
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
.negetive-index {
  z-index: -999;
  filter: blur(4px);
}
</style>
