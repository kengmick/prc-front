<template>
  <div>
    <section class="mx-auto container">
      <Title title="Internal Messages" />
    </section>
    <section v-if="chat.length > 0" class="mx-auto container">
      <!-- <pre>{{ chat }}</pre> -->
      <!-- main container for the chat box -->
      <div v-for="c in chat" :key="c.id" class="bg-white p-8">
        <!-- inner content  -->
        <div class="flex w-full">
          <!-- one child element  -->
          <div class="flex-grow min-w-[70px]">
            <img
              :src="c.bandProfile.bandProfileImg.formats.thumbnail.url"
              alt=""
              class="rounded-full h-[70px] w-[70px]"
            />
            <p class="text-center pt-1 chedder">{{ c.bandProfile.bandName }}</p>
          </div>
          <!-- two child elements -->
          <div class="flex w-full">
            <div
              class="bg-main-red p-1 h-[20px] w-[20px] rounded-full flex items-center justify-center -ml-5"
            >
              <p class="text-white text-xs p-0">{{ c.messages.length }}</p>
            </div>
            <div class="pl-8 min-h-[30px] pt-1 flex-grow w-full">
              <div>
                <!-- <p class="chedder">{{ c.from }}</p> -->
              </div>
            </div>
            <div>
              <div class="min-w-[50px]">
                <p class="text-gray text-xs">
                  {{ moment(String(chat[0].published_at)).format('MMM Do') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div>
            <Message
              v-for="message in c.messages"
              :key="message.text"
              :message="message.text"
              :messageData="message"
              :fromAvatar="fromProfileImage"
              :username="c.from"
              :userImage="userImage"
            />
          </div>
        </div>
      </div>
      <!-- message Box  -->
      <div>This is where you will create messages</div>
    </section>
    <section v-if="noMessages" class="mx-auto container">
      Would you like to start a chat with ...
    </section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      band: {},
      chat: [],
      noMessages: true,
      dataType: '',
      from: '',
      fromProfileImage: '',
      userImage: '',
    }
  },
  async fetch() {
    //  need to get user and band
    try {
      this.dataType = this.$route.query.dataType
      // gets all chats tied to logged in user
      const chat = await this.$strapi.find('chats', {
        users_permissions_users: this.$strapi.user.id,
      })
      // filter chats to find if any are tied to the band profile that they clicked on
      if (chat.length > 0) {
        const filt = chat.filter((c) => {
          return parseInt(this.$route.query.band) === c.bandProfile.id
        })
        if (filt.length > 0) {
          this.chat = filt.map((c) => {
            let from
            c.users_permissions_users.forEach((u) => {
              if (u.username !== this.$strapi.user.username) {
                from = u.username
                this.from = u.username
                this.fromProfileImage = u.profileImg.formats.thumbnail.url
              } else {
                this.userImage = u.profileImg.formats.thumbnail.url
              }
            })
            return { ...c, from }
          })
          console.log(this.chat, 'this is the mapped chat')
          this.noMessages = false
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped></style>
