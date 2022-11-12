<template>
  <div>
    <div v-if="!loading" class="video-container">
      <iframe
        id="yt-video-iframe"
        class="video"
        :src="`https://www.youtube.com/embed/${this.video}?modestbranding=1`"
        title="Punk Rock Compound July 31st"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen
      ></iframe>
    </div>
    <section v-if="bands.length > 0">
      <!-- container for poster cards -->
      <div
        class="flex mt-6 flex-col justify-center items-center md:flex-row md:flex-wrap md:gap-6"
      >
        <PosterCard
          class="mb-10"
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
          :user="band.users_permissions_user"
          :isFeatured="true"
          :isHome="true"
          @startChat="startChatNow(band.users_permissions_user)"
        />
      </div>
      <!-- <SliderContainer v-if="bands !== []">
        <PosterCard
          v-for="(band, index) in bands"
          :key="band.bandName + index"
          :band="band"
          :isFeatured="true"
        />
      </SliderContainer> -->
    </section>

    <!-- <section class="my-10">
      <h2 class="chedder text-center text-5xl">Featured Event</h2>
      <FeaturedEvent v-if="event" :event="event" />
    </section> -->
    <!-- <section class="my-10 container mx-auto">
      <div class="w-11/12 sm:w-1/2 mx-auto" @click="route">
        <Button text="View All Bands" />
      </div>
      <a href="mailto:punkrockcompound@gmail.com">Send mail</a>
    </section> -->
    <!-- <section class="my-10">
      <Cta />
    </section> -->
    <!-- <section class="my-10">
      <Gallery />
    </section> -->
    <!-- <section>
      <NewsLetterCta />
    </section> -->
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
export default {
  data() {
    return {
      bands: [],
      event: null,
      video: '',
      liveStream: null,
      liveUrl: '',
      loading: true,
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
    }
  },
  async fetch() {
    try {
      const link = await this.$strapi.find('live-stream')
      console.log(link.streamLink, 'from the db')
      this.liveUrl = link.streamLink
      this.video = link.streamLink || 'zLZ2IT4ly9A'
      this.loading = false
    } catch (error) {
      this.video = 'zLZ2IT4ly9A'
      this.loading = false
      console.log(error)
    }
    try {
      const allBands = await this.$strapi.find('bands')
      this.bands = allBands.slice(0, 3)
      this.event = await this.$strapi.find('featured-event')
    } catch (error) {
      console.log(error, 'this is all bands ')
    }
    //   try {
    //     this.liveStream = await this.$http.$get(
    //       `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${this.liveUrl}&key=${process.env.YOUTUBE_KEY}`
    //     )
    //     if (this.liveStream.items) {
    //       if (this.liveStream.items[0].snippet.liveBroadcastContent !== 'none') {
    //         console.log(this.liveStream.items, 'youtube api call')
    //         this.loading = false
    //         this.video = this.liveStream.items[0].id
    //       } else {
    //         this.video = 'LymYPAMnbMI'
    //         this.loading = false
    //         console.log(this.video, ' final video ')
    //       }
    //     }
    //   } catch (error) {
    //     this.loading = false
    //   }
  },
  // async mounted() {
  //   try {
  //     const allBands = await this.$strapi.find('bands')
  //     this.bands = allBands.slice(0, 3)
  //     this.event = await this.$strapi.find('featured-event')
  //   } catch (error) {
  //     return error
  //   }
  // },
  methods: {
    async renderChatComp(chat) {
      this.chatComp = false
      if (this.chatComp === false) {
        this.chat = await chat
        this.chatComp = true
      } else {
        this.chatComp = false
      }
    },
    log() {
      console.log('this is the event emited ')
    },
    async startChatNow(val) {
      console.log('this is the start chat ')
      try {
        const hasChat = await this.$strapi.find('chats', {
          users_permissions_users: this.$strapi.user.id,
        })

        hasChat.forEach((c) => {
          const has = c.users_permissions_users.filter((user) => {
            console.log('this is the band user ', val.id, user.id)
            return val.id === user.id
          })
          if (has.length > 0) {
            console.log('this has chat ', c)
            this.hasChat = c
          }
        })
        if (this.hasChat) {
          console.log('we already have a chat ')
          const c = []
          // push the chat to the array so we can map over it
          c.push(this.hasChat)
          // map over the one item array to massage the data with the chatWith user
          const mappedChats = c.map((c) => {
            c.users_permissions_users.forEach((u) => {
              if (u.id !== this.$strapi.user.id) {
                this.chatWith = u
              }
            })
            return { ...c, chatWith: this.chatWith }
          })
          // render the chat comp with the chat that we already have read y

          this.renderChatComp(mappedChats[0])
        } else {
          // if we don't already have a chat started ... then create one
          // try and create a chat
          const chat = await this.$strapi.create('chats', {
            users_permissions_users: [this.$strapi.user.id, val.id],
          })
          // after creating a chat we now get all chats and filter with the user's ids to map overthem
          const chats = await this.$strapi.find('chats', {
            users_permissions_users: this.$strapi.user.id,
          })

          // map over to create our data type to pass into the chat component
          const mappedChats = chats.map((c) => {
            c.users_permissions_users.forEach((u) => {
              if (u.id !== this.$strapi.user.id) {
                this.chatWith = u
              }
            })
            return { ...c, chatWith: this.chatWith }
          })
          this.chats = mappedChats
          // we get just the one chat that the user just attempted to create
          const myChat = mappedChats.filter((c) => {
            return c.id === chat.id
          })
          console.log(
            myChat,
            'this is where you need to render a chat component'
          )
          this.renderChatComp(myChat[0])
        }
      } catch (error) {
        console.log('does not have a chat with this band error  ')
      }
    },
    route() {
      console.log('route method')
      this.$router.push('/bands')
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 375px) {
  .video-container {
    position: relative;
    padding-bottom: 30vh;
    padding-top: 30px;
    max-height: 30vh;
    overflow: hidden;
  }
}
.ytp-impression-link {
  display: none;
}
@media only screen and (min-width: 376px) {
  .video-container {
    position: relative;
    padding-bottom: 66vh;
    padding-top: 30px;
    max-height: 66vh;
    overflow: hidden;
  }
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
