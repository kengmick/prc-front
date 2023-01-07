<template>
  <div v-if="venue">
    <div v-if="venue" class="container mx-auto flex justify-center mt-6">
      <CardsFullVenueCard
        :venue="venue"
        @startChat="startChatNow(venue.users_permissions_user)"
      />
    </div>
    <NuxtLink
      :to="{ path: '/venues/venueedit', query: { venue: venue.id } }"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center my-4"
    >
      Edit Venue Details
    </NuxtLink>
    <div
      v-if="permission"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center"
      @click="deleteAll(venue.id)"
    >
      Delete Venue
    </div>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl mt-4">Showz</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/events/createevent', query: { venue: venue.id } }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add Showz</h3>
          </div>
        </NuxtLink>
        <div v-if="venue.events" class="flex gap-4 overflow-y-scroll my-4">
          <div v-for="event in venue.events" :key="event.title" class="my-6">
            <CardsShowCard :event="event" />

            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white mt-4"
            >
              <p class="chedder mr-6" @click="deleteData(event.id, 'events')">
                Delete
              </p>
              <NuxtLink
                :to="{ path: '/events/edit', query: { event: event.id } }"
              >
                <p class="chedder">edit</p></NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Bio</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/bio',
            query: { venue: venue.id, action: bioAction, dataType: 'venue' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 v-if="venue.description" class="text-3xl pl-2 text-center">
              Edit Description
            </h3>
            <h3 v-else class="text-3xl pl-2 text-center">Add Description</h3>
          </div>
        </NuxtLink>
        <div v-if="venue.bio">
          <p>{{ venue.bio }}</p>
        </div>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl">Pictures</h2>
        <div
          v-if="permission"
          @click="addPhotoModal"
          class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full my-4 sm:w-3/5 md:w-1/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <h3 class="text-3xl pl-2 text-center">Add Photos</h3>
        </div>
        <div v-if="venue.photos" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="pic in venue.photos" :key="pic.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="pic.pic.url" width="300" class="object-contain" />
            </div>
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
              @click="deleteData(pic.id, 'photos')"
            >
              <p class="chedder">Delete</p>
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl my-4">Members</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/venues/team',
            query: { venue: venue.id, action: 'create' },
          }"
        >
          <div
            class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer my-4 w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add Team Member</h3>
          </div>
        </NuxtLink>
        <div v-if="venue.venueTeam" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="member in venue.venueTeam" :key="member.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="member.photo.url" height="300" width="300" />
            </div>
            <div
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
            >
              <p class="chedder">{{ member.title }} {{ member.name }}</p>
              <div v-if="permission" class="grow">
                <p
                  class="chedder text-right"
                  @click="deleteData(member.id, 'venueTeam')"
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="merch" class="chedder text-2xl">Merch</h2>
      </section>

      <section class="my-2">
        <h2 id="links" class="chedder text-2xl">Links</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/links/create',
            query: { venue: venue.id, action: 'create', dataType: 'venues' },
          }"
        >
          <div
            class="my-4 inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full sm:w-3/5 md:w-1/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            <h3 class="text-3xl pl-2 text-center">Add Links</h3>
          </div>
        </NuxtLink>
        <ul v-if="venue.links">
          <li v-for="link in venue.links" :key="link.link.id">
            <div class="flex">
              <a :href="link.link">{{ link.link }}</a>
              <div class="grow text-right">
                <span @click="deleteData(link.id, 'links')">X Delete</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section v-if="venue" class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
        <PostsPost :postType="'venues'" :postId="venue.id" />
      </section>
    </section>
    <div
      v-if="addPhotoBox"
      class="fixed top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30"
      style="z-index: 999"
    >
      <div
        class="w-full h-full bg-white flex flex-col justify-center items-center"
        style="z-index: 9999999999999999999"
      >
        <p
          class="absolute top-[20px] left-[20px] chedder"
          @click="addPhotoModal"
        >
          x
        </p>
        <h3 class="text-3xl text-center">Add A Photo</h3>
        <div class="my-6">
          <FormulateInput
            type="image"
            name="photo"
            label="Select an image to upload"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png,image/gif,image/webp"
            input-class="w-full sm:w-96 "
            wrapper-class="w-full sm:w-96 "
            element-class="w-full sm:w-96 "
            @change="photo = $event.target.files[0]"
          />
          <div
            v-if="photo"
            class="flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
            @click="addPhoto"
          >
            <h3 class="text-3xl pl-2 text-center">Add Image</h3>
          </div>
        </div>
      </div>
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
      venue: null,
      image: '',
      photo: '',
      venueImages: [],
      user: null,
      eventForm: false,
      formValues: {},
      // posts data
      posts: [],
      popup: false,
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      permission: false,
      addPhotoBox: false,
      bioAction: 'create',
      chatComp: false,
      chat: null,
      finalChat: null,
      hasChat: false,
      chatSelf: false,
    }
  },
  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      if (venue.description) {
        this.bioAction = 'edit'
      }
      if (this.$strapi.user.id === venue.users_permissions_user.id) {
        this.user = this.$strapi.user.id
        this.permission = true
      }
    } catch (error) {
      console.log(error)
    }
    // try {
    //   console.log(this.$route.query.venue)
    //   const posts = await this.$strapi.find('posts', {
    //     venue: this.$route.query.venue,
    //   })
    //   this.posts = posts
    // } catch (error) {
    //   console.log(error)
    // }
  },
  methods: {
    moment,
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
    async deleteAll(id) {
      const del = await this.$strapi.delete('venues', id)
      if (del) {
        this.$router.push('/profile')
      }
    },
    addPhotoModal() {
      this.addPhotoBox = !this.addPhotoBox
    },
    popupToggle() {
      this.popup = !this.popup
    },
    async addPhoto() {
      try {
        const formData = new FormData()
        await formData.append('files', this.photo)
        const [image] = await this.$strapi.create('upload', formData)
        this.photo = image
      } catch (error) {
        this.errorMessage =
          'Sorry we could not upload your profile image ... please try again '
        this.loading = false
      }
      const updated = await this.$strapi.update('venues', this.venue.id, {
        photos: [...this.venue.photos, { pic: this.photo }],
      })
      this.event = updated
      this.addPhotoBox = false
    },
    async deleteData(id, dataType) {
      if (
        dataType === 'photos' ||
        dataType === 'releases' ||
        dataType === 'venueTeam' ||
        dataType === 'links' ||
        dataType === 'events' ||
        dataType === 'team'
      ) {
        const updated = this.venue[dataType].filter((data) => {
          return data.id !== id
        })
        try {
          const updatedEvent = await this.$strapi.update(
            'venues',
            this.venue.id,
            {
              [dataType]: [...updated],
            }
          )
          this.venue = updatedEvent
        } catch (error) {
          console.log('could not delete the data')
        }
      }
    },
    async sendPost(val) {
      console.log('sending post ')
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            tour: this.tour.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            tour: this.tour.id,
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
            tour: this.tour.id,
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
            tour: this.tour.id,
          })

          this.posts = posts
        }
      } catch (error) {
        this.postError = 'you must be logged in to comment '
        console.log('error saving post ', error)
      }
    },
  },
}
</script>

<style scoped>
.speech-bubble {
  position: relative;
  background: #000;
  border-radius: 0.4em;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 0;
  border: 21px solid transparent;
  border-right-color: #000;
  border-left: 0;
  border-top: 0;
  margin-top: -10.5px;
  margin-left: -21px;
}
</style>
