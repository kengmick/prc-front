<template>
  <div class="container md:container mx-auto">
    <Title title="All Bands" />
    <!-- <section class="px-4">
      <Search index="bands" />
    </section> -->
    <section
      v-if="bands"
      class="m-6 flex flex-col md:flex-wrap md:flex-row md:justify-center"
    >
      <!-- <BandCard
        v-for="(band, index) in bands"
        :key="band.bandName + index"
        :band="band"
      /> -->
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
    log(val) {
      console.log('this is the event emited ', val)
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
          console.log('this renderchapcomp')
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
  },
}
</script>
