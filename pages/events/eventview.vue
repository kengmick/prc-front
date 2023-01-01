<template>
  <div v-if="event" class="container mx-auto my-6">
    <section class="container">
      <CardsShowFullCard class="mx-auto" :event="event" />
    </section>
    <NuxtLink
      :to="{ path: '/events/edit', query: { event: event.id } }"
      class="block mx-auto px-4 py-2 bg-black text-white chedder w-44 text-center my-4"
    >
      <p class="chedder">Edit Show</p>
    </NuxtLink>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showdetails" class="chedder text-2xl mt-4">Show Details</h2>
        <div class="flex flex-col gap-4">
          <div v-if="event.streetAddress" class="flex flex-col mt-2">
            <p class="chedder">Address</p>
            <p class="font-medium">{{ event.streetAddress }}</p>
            <p class="font-medium" v-if="event.city && event.state">
              {{ event.city }}, {{ event.state }}
            </p>
          </div>
          <div v-if="event.addmissionFee" class="flex flex-col gap-2 mt-2">
            <p>
              <span class="chedder">Addmission Fee:</span>
              <span v-if="event.addmissionFee === 0">Free</span>
              <span v-else class="">${{ event.addmissionFee }}</span>
            </p>
          </div>
          <div v-if="event.ageRestriction">
            <p class="chedder">
              Age Restriction: <span>{{ event.ageRestriction }}</span>
            </p>
          </div>
          <div v-if="event.alcoholPolicy">
            <p class="chedder">
              Alcohol Policy: <span>{{ event.alcoholPolicy }}</span>
            </p>
          </div>
        </div>
      </section>
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Description</h2>
        <NuxtLink
          v-if="permission"
          :to="{
            path: '/bio',
            query: { event: event.id, action: bioAction, dataType: 'event' },
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
            <h3 v-if="event.eventDescription" class="text-3xl pl-2 text-center">
              Edit Description
            </h3>
            <h3 v-else class="text-3xl pl-2 text-center">Add Description</h3>
          </div>
        </NuxtLink>
        <div>
          <p>{{ event.eventDescription }}</p>
        </div>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl mb-4">Pictures</h2>
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
        <div v-if="event.eventPhotos" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="pic in event.eventPhotos" :key="pic.id">
            <div class="h-[300px] overflow-hidden">
              <NuxtImg
                :src="pic.photo.url"
                width="300"
                class="object-contain"
              />
            </div>
            <div
              v-if="permission"
              class="w-[300px] h-[40px] px-6 mb-6 flex items-center bg-black text-white"
              @click="deleteData(pic.id, 'eventPhotos')"
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
            path: '/events/team',
            query: { event: event.id, action: 'create' },
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
        <div v-if="event.eventTeam" class="flex gap-6 overflow-x-scroll my-6">
          <div v-for="member in event.eventTeam" :key="member.id">
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
                  @click="deleteData(member.id, 'eventTeam')"
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
            query: { event: event.id, action: 'create', dataType: 'events' },
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
        <ul v-if="event.eventLinks">
          <li v-for="link in event.eventLinks" :key="link.link.id">
            <div class="flex">
              <a :href="link.link">{{ link.link }}</a>
              <div class="grow text-right">
                <span @click="deleteData(link.id, 'eventLinks')">X Delete</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
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

    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white"
    >
      <Spinner />
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      event: '',
      image: '',
      user: null,
      // post data
      popup: false,
      posts: [],
      photo: '',
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      addPhotoBox: false,
      permission: false,
      bioAction: 'create',
    }
  },
  async mounted() {
    try {
      const event = await this.$strapi.findOne(
        'events',
        this.$route.query.event
      )
      this.event = event
      this.user = this.$strapi.user.id
      if (event.users_permissions_user.id === this.$strapi.user.id) {
        console.log('the if conditions')
        this.permission = true
      }
      if (event.eventDescription) {
        this.bioAction = 'edit'
      }
      const posts = await this.$strapi.find('posts', {
        event: event.id,
      })
      this.posts = posts
      this.image = event.eventPoster.url
    } catch (error) {
      console.log(error)
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
    moment,
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
      const updated = await this.$strapi.update('events', this.event.id, {
        eventPhotos: [...this.event.eventPhotos, { photo: this.photo }],
      })
      this.event = updated
      this.addPhotoBox = false
    },
    async deleteData(id, dataType) {
      if (
        dataType === 'eventPhotos' ||
        dataType === 'releases' ||
        dataType === 'eventTeam' ||
        dataType === 'eventLinks' ||
        dataType === 'events' ||
        dataType === 'team' ||
        dataType === 'distroLinks'
      ) {
        const updated = this.event[dataType].filter((data) => {
          return data.id !== id
        })
        try {
          const updatedEvent = await this.$strapi.update(
            'events',
            this.event.id,
            {
              [dataType]: [...updated],
            }
          )
          this.event = updatedEvent
        } catch (error) {
          console.log('could not delete the data')
        }
      }
    },
    setVal: function (val) {
      this.postValue = val
    },
    async sendPost(val) {
      this.loading = true
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            event: this.event.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            event: this.event.id,
          })
          // clears the post value box
          this.postValue = null
          this.loading = false
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
            event: this.event.id,
            // sets the post message
            data: this.postValue,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          // fix the post value in the form after creating post ... it should clear out
          this.postValue = ''
          this.postImage = null
          const posts = await this.$strapi.find('posts', {
            event: this.event.id,
          })

          this.posts = posts
          this.postValue = null
          this.loading = false
        }
        if (!this.postValue && this.postImage) {
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
            event: this.event.id,
            // sets the post image
            image: this.finalPostImage,
            // Ties post to a user
            users_permissions_user: this.$strapi.user.id,
          })
          // fix the post value in the form after creating post ... it should clear out
          this.postValue = null
          const posts = await this.$strapi.find('posts', {
            event: this.event.id,
          })

          this.posts = posts
          this.postImage = null
          this.loading = false
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
.back {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

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
