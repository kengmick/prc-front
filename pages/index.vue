<template>
  <div>
    <section class="w-full h-96 flex items-center justify-center bg-[#19332d]">
      <h1 class="text-white">PunkRock Compompund</h1>
    </section>
    <section v-if="bands.length > 0" class="overflow-x-hidden">
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
    </section>
    <section v-else>
      <div id="content">
        <div class="skeleton">
          <div class="skeleton-wrapper">
            <div class="skeleton-wrapper-inner">
              <div class="skeleton-wrapper-body">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-author"></div>
                <div class="skeleton-label"></div>
                <div class="skeleton-content-1"></div>
                <div class="skeleton-content-2"></div>
                <div class="skeleton-content-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
      const allBands = await this.$strapi.find('bands')
      this.bands = allBands.slice(0, 3)
      this.event = await this.$strapi.find('featured-event')
    } catch (error) {
      console.log(error, 'this is all bands ')
    }
  },

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
/* stylelint-disable */
body {
  margin: 0;
  padding: 15px;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
}
h1,
h2,
p {
  margin: 25px 20px;
  font-weight: 200;
  text-align: center;
}
body,
a {
  color: #00ab6c !important;
}
#content {
  max-width: 500px;
  margin: 0 auto;
}
.skeleton-wrapper {
  background: #fff;
  border: 1px solid;
  border-color: #e5e6e9 #dfe0e4 #d0d1d5;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  margin: 10px 15px;
}

.skeleton-wrapper-inner {
  height: 150px;
  padding: 15px;
  position: relative;
}

.skeleton-wrapper-body div {
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderSkeleton;
  -webkit-animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-gradient(
    linear,
    left center,
    right center,
    from(#f6f7f8),
    color-stop(0.2, #edeef1),
    color-stop(0.4, #f6f7f8),
    to(#f6f7f8)
  );
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  height: 104px;
  position: relative;
}

.skeleton-wrapper-body {
  -webkit-animation-name: skeletonAnimate;
  background-image: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(deg),
    color-stop(0, red),
    color-stop(0.15, orange),
    color-stop(0.3, yellow),
    color-stop(0.45, green),
    color-stop(0.6, blue),
    color-stop(0.75, indigo),
    color-stop(0.8, violet),
    to(red)
  );
  background-image: -webkit-linear-gradient(
    135deg,
    red 0%,
    orange 15%,
    yellow 30%,
    green 45%,
    blue 60%,
    indigo 75%,
    violet 80%,
    red 100%
  );
  background-repeat: repeat;
  background-size: 50% auto;
}

.skeleton-wrapper-body div {
  position: absolute;
  right: 15px;
  left: 15px;
  top: 15px;
}

div.skeleton-avatar {
  height: 60px;
  width: 60px;
  border-radius: 60px;
  right: auto;
}
div.skeleton-author {
  top: 20px;
  height: 20px;
  left: 95px;
  width: 150px;
}

div.skeleton-label {
  left: 95px;
  top: 50px;
  height: 10px;
  width: 100px;
}
div.skeleton-content-1,
div.skeleton-content-2,
div.skeleton-content-3 {
  left: 15px;
  right: 15px;
  height: 10px;
}
div.skeleton-content-1 {
  top: 100px;
}
div.skeleton-content-2 {
  top: 120px;
}
div.skeleton-content-3 {
  top: 140px;
}

@-webkit-keyframes placeholderSkeleton {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

@-webkit-keyframes skeletonAnimate {
  from {
    background-position: top left;
  }
  to {
    background-position: top right;
  }
}
/* stylelint-enable */
</style>
