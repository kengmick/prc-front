<template>
  <div class="container md:container mx-auto">
    <Title title="All Bands" />
    <!-- <section class="px-4">
      <Search index="bands" />
    </section> -->
    <section
      v-if="bands"
      class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
    >
      <PosterCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
        :user="band.users_permissions_user"
        :isFeatured="true"
        @startChat="startChatNow(band.users_permissions_user)"
        @updatedFavs="updatedFavs('bands', band.id)"
        :isFav="favCheck('bands', band.id)"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
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
      errorMessage: '',
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      favs: null,
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

    try {
      console.log('looking for bands')
      const bands = await this.$strapi.find('bands')
      console.log(bands)
      this.bands = bands
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },

  methods: {
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
    async renderChatComp(chat) {
      console.log('this is the render chat comp')
      this.chatComp = false
      if (this.chatComp === false) {
        this.chat = await chat
        this.chatComp = true
      } else {
        this.chatComp = false
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
  },
}
</script>
