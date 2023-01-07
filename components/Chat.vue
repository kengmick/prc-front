<template>
  <div
    v-if="chat"
    id="chat"
    class="w-screen h-screen bg-white fixed top-0 right-0 overflow-scroll pb-[100px]"
  >
    <div
      class="fixed top-0 h-[80px] w-full flex items-center px-4 border-b-[1px] bg-white z-50"
    >
      <div class="bg-gray-200 rounded-sm" @click="close">
        <img src="~/static/left.svg" class="h-[20px] w-[20px]" alt="" />
      </div>
      <div
        v-if="chatInfo && chatInfo.chatWith.id !== $strapi.user.id"
        class="flex-grow px-4 flex items-center"
      >
        <img
          v-if="chatInfo.chatWith.profileImg"
          class="w-[50px] h-[50px] rounded-full mr-4"
          :src="chatInfo.chatWith.profileImg.url"
        />
        <div class="flex-grow">
          <p class="chedder">{{ chatInfo.chatWith.username }}</p>
        </div>
      </div>
      <div
        v-else-if="
          chatInfo &&
          chatInfo.chatWith.id === $strapi.user.id &&
          chat.users_permissions_users.length > 1
        "
        class="flex-grow px-4 flex items-center"
      >
        <img
          v-if="chat.users_permissions_users[0].profileImg.url"
          class="w-[50px] h-[50px] rounded-full mr-4"
          :src="chat.users_permissions_users[0].profileImg.url"
        />
        <div class="flex-grow">
          <p class="chedder">{{ chat.users_permissions_users[0].username }}</p>
        </div>
      </div>
      <div v-else class="flex-grow px-4 flex items-center">
        <img
          v-if="chat.users_permissions_users[0].profileImg.url"
          class="w-[50px] h-[50px] rounded-full mr-4"
          :src="chat.users_permissions_users[0].profileImg.url"
        />
        <div class="flex-grow">
          <p class="chedder">{{ chat.users_permissions_users[0].username }}</p>
        </div>
      </div>
    </div>
    <section
      v-if="!errorMessage && chat && chatInfo"
      class="pt-[90px] pb-[90px] px-4"
    >
      <!-- display the messages  -->
      <!-- <pre>{{ chat.messages }}</pre> -->
      <div v-for="message in chat.messages" :key="message.text">
        <div v-if="chatInfo.chatWith.id !== $strapi.user.id">
          <Message
            :message="message.text"
            :messageData="message"
            :fromAvatar="chatInfo.chatWith.profileImg.url"
            :username="chatInfo.chatWith.username"
          />
        </div>
        <div v-else>
          <pre>{{ message }}</pre>
          <Message
            :message="message.text"
            :messageData="message"
            :fromAvatar="chat.users_permissions_users[0].profileImg.url"
            :username="chat.users_permissions_users[0].username"
          />
        </div>
      </div>
      <div id="view" ref="view"></div>
    </section>

    <section v-else class="pt-[90px] pb-[90px]"></section>
    <div
      class="fixed bottom-0 h-[80px] w-full border-t-[1px] px-4 flex items-center"
    >
      <div class="flex-grow w-full">
        <input
          :value="messageToSend"
          type="text"
          class="bg-gray-300 p-2 rounded-md w-full"
          @change="messageToSend = $event.target.value"
        />
      </div>
      <div
        @click="sendMessage()"
        class="flex items-center justify-center min-w-[50px]"
      >
        send
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatInfo: {
      type: Object,
      default: () => {
        return null
      },
    },
    chatWithId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      chat: false,
      errorMessage: false,
      messageToSend: '',
      msg: '',
      soc: {},
      joined: '',
    }
  },
  async fetch() {
    try {
      this.chat = await this.$strapi.findOne('chats', this.chatInfo.id)
    } catch (error) {
      this.errorMessage = 'Sorry we could not find the chat session'
    }
  },

  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'chat',
    })

    this.socket.emit('join', { room: this.chatInfo.id })

    this.socket.on('joinedRoom', (data) => {
      console.log(this.socket)
      this.joined = 'you joined '
      console.log(data, 'you joined a room')
    })

    this.socket.on('messageSent', (data) => {
      this.chat = data.c
      // this.sc()
    })
    // this.sc()
  },

  methods: {
    close() {
      this.$emit('closeChat')
    },
    // sc() {
    //   setTimeout(() => {
    //     const el = document.getElementById('view')
    //     el.scrollIntoView({ behavior: 'smooth' })
    //   }, 100)
    // },
    async sendMessage() {
      try {
        await this.$strapi.create('messages', {
          users_permissions_user: this.$strapi.user.id,
          text: this.messageToSend,
          chat: this.chatInfo.id,
        })
        this.messageToSend = ''

        const c = await this.$strapi.findOne('chats', this.chatInfo.id)
        // const el = document.getElementById('view')
        // el.scrollIntoView()

        return new Promise((resolve) => {
          this.socket.emit('sendMessage', { c }, (resp) => {
            console.log(resp, 'something happening in the socket')

            resolve()
          })
          // el.scrollIntoView()
        })
      } catch (error) {
        this.errorMessage = 'Sorry we could not find the chat session'
      }
    },
    method1() {
      /* Emit events */
      this.socket.emit(
        'method1',
        {
          hello: 'world',
        },
        (resp) => {
          /* Handle response, if any */
        }
      )
    },
  },
}
</script>
