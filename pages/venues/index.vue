<template>
  <div>
    <Title title="Venues" />
    <section class="px-4">
      <Search index="venue" />
    </section>
    <section v-if="venues" class="container mx-auto">
      <div
        class="mx-6 flex flex-col gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10"
      >
        <CardsVenueCard
          v-for="venue in venues"
          :key="venue.name"
          :venue="venue"
          :isFav="favCheck('venues', venue.id)"
        />
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
      venues: [],
      errorMessage: '',
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      chatSelf: false,
      favs: null,
    }
  },
  async mounted() {
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
    try {
      const venues = await this.$strapi.find('venues')
      this.venues = venues
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
  methods: {
    favCheck(type, id) {
      const check = this.favs.filter((f) => {
        console.log('fav checkc ')
        return f.data.id === id
      })
      if (check.length > 0) {
        return true
      }
      console.log(check, ' this is check ')
    },
    async renderChatComp(chat) {
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
