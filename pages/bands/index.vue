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
    log(val) {
      console.log('this is the event emited ', val)
    },
    async startChatNow(val) {
      try {
        const hasChat = await this.$strapi.find('chats', {
          users_permissions_users: this.$strapi.user.id,
        })

        if (hasChat) {
          hasChat.forEach((c) => {
            const has = c.users_permissions_users.filter((user) => {
              return val.id === user.id
            })
            if (has.length > 0) {
              this.hasChat = c
            }
          })
        }
        if (this.hasChat) {
          console.log('has chat condition ')
          const c = []
          // push the chat to the array so we can map over it
          c.push(this.hasChat)
          // map over the one item array to massage the data with the chatWith user
          const mappedChats = c.map((c) => {
            c.users_permissions_users.forEach((u) => {
              if (u.id !== this.$strapi.user.id) {
                this.chatWith = u
              } else if (u.id === this.$strapi.user.id) {
                console.log('this will set the chat with yourself ')
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
          console.log(
            this.$strapi.user.id,
            val.id,
            'this will create chat soon '
          )
          const chat = await this.$strapi.create('chats', {
            users_permissions_users: [this.$strapi.user.id, val.id],
          })
          console.log('this is the chat just created ', chat)
          // after creating a chat we now get all chats and filter with the user's ids to map overthem
          const chats = await this.$strapi.find('chats', {
            users_permissions_users: this.$strapi.user.id,
          })
          console.log('find the chats by this user ')

          // map over to create our data type to pass into the chat component
          const mappedChats = chats.map((c) => {
            console.log(
              c.users_permissions_users,
              'this is the users for the chat '
            )
            c.users_permissions_users.forEach((u) => {
              if (u.id !== this.$strapi.user.id) {
                console.log('this will set chat with someone else')
                this.chatWith = u
              } else if (u.id === this.$strapi.user.id) {
                console.log('this will set the chat with yourself ')
                this.chatWith = u
              }
            })
            return { ...c, chatWith: this.chatWith }
          })
          this.chats = mappedChats
          console.log('this is the new chats ', this.chats)
          // we get just the one chat that the user just attempted to create
          const myChat = mappedChats.filter((c) => {
            return c.id === chat.id
          })
          console.log(myChat[0], 'this is the chat that gets passed to render')
          this.renderChatComp(myChat[0])
        }
      } catch (error) {
        console.log('does not have a chat with this band error  ')
      }
    },
  },
}
</script>
