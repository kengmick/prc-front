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
    }
  },
  async mounted() {
    const e = document.getElementById('a')
    console.log(e, 'there whould ')
    try {
      const bands = await this.$strapi.find('bands')
      this.bands = bands
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
  methods: {
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
          this.renderChatComp({
            ...hasChat,
            chatWith: hasChat.users_permissions_user,
          })
        } else {
          const chat = this.$strapi.create('chats', {
            users_permissions_user: val.id,
            users_permissions_users: [this.$strapi.user.id, val.id],
          })
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
