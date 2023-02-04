<template>
  <div v-if="classified" class="container w-full mx-auto">
    <div v-if="classified.users_permissions_user.id">
      <CardsClassifiedCard
        class="mx-auto"
        :article="classified"
        :isFav="favCheck('classifieds', classified.id)"
        @startChat="startChatNow(classified.users_permissions_user)"
        @updatedFavs="updatedFavs('classifieds', classified.id)"
      />
    </div>
    <div
      v-if="permission"
      class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white mt-4 mx-auto"
    >
      <p class="chedder mr-6" @click="deleteData(classified.id)">Delete</p>
      <NuxtLink
        :to="{ path: '/classified/edit', query: { article: classified.id } }"
      >
        <p class="chedder">edit</p></NuxtLink
      >
    </div>
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
import moment from 'moment'
export default {
  data() {
    return {
      classified: null,
      comments: [],
      // user data
      user: null,
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: false,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      permission: false,
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      chatSelf: false,
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
      this.user = this.$strapi.user.id
    } catch (error) {
      console.log('no user')
    }
    const classified = await this.$strapi.findOne(
      'classifieds',
      this.$route.query.article
    )
    this.classified = classified
    console.log(classified, 'hello')
    if (classified.users_permissions_user.id === this.$strapi.user.id) {
      this.permission = true
    }
    const posts = await this.$strapi.find('posts', {
      classifieds: classified.id,
    })
    this.posts = posts
  },
  methods: {
    moment,
    favCheck(type, id) {
      if (this.favs) {
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
    async favorite(type, data) {
      this.$emit('updatedFavs')
      if (!this.$strapi.user) {
        return (this.showModal = true)
      }
      if (this.$strapi.user) {
        try {
          const curFavs = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          if (curFavs.length > 0) {
            const isSame = curFavs.filter((f) => {
              return f.data.id === data.id && f.type === type
            })
            if (isSame) {
              this.unFollowFunc(type, data.id)
            }
            if (isSame.length === 0) {
              const fav = await this.$strapi.create('favs', {
                users_permissions_user: this.$strapi.user.id,
                data: data,
                type: type,
              })
              this.$emit('updatedFavs')
              console.log(fav, 'this is the fav')
            }
            this.$emit('updatedFavs')
          } else if (curFavs.length === 0) {
            const fav = await this.$strapi.create('favs', {
              users_permissions_user: this.$strapi.user.id,
              data: data,
              type: type,
            })
            this.$emit('updatedFavs')
            console.log(fav, 'this is the fav')
          } else {
            this.$emit('updatedFavs')
          }
          const f = await this.$strapi.find('favs', {
            users_permissions_user: this.$strapi.user.id,
          })
          this.$emit('createdFavs', f)
          this.$emit('updatedFavs')
        } catch (error) {
          console.log('there was an error in the create favs function')
        }
      }
      this.message = 'You must be logged in '
    },
    async unFollowFunc(type, id) {
      console.log('hello world')
      const curFavs = await this.$strapi.find('favs', {
        users_permissions_user: this.$strapi.user.id,
      })
      console.log(curFavs, ' cur favs ')
      this.$emit('updatedFavs')
      const filtered = curFavs.filter((f) => {
        console.log(f.data.id, ' the data id ', id)
        return f.data.id === id
      })
      console.log('============================= unfollow function " ')
      this.$emit('updatedFavs')

      if (filtered) {
        await this.$strapi.delete('favs', filtered[0].id)
        this.$emit('updatedFavs')
      }
      this.$emit('updatedFavs')
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
        console.log(val.id, 'hello')
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
        console.log(val.id, ' this is the val id ', this.$strapi.user.id)
        console.log('does not have a chat with this band error  ', error)
      }
    },
    setVal: function (val) {
      this.postValue = val
    },
    async deleteData(id) {
      const del = await this.$strapi.delete('classifieds', id)
      if (del) {
        this.$router.push('/profile')
      }
    },
    popupToggle() {
      this.popup = !this.popup
    },
    async sendPost(val) {
      console.log('sending post ')
      try {
        if (this.postValue && !this.postImage) {
          console.log('user ', this.$strapi.user)
          if (!this.$strapi.user) {
            console.log('this is the first no logged in message ')
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            classified: this.classified.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            classified: this.classified.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
        }
        // will try to create post with an image uploadd
        if (this.postValue && this.postImage) {
          // check to see if user is logged in
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // image upload
          const formData = new FormData()
          await formData.append('files', this.postImage)
          const [img] = await this.$strapi.create('upload', formData)
          this.finalPostImage = img

          await this.$strapi.create('posts', {
            // tells where to assign the post
            classified: this.classified.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          // fix the post value in the form after creating post ... it should clear out
          this.postValue = ''
          const posts = await this.$strapi.find('posts', {
            classified: this.classified.id,
          })

          this.posts = posts
        }
      } catch (error) {
        if (!this.$strapi.user) {
          this.postError = 'you must be logged in to comment '
        }
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
