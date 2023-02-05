<template>
  <div>
    <div>
      <section
        class="w-full h-96 flex items-center justify-center bg-[#19332d]"
      >
        <h1 class="text-white">PunkRock Compound</h1>
      </section>
      <section v-if="bands" class="overflow-x-hidden">
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
            @updatedFavs="updatedFavs('bands', band.id)"
            :isFav="favCheck('bands', band.id)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      bands: null,
      event: null,
      video: '',
      liveStream: null,
      liveUrl: '',
      loading: true,
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      chatSelf: false,
      qrCode: null,
      favs: null,
      isSearchOpen: true,
    }
  },
  async fetch() {
    try {
      const allBands = await this.$strapi.find('bands')
      this.bands = allBands.slice(0, 3)
    } catch (error) {
      console.log(error, 'this is all bands ')
    }
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
    // this.qrCode = new QRCodeStyling({
    //   width: 300,
    //   height: 300,
    //   type: 'svg',
    //   data: 'https://www.google.com/',
    //   dotsOptions: {
    //     color: '#c10609',
    //     type: 'squared',
    //   },
    // })
    // this.qrCode.append(this.$refs.qrCode)
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
    async updatedFavs(type, id) {
      console.log(
        'this is the updated favs event emited from the parent component'
      )
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

        if (this.favs !== null) {
          const check = this.favs.filter((f) => {
            console.log('fav checkc ')
            return f.data.id === id
          })
          if (check.length > 0) {
            return true
          }
          console.log(check, ' this is check ')
        }
      }
    },
    favCheck(type, id) {
      console.log('emited from the child component')
      if (this.favs !== null) {
        const check = this.favs.filter((f) => {
          console.log('fav checkc ')
          return f.data.id === id
        })
        if (check.length > 0) {
          return true
        }
        console.log(check, ' this is check ')
      }
    },
    async startChatNow(val) {
      try {
        // find all chat that you have
        const [hasChat] = await this.$strapi.find('chats', {
          users_permissions_user: val.id,
        })
        console.log(hasChat)
        // return { ...c, chatWith: this.chatWith }

        // render the chat comp with the chat that we already have read y

        if (hasChat) {
          console.log('the start of has chat ')
          if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length > 1
          ) {
            console.log('the start of has chat 1 ')
            const [chatWith] = hasChat.users_permissions_users.filter((u) => {
              return u.id !== this.$strapi.user.id
            })
            console.log('the start of has chat 1 render ')
            this.renderChatComp({
              ...hasChat,
              chatWith: chatWith,
            })
          } else if (
            hasChat.users_permissions_user.id !== this.$strapi.user.id
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          } else if (
            hasChat.users_permissions_user.id === this.$strapi.user.id &&
            hasChat.users_permissions_users.length === 1
          ) {
            console.log('the start of has chat 2 ')
            this.renderChatComp({
              ...hasChat,
              chatWith: hasChat.users_permissions_user,
            })
          }
        } else if (this.$strapi.user.id !== val.id) {
          console.log('the start of has chat 3 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [this.$strapi.user.id],
          })
          console.log(chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        } else {
          console.log('the start of has chat 4 ')
          const chat = await this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [val.id, this.$strapi.user.id],
          })
          console.log('this is the chat now ', chat)
          this.renderChatComp({
            ...chat,
            chatWith: chat.users_permissions_user,
          })
        }
      } catch (error) {
        console.log('does not have a chat with this band error  ', error)
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
