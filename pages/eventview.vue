<template>
  <div class="container mx-auto my-6">
    <section v-if="event" class="container mx-auto mt-6">
      <!-- <pre>{{ event }}</pre> -->
      <div v-if="event.eventPoster">
        <div
          class="h-[500px] back"
          :style="`background-image: url(${event.eventPoster.url})`"
        ></div>
      </div>
      <!-- edit button  -->
      <section v-if="user">
        <div class="flex-grow flex items-center my-12 w-full md:w-[450px]">
          <NuxtLink
            v-if="user"
            :to="{
              path: 'eventedit',
              query: { event: event.id },
            }"
            class="border-2 border-black px-6 py-4 ml-2 w-full shadow-sm"
            ><div class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="red"
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                />
              </svg>
              <p class="pl-2 text-lg font-bold">Edit Event</p>
            </div>
          </NuxtLink>
        </div>
      </section>
      <!-- description -->
      <section>
        <h1 v-if="event" class="my-6">{{ event.title }}</h1>
        <h3 v-if="event.headlinerOne" class="text-3xl mt-4">Headliner</h3>
        <p>{{ event.headlinerOne }}</p>
        <h3 class="text-3xl mt-4">Date</h3>
        <p class="mt-4">
          {{ moment(String(event.date)).format('MMMM Do YYYY') }} @{{
            moment(event.timeStarts, 'h').format('LT')
          }}
        </p>
        <h3 class="text-3xl mt-4">Location</h3>
        <p v-if="event.venueName" class="mt-4">
          @{{ event.venueName }} - {{ event.streetAddress }} {{ event.city }},
          {{ event.state }}
        </p>
        <p v-else>
          {{ event.streetAddress }} {{ event.city }},
          {{ event.state }}
        </p>
        <a
          v-if="event.ticketLink"
          class="px-4 py-2 border-2 border-black inline-block mt-4"
          target="_blank"
          :href="event.ticketLink"
          >Tickets</a
        >
      </section>

      <h3 class="text-3xl mt-6">Description</h3>
      <div v-if="event.eventDescription">
        <div v-if="event.eventDescription.split('\n')">
          <p
            v-for="(description, index) in event.eventDescription.split('\n')"
            :key="description + index"
            class="mt-4"
          >
            {{ description }}
          </p>
        </div>
        <div v-else>
          <p
            v-for="(description, index) in event.eventDescription"
            :key="description + index"
            class="mt-4 ext-lg px-2 md:text-2xl"
          >
            {{ description }}
          </p>
        </div>
      </div>

      <section v-if="event.headlinersOne">
        <h3 class="text-3xl mt-6">Headliners</h3>
        <ul>
          <li v-if="event.headlinerOne" class="chedder text-xl mt-4">
            {{ event.headlinerOne }}
          </li>
          <li v-if="event.headlinerTwo" class="chedder text-xl">
            {{ event.headlinerTwo }}
          </li>
          <li v-if="event.headlinerThree" class="chedder text-xl">
            {{ event.headlinerThree }}
          </li>
          <li v-if="event.headlinerFour" class="chedder text-xl">
            {{ event.headlinerFour }}
          </li>
        </ul>
      </section>
    </section>
    <section v-if="event.bandsPlaying">
      <h3 v-if="event.bandsPlaying.length !== 0" class="text-3xl mt-6">
        All Bands
      </h3>
      <ul>
        <li
          v-for="(band, index) in event.bandsPlaying"
          :key="band + index"
          class="chedder mt-4"
        >
          {{ band.BandName }}
        </li>
      </ul>
    </section>
    <!-- comment box -->
    <section class="container mx-auto my-6">
      <h2 class="text-3xl">Posts</h2>

      <section class="my-10">
        <!-- profileImg.url username, image -->
        <div v-for="(post, index) in posts" :key="post + index">
          <div
            v-if="post.users_permissions_user"
            class="mb-6 flex justify-center"
          >
            <div v-if="post.users_permissions_user.profileImg" class="flex">
              <div class="w-[75px] h-[75px]">
                <img
                  class="rounded-full h-full sm:w-[200px] object-cover"
                  :src="post.users_permissions_user.profileImg.url"
                  alt=""
                />
              </div>
            </div>
            <div class="w-full px-2 sm:w-3/4 sm:px-0 ml-10">
              <h3>
                {{ post.users_permissions_user.username }}
                <span>{{ post.created_at }}</span>
              </h3>
              <p class="speech-bubble text-white w-full sm:w-3/4 p-6">
                {{ post.data }}
                <span v-if="post.image"
                  ><img
                    class="max-w-[200px] max-h-[200px]"
                    :src="post.image.url"
                    alt=""
                /></span>
              </p>
            </div>
          </div>
        </div>
        <!-- add post bod  -->
        <div class="w-full mx-auto">
          <p class="text-red-500">{{ postError }}</p>
          <div class="w-full flex justify-center items-center px-4 sm:px-0">
            <textarea
              v-model="postValue"
              class="w-full sm:w-3/4 p-4 border-[1px] border-gray-400 mx-auto focus-visible:border-black post_input"
              placeholder="type something here to share ..."
              @change="postValue = $event.target.value"
            >
            </textarea>
          </div>
          <div
            class="border-[1px] border-gray-400 w-full sm:w-3/4 mx-auto flex"
          >
            <div
              class="flex items-center justify-center p-6 border-r-[.5px] border-black cursor-pointer"
              @click="sendPost(postValue)"
            >
              <h3><span class="pr-2">💬</span> Send</h3>
            </div>
            <div
              class="flex items-center justify-center p-6 border-[.5px] border-black cursor-pointer"
              @click="popupToggle"
            >
              <img
                class="h-4 inline pr-2"
                src="~/static/imageIcon.svg"
                alt=""
              />
              <h3>Add Image</h3>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section
      v-if="popup"
      class="h-screen w-screen bg-black bg-opacity-10 fixed top-0 left-0 flex items-center justify-center"
    >
      <!-- upload form  -->
      <div
        class="w-1/4 h-2/5 bg-gray-100 shadow-sm flex justify-center items-center relative"
      >
        <!-- form goes here -->
        <FormulateInput
          type="image"
          label="Select an image to upload"
          help="Select a png, jpg or gif to upload."
          validation="mime:image/jpeg,image/png,image/gif"
          input-class="w-full sm:w-96 "
          wrapper-class="w-full sm:w-96 "
          element-class="w-full sm:w-96 "
          @change="postImage = $event.target.files[0]"
        />
        <!-- close icon -->
        <div class="absolute top-3 right-3" @click="popupToggle">
          <img class="h-6 w-6" src="~/static/close_black.svg" alt="" />
        </div>
      </div>
    </section>
    <section
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white"
    >
      <Spinner />
    </section>
  </div>
</template>

<script>
// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
//   <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
// </svg>
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
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
    }
  },
  async mounted() {
    try {
      const event = await this.$strapi.findOne(
        'events',
        this.$route.query.event
      )
      this.event = event
      if (event.users_permissions_user.id === this.$strapi.user.id) {
        console.log('the if conditions')
        this.user = true
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
  methods: {
    moment,
    popupToggle() {
      this.popup = !this.popup
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
