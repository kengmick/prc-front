<template>
  <div>
    <section v-if="distro" class="container mx-auto my-6">
      <CardsDistroFullCard
        :isFav="favCheck('record-labels', distro.id)"
        class="mx-auto"
        :distro="distro"
        @updatedFavs="updatedFavs('record-labels', distro.id)"
        @startChat="startChatNow(distro.users_permissions_user)"
      />
    </section>
    <NuxtLink
      :to="{ path: '/distros/edit', query: { distro: distro.id } }"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center my-4"
    >
      Edit Distro/Label Details
    </NuxtLink>
    <div
      v-if="permission"
      @click="deleteAll(distro.id)"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center"
    >
      Delete Distro/Label
    </div>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl my-4">Showz</h2>
        <NuxtLink
          v-if="permission"
          :to="{ path: '/events/createevent', query: { distro: distro.id } }"
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
        <div v-if="events" class="flex gap-4 overflow-y-scroll my-4">
          <div v-for="event in distro.events" :key="event.title" class="my-6">
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
        <h2 id="bio" class="chedder text-2xl">Biography</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/bio',
            query: { distro: distro.id, action: bioAction, dataType: 'distro' },
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
            <h3 v-if="distro.bio" class="text-3xl pl-2 text-center">
              Edit Bio
            </h3>
            <h3 v-else class="text-3xl pl-2 text-center">Add Bio</h3>
          </div>
        </NuxtLink>
        <div v-if="distro.bio">
          <p>{{ distro.bio }}</p>
        </div>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl my-4">Pictures</h2>
        <div
          v-if="permission"
          @click="addPhotoModal"
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
          <h3 class="text-3xl pl-2 text-center">Add Photos</h3>
        </div>
        <div
          v-if="distro.distroImages"
          class="flex gap-6 overflow-x-scroll my-6"
        >
          <div v-for="pic in distro.distroImages" :key="pic.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="pic.url" width="300" class="object-contain" />
            </div>
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
              @click="deleteData(pic.id, 'distroImages')"
            >
              <p class="chedder">Delete</p>
            </div>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl">Members</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/distros/team',
            query: { distro: distro.id, action: 'create' },
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
            <h3 v-if="distro.bio" class="text-3xl pl-2 text-center">
              Add Team Member
            </h3>
            <h3 v-else class="text-3xl pl-2 text-center">Add Team Member</h3>
          </div>
        </NuxtLink>
        <div v-if="distro.team" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="member in distro.team" :key="member.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg :src="member.photo.url" height="300" width="300" />
            </div>
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
              @click="deleteData(member.id, 'team')"
            >
              <p class="chedder">Delete</p>
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
            query: { distro: distro.id, action: 'create', dataType: 'distro' },
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
        <ul v-if="distro.distroLinks">
          <li v-for="link in distro.distroLinks" :key="link.id">
            <div class="flex">
              <a :href="link.link">{{ link.link }}</a>
              <div class="grow text-right">
                <span @click="deleteData(link.id, 'distroLinks')"
                  >X Delete</span
                >
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section v-if="distro" class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
        <PostsPost :postType="'record_labels'" :postId="distro.id" />
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
            v-model="imageAdd"
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
export default {
  data() {
    return {
      distro: false,
      // image data
      image: '',
      distroImages: [],
      // user logged in data
      user: null,
      // event data
      eventPosterFile: '',
      eventForm: false,
      events: [],
      // form vals
      formValues: {},
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      permission: false,
      addPhotoBox: false,
      photo: '',
      bioAction: 'create',
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
      if (f) {
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
    }
    try {
      const distro = await this.$strapi.findOne(
        'record-labels',
        this.$route.query.distro
      )
      this.distro = distro
      this.user = distro.id
      this.image = distro.distroImage.url
      this.distroImages = distro.distroImages
      this.user = this.$strapi.user.id
      this.events = this.distro.events
    } catch (error) {
      console.log(error)
    }

    try {
      if (this.$strapi.user) {
        this.user = this.$strapi.user.id
      }
      if (this.user) {
        // compare userid to userpermission in front
        if (this.user === this.distro.users_permissions_user.id) {
          console.log(this.user, 'this is the user')
          this.permission = true
        }
      }
    } catch (error) {
      this.user = null
    }
    if (this.distro.bio) {
      this.bioAction = 'edit'
    }
  },
  created() {
    const backButtonRouteGuard = this.$router.beforeEach((to, from, next) => {
      if (this.addPhotoBox === true) {
        next(false)
        this.addPhotoBox = false
      } else {
        next(true)
      }
    })

    this.$once('hook:destroyed', () => {
      this.addPhotoBox = false
      backButtonRouteGuard()
    })
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
      this.chatComp = false
      if (this.chatComp === false) {
        this.chat = await chat
        this.chatComp = true
      } else {
        this.chatComp = false
      }
    },

    async startChatNow(val) {
      console.log(
        'this is the start chat now function =============================================================================',
        val,
        val.id
      )
      try {
        // find all chat that you have
        const [hasChat] = await this.$strapi.find('chats', {
          users_permissions_user: val.id,
        })

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
      const del = await this.$strapi.delete('record-labels', id)
      if (del) {
        this.$router.push('/profile')
      }
    },
    addPhotoModal() {
      this.addPhotoBox = !this.addPhotoBox
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
      const updated = await this.$strapi.update(
        'record-labels',
        this.distro.id,
        {
          distroImages: [...this.distro.distroImages, this.photo],
        }
      )
      this.distro = updated
      this.addPhotoBox = false
    },
    async deleteData(id, dataType) {
      if (
        dataType === 'distroImages' ||
        dataType === 'releases' ||
        dataType === 'members' ||
        dataType === 'links' ||
        dataType === 'events' ||
        dataType === 'team' ||
        dataType === 'distroLinks'
      ) {
        const updated = this.distro[dataType].filter((data) => {
          return data.id !== id
        })
        console.log(updated, 'this is the updated and this is the id ', id)
        try {
          const updatedDistro = await this.$strapi.update(
            'record-labels',
            this.distro.id,
            {
              [dataType]: [...updated],
            }
          )
          this.distro = updatedDistro
          console.log(updatedDistro, ' this is the updated ')
        } catch (error) {
          console.log('could not delete the data')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
