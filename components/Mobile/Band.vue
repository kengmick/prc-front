<template>
  <!--  :style="{ backgroundImage: `url(/punk-background.png)` }"  -->
  <div
    class="relative w-screen h-[100%] border-6 border-blue-600 bg-gray-900"
    :class="{ 'overflow-x-scroll': band.cardData }"
  >
    <!-- <nuxt-img
      class="custom_b"
      format="webp"
      preload
      :src="band.bandProfileImg.url"
      width="300"
      height="400"
    /> -->
    <!-- header -->

    <section
      class="h-[auto] max-w-screen bg-gray-900 flex items-center justify-center pb-[10px] pt-[36px]"
    >
      <h2 class="chedder text-[36px] text-white leading-none xl:text-[42px]">
        {{ band.bandName }}
      </h2>
    </section>

    <!-- info box  -->

    <section class="w-full">
      <section
        class="w-full bg-gray-900 flex flex-col justify-center px-[16px] items-center text-[18px] text-gray-900"
      >
        <div>
          <NuxtLink
            class="chedder underline inline-block"
            :to="{
              path: '/bands/bandProfile',
              hash: '#showz',
              query: { band: band.id },
            }"
            >Showz</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#releases',
              query: { band: band.id },
            }"
            >Releases</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#songs',
              query: { band: band.id },
            }"
            >Songs</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#videos',
              query: { band: band.id },
            }"
            >Videos</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#bio',
              query: { band: band.id },
            }"
            >Biography</NuxtLink
          >
        </div>
        <div>
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#members',
              query: { band: band.id },
            }"
            >Members</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#pictures',
              query: { band: band.id },
            }"
            >Pictures</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#merch',
              query: { band: band.id },
            }"
            >Merch</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#links',
              query: { band: band.id },
            }"
            >Links</NuxtLink
          >
          <NuxtLink
            class="chedder underline"
            :to="{
              path: '/bands/bandProfile',
              hash: '#chatroom',
              query: { band: band.id },
            }"
            >Chat Room</NuxtLink
          >
        </div>
      </section>
      <section>
        <div
          class="bg-gray-900 flex flex-col justify-center items-center pb-[10px] relative top-[-20px]"
        >
          <p
            v-if="band.genre"
            class="chedder text-[21px] text-white xl:text-[30px]"
          >
            {{ band.genre }}
          </p>
          <p
            v-if="band.genreAlt"
            class="chedder text-[21px] text-white xl:text-[30px]"
          >
            {{ band.genreAlt }}
          </p>
          <p v-else class="chedder text-[16px] text-white xl:text-[30px]">
            PUNK
          </p>
          <p class="chedder text-[21px] text-white xl:text-[30px]">
            {{ band.city }}, {{ band.state }}
          </p>
          <p class="chedder text-[21px] text-white xl:text-[30px]">
            {{ band.dateStarted }}
          </p>
        </div>
      </section>
    </section>

    <!-- <div>h-[calc(100vh-271px)]</div> -->
    <div class="relative">
      <p
        class="text-[16px] chedder underline cursor-pointer text-white text-center relative bottom-[-12px]"
        @click="startChat(user)"
      >
        Direct Message
      </p>
    </div>
    <section class="container mx-auto h-[calc(100vh-322px)]">
      <!-- @click="startChat(user)" -->

      <div class="block h-full pt-[36px] pb-[34px] bg-gray-900">
        <div
          class="flex items-center justify-center bg-gray-900 h-full relative"
        >
          <nuxt-img
            format="webp"
            class="object-cover w-11/12 grayscale h-[calc(100vh-452px)] mx-auto lg:w-3/4 xl:w-2/3"
            :src="band.bandProfileImg.url"
            alt=""
            @click="photoBox(band.bandProfileImg.url)"
          />
        </div>
      </div>
    </section>
    <!-- featured cards  -->
    <div class="w-full flex justify-center">
      <h1 class="text-white" @click="f">Test</h1>
    </div>
    <h3
      v-if="band.cardData.cards.length > 0"
      class="text-white text-2xl text-center mt-5"
    >
      <span class="bg-black text-white px-4 py-2">Featured card </span>
    </h3>

    <div
      v-if="band.cardData.cards.length > 0"
      class="flex gap-4 overflow-x-scroll ml-2 my-[36px] justify-start"
      :class="{ 'justify-center': band.cardData.cards.length <= 2 }"
    >
      <div v-if="$strapi.user" class="w-min flex gap-4">
        <SimpleCardsBand
          v-for="b in band.cardData.cards"
          class="w-[330px]"
          :key="b.bandName"
          :band="b"
          :canRemoveFeatured="
            $strapi.user.id === band.users_permissions_user.id
          "
          @removeFeatured="$emit('removeFeaturedFromSimple', b.id)"
        />
      </div>
      <div v-else class="w-min flex gap-4">
        <SimpleCardsBand
          v-for="b in band.cardData.cards"
          class="w-[330px]"
          :key="b.bandName"
          :band="b"
        />
      </div>
    </div>
    <!-- announcements -->
    <!-- 
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
    </section> -->
    <!-- scrollable content here -->
    <!-- band info  -->

    <!-- bio  -->
    <!-- <section class="container mx-auto mt-2">
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
        
        </div>
      </section>
    </section> -->

    <!-- members -->
    <!-- <section v-if="band.members" class="my-2">
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
    </section> -->

    <!-- <section class="container mx-auto"> -->
    <!-- shows  -->
    <!-- <h3 class="text-white text-2xl text-center mt-5">
        <span class="bg-black text-white px-4 py-2">Showz</span>
      </h3>
      <div
        v-if="band.events.length > 0"
        class="flex gap-4 overflow-y-scroll ml-2"
      >
        <div v-for="event in band.events" :key="event.title" class="my-6">
          <div class="w-[230px] h-auto">
            <NuxtLink
              :to="{ path: '/events/eventview', query: { event: event.id } }"
            >
              <SimpleCardsEvent :event="event" />
            </NuxtLink>
          </div>
        </div>
      </div> -->

    <!-- releases -->
    <!-- <section class="my-5 ml-2">
        <h2 id="members" class="chedder text-2xl my-6 text-center">
          <span class="bg-black text-white px-4 py-2">Disography</span>
        </h2>

        <div>
          <div v-if="band.releases" class="flex gap-4 overflow-y-scroll">
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
      </section> -->
    <!-- songs -->
    <!-- <section class="my-5 mx-2 bg-white">
        <MobileSongs :band="band" />
      </section> -->
    <!-- photos -->
    <!-- <h2 id="members" class="chedder text-2xl my-6 text-center">
        <span class="bg-black text-white px-4 py-2">Photos</span>
      </h2>
      <section v-if="band.photos" class="flex gap-4 overflow-y-scroll mb-10">
        <div v-for="(pic, index) in band.photos" :key="pic + index">
          <div class="w-[150px] h-[150px]">
            <img :src="pic.pic.url" alt="" class="h-full w-full" />
          </div>
        </div>
      </section> -->

    <!-- </section> -->

    <!-- links -->
    <!-- <div v-if="band.links">
      <h2 id="members" class="chedder text-2xl my-6 text-center">
        <span class="bg-black text-white px-4 py-2">Links</span>
      </h2>
      <ul class="px-4">
        <li v-for="link in band.links" :key="link.id" class="my-4">
          <a :href="link.link" class="text-white">
            <span class="bg-black text-white px-4 py-2">{{
              link.link
            }}</span></a
          >
        </li>
      </ul>
    </div> -->
    <!-- buttons  -->
    <section
      style="z-index: 999999999999999999999999"
      class="flex justify-between items-center fixed bottom-0 left-0 bg-black w-screen h-[46px] px-[16px] pb-[8px] lg:px-[10%]"
    >
      <!-- <svg
        class="absolute top-[10px] right-[49%]"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0803 17.9131L5.4397 11.2725C4.98071 10.8135 4.98071 10.0713 5.4397 9.61719L6.54321 8.51367C7.0022 8.05469 7.74438 8.05469 8.19849 8.51367L12.9055 13.2207L17.6125 8.51367C18.0715 8.05469 18.8137 8.05469 19.2678 8.51367L20.3713 9.61719C20.8303 10.0762 20.8303 10.8184 20.3713 11.2725L13.7307 17.9131C13.2815 18.3721 12.5393 18.3721 12.0803 17.9131V17.9131Z"
          fill="red"
        />
      </svg> -->
      <div class="w-[66px] h-[24px] bg-black chedder text-white">
        <span class="text-[15px] lg:text-[21px]" @click="share">
          <!-- <img class="h-[12px] w-[12px]" src="/share.svg" alt="" /> -->
          Share</span
        >
      </div>
      <div class="w-[66px] h-[24px] bg-black chedder">
        <span
          class="w-full cursor-pointer text-white text-center text-[15px] lg:text-[21px] flex justify-center items-center"
          @click="favorite('bands', band)"
        >
          <img
            v-if="isFav"
            class="h-[12px] w-[12px] mr-2"
            src="/heart.svg"
            alt=""
          /><img
            v-if="!isFav"
            class="h-[12px] w-[12px] mr-2"
            src="/notheart.svg"
            alt=""
          />
          Favorite
        </span>
      </div>
      <div
        class="w-[66px] h-[24px] bg-black text-[15px] text-center chedder lg:text-[21px]"
      >
        <span
          v-if="!disableAll"
          class="w-full px-2 cursor-pointer text-white text-center"
          @click="goToAddCard(band, 'band', 'MobileBand')"
        >
          <!-- <img class="h-[12px] w-[12px]" src="/add.svg" alt="" /> -->
          Feature</span
        >
        <span
          v-else
          class="w-full px-2 cursor-pointer text-center lg:text-[21px]"
          @click="goToAddCard(band, 'band', 'MobileBand')"
        >
          <!-- <img class="h-[12px] w-[12px]" src="/add.svg" alt="" /> -->
          Feature</span
        >
      </div>

      <div class="w-auto h-[24px] bg-black text-[14px] chedder lg:text-[21px]">
        <span
          class="w-full px-2 cursor-pointer text-white text-[15px] lg:text-[21px]"
          @click="
            $router.push({
              path: '/qr',
              query: {
                route: `https://punkrockcompound.com/bands/bandProfile?band=${band.id}`,
              },
            })
          "
        >
          <!-- <img class="h-[12px] w-[12px]" src="/qr1.svg" alt="" /> -->
          QR Code</span
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
    <PhotoBox v-if="photoBox" :pic="pic" @closePhoto="closePhoto" />
    <div
      class="border-[2px] border-gray-900 fixed top-0 left-0 h-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-[4px] left-[4px] h-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-0 left-[8px] h-screen z-50"
    ></div>

    <div
      class="border-[2px] border-gray-900 fixed top-0 right-0 h-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-[4px] right-[4px] h-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-0 right-[8px] h-screen z-50"
    ></div>

    <div
      class="border-[2px] border-gray-900 fixed top-0 left-0 w-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-[4px] left-[8px] right-[8px] z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed top-[8px] left-[8px] right-[8px] z-50"
    ></div>

    <div
      class="border-[2px] border-gray-900 fixed bottom-0 left-0 w-screen z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed bottom-[4px] left-[8px] right-[8px] z-50"
    ></div>
    <div
      class="border-[2px] border-gray-900 fixed bottom-[8px] left-[8px] right-[8px] z-50"
    ></div>
    <section v-if="chat">
      <Chat
        :chatInfo="chat"
        :chatWithId="chat.chatWith.id"
        class="z-[9999999999999999999999999999]"
        @closeChat="renderChatComp"
      />
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
      showModal: false,
      pic: null,
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'overflow-hidden',
      },
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Check out ${this.band.bandName} at punkrockcompound.com`,
        },
        { hid: 'og:title', property: 'og:title', content: this.band.bandName },
        {
          hid: 'og:image',
          name: 'og:image',
          content:
            'https://punkrockcompund.s3.amazonaws.com/david_rangel_D_Qw9cbx9qcs_unsplash_9ec4cca449.jpg',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `http://punkrockcompound.com/bands/bandProfile?band=${this.band.bandId}`,
        },
      ],
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
    /* eslint-disable */
    share() {
      this.$emit('share', {
        bandName: this.band.bandName,
        bandId: this.band.id,
        bandProfileImg: this.band.bandProfileImg.url,
      })
    },
    f() {
      console.log('open share ')
      FB.ui(
        {
          method: 'share',
          href: `https://punkrockcompound.com/bands/bandProfile?band=${this.band.id}`,
        },
        function (response) {
          console.log(response)
        }
      )
    },

    photoBox(pic) {
      this.pic = pic
    },
    closePhoto() {
      this.pic = ''
    },
    async genCode() {
      const id = await this.band.id
      const temp = `bands/bandProfile/?band=${id}`
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
      this.$emit('startChat', user)
    },
    addFeaturedToBandCard() {
      // this will emit an event to add a card to the card that was clicked on .... the user owned card
      this.$emit('addFeaturedToBandCard', this.band)
    },
    goToAddCard(data, type, cardDataName) {
      if (this.$strapi.user) {
        this.showModal = false
        // go to add card page
        this.$router.push({
          path: '/addcardpage',
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
.border_custom {
  box-shadow: 0 -5px 0 red, 0 -10px 0 blue, 0 -15px 0 yellow;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>
