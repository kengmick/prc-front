<template>
  <div>
    <div v-if="tour" class="container mx-auto">
      <!-- <pre>{{ tour }}</pre> -->
      <h1 class="hidden sm:block main_red_text text-center my-6">
        {{ tour.title }}
      </h1>
      <div v-if="tour.touringPoster" class="mb-10 h-[400px]">
        <div v-if="tour.touringPoster.formats.large">
          <img
            :src="tour.touringPoster.formats.large.url"
            alt=""
            class="mx-auto object-cover h-[400px]"
          />
        </div>
        <div v-else class="max-h-[400px] object-cover">
          <img
            :src="tour.touringPoster.url"
            alt=""
            class="mx-auto object-cover h-[400px]"
          />
        </div>
      </div>
      <h2 class="hidden sm:block text-xl sm:text-2xl main_red_text mb-2">
        On Tour
      </h2>
      <h2 class="block sm:hidden text-xl sm:text-2xl main_red_text">
        {{ tour.title }}
      </h2>
      <p
        v-if="tour.dateStart && tour.dateEnd"
        class="chedder text-xl sm:text-2xl"
      >
        {{ moment(String(tour.dateStart)).format('MMM') }}
        {{ moment(String(tour.dateStart)).format('Do') }}
        <span class="chedder main_red_text mx-4">-</span>
        {{ moment(String(tour.dateEnd)).format('MMM') }}
        {{ moment(String(tour.dateEnd)).format('Do') }}
      </p>
    </div>

    <!-- events -->
    <div v-if="events && tour" class="container mx-auto">
      <h3 class="text-3xl my-6">Showz</h3>
      <div v-if="permission" class="px-2 my-6">
        <div
          class="flex justify-center sm:inline-flex items-center border-2 border-black px-4 py-2 cursor-pointer"
          @click="addEventForm"
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
          <h3 class="text-2xl pl-2 w-auto">Add Show To Tour</h3>
        </div>
      </div>
      <!-- add event form here  -->
      <section v-if="eventForm" class="w-full sm:w-3/4 sm:m-auto 2xl:w-3/6">
        <div class="w-full mt-6 mb-6">
          <FormulateForm v-model="formValues" @submit="addEvents">
            <div class="flex-col sm:flex sm:flex-row">
              <div class="w-full px-4 sm:w-1/2">
                <FormulateInput
                  name="title"
                  label="Title"
                  wrapper-class="m-auto sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />

                <!-- <FormulateInput
                  v-if="userBands"
                  type="select"
                  name="bandName"
                  label="Pick Your Band Optional?"
                  :options="userBands"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                /> -->
                <FormulateInput
                  name="date"
                  type="date"
                  label="Date of event"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="timeStarts"
                  type="time"
                  label="Time Event Begins"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                  @change="formValues.timeStarts = $event.target.value += ':00'"
                />
                <FormulateInput
                  name="venueName"
                  type="text"
                  label="Event Venue"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </div>
              <div class="w-full px-4 sm:w-1/2">
                <FormulateInput
                  name="streetName"
                  type="text"
                  label="Street Name"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="steetAddress"
                  type="number"
                  label="Street Number"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="country"
                  label="Country other than the USA"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                  @change="formValues.country = $event.target.values"
                />
                <FormulateInput
                  v-if="
                    !formValues.country &&
                    formValues.country !== 'United States'
                  "
                  name="state"
                  label="State"
                  wrapper-class="m-auto sm:w-4/5 "
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
                <FormulateInput
                  name="city"
                  label="City"
                  wrapper-class="sm:w-4/5 m-auto"
                  element-class="w-full"
                  errors-class="sm:w-4/5 m-auto"
                />
              </div>
            </div>

            <section class="px-4 mt-10 sm:m-20">
              <!-- <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
                List Bands Playing
              </h2>
              <FormulateInput
                type="group"
                name="bandsPlaying"
                :repeatable="true"
                label="Band Playing"
                add-label="+ Add bands"
                wrapper-class="w-full"
                element-class="w-full"
              >
                <div>
                  <FormulateInput
                    name="BandName"
                    label="Add band name"
                    required="true"
                    wrapper-class="w-full"
                    element-class="w-full"
                  />
                </div>
              </FormulateInput> -->
              <h2 class="text-center main_red_text text-2xl mb-10 mt-4">
                Add Event Poster
              </h2>
              <div class="flex w-full justify-center">
                <FormulateInput
                  type="image"
                  name="eventPoster"
                  label="Add Event Poster"
                  help="Select a png, jpg or gif to upload."
                  validation="mime:image/jpeg,image/png,image/gif"
                  input-class="w-full sm:w-96 "
                  wrapper-class="w-full sm:w-96 "
                  element-class="w-full sm:w-96 "
                  @change="eventPosterFile = $event.target.files[0]"
                />
              </div>
              <div class="flex w-full justify-center">
                <FormulateInput
                  name="eventDescription"
                  type="textarea"
                  label="Add a description of event"
                  input-class="w-full sm:w-96 h-72"
                  wrapper-class="w-full sm:w-96 h-72"
                  element-class="w-full sm:w-96 h-72"
                />
              </div>
            </section>
            <!-- <div>
              <FormulateInput
                type="submit"
                label="Next"
                wrapper-class="w-full mt-10 px-4 sm:mx-10"
                grouping-class="bg-black"
                element-class="w-full"
              />
            </div> -->
            <div
              class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full"
              @click="addEvents"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#08f2a8"
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
              <h3 class="text-3xl pl-2 text-center">Create Event</h3>
            </div>

            <div
              class="inline-flex items-center justify-center border-2 border-black px-4 py-2 cursor-pointer w-full mt-6"
              @click="eventForm = false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="red"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
              <h3 class="text-3xl pl-2 text-center">Cancel Event</h3>
            </div>
          </FormulateForm>
        </div>
      </section>
      <!-- event list  -->
      <section class="container mx-auto">
        <div v-if="events" class="container mx-auto">
          <section v-if="events.length > 0" class="container mx-auto">
            <div
              v-for="(event, index) in events"
              :key="event.title + index"
              class="shadow-md w-full min-h-64 my-12 mx-auto flex flex-col sm:flex-row transition-all duration-200 hover:scale-105"
            >
              <div v-if="event.eventPoster" class="w-full sm:w-1/2 h-64">
                <img
                  class="h-full w-full object-cover"
                  :src="event.eventPoster.url"
                  alt=""
                />
              </div>
              <div class="p-6">
                <p class="chedder text-xl text-center inline-block sm:block">
                  {{ moment(String(event.date)).format('MMM') }}
                </p>
                <p class="chedder text-xl text-center inline-block sm:block">
                  {{ moment(String(event.date)).format('Do') }}
                </p>
              </div>
              <div class="flex flex-col flex-grow p-6">
                <div>
                  <p v-if="event.title" class="chedder text-2xl">
                    {{ event.title }}
                  </p>
                  <p v-if="event.headlinerOne" class="text-xl font-black pb-2">
                    Featuring {{ event.headlinerOne }}
                  </p>
                  <p v-if="event.streetAddress" class="text-xl">
                    The Vic, {{ event.streetAddress }} /
                    {{ moment(String(event.date)).format('MMMM Do YYYY') }}
                    @{{ moment(event.timeStarts, 'h').format('LT') }}
                  </p>
                  <p v-if="event.city && event.state" class="text-xl">
                    {{ event.city }}, {{ event.state }}
                  </p>
                </div>
                <div class="flex-grow flex items-center mt-6 sm:mt-2">
                  <NuxtLink
                    :to="{
                      path: 'eventview',
                      query: { event: event.id },
                    }"
                    class="border-2 border-black px-4 py-2"
                    >View Event</NuxtLink
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
    <!-- post box -->
    <section class="container mx-auto">
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
      v-if="loading"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <Spinner />
    </section>
    <section
      v-if="errorMessage"
      class="h-screen w-screen fixed right-0 flex justify-center items-center top-0 bg-white z-50"
    >
      <div>
        <h2>{{ errorMessage }}</h2>
        <h3
          class="text-center text-2xl cursor-pointer"
          @click="errorMessage = null"
        >
          Close X
        </h3>
      </div>
    </section>
    <section
      v-if="popup"
      class="h-screen w-screen bg-black bg-opacity-10 fixed top-0 flex items-center justify-center"
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tour: {},
      touringPoster: '',
      events: [],
      inputVal: '',
      user: {},
      eventForm: false,
      eventsToAdd: [],
      formValues: {},
      eventPosterFile: null,
      eventPosterFinal: '',
      // post data
      popup: false,
      posts: [],
      post: '',
      postValue: false,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      errorMessage: null,
      permisson: true,
    }
  },
  async mounted() {
    // try {
    //   const bands = await this.$strapi.find('bands', {
    //     users_permissions_user: this.$strapi.user.id,
    //   })
    //   this.bands = bands
    //   const o = {}
    //   bands.forEach((b) => {
    //     o[b.bandName] = b.bandName
    //   })
    //   this.userBands = o
    // } catch (error) {
    //   this.userBands = null
    //   console.log(error)
    // }
    try {
      this.loading = true
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour
      const posts = await this.$strapi.find('posts', {
        tour: tour.id,
      })
      this.user = this.$strapi.user.id
      const id = [...this.tour.events]
      this.events = tour.events
      console.log(id, ' this is the id used to get tour events ')
      const ids = await id.map((e) => {
        return ['id', e.id]
      })
      console.log(ids, 'this is all the ids of the events ')
      // I need to find events that are tied to a tour
      // const events = await this.$strapi.find('events')
      // console.log('this is all events 520', events)
      // this.events = events
      // console.log(events, 'events')
      this.posts = posts
      this.loading = false
    } catch (error) {
      this.loading = false
      console.log(error)
    }
    try {
      if (this.user) {
        // compare userid to userpermission in front
        if (this.user === this.tour.users_permissions_user.id) {
          console.log('do something herer')
          this.permission = true
        }
      }
    } catch (error) {
      this.user = null
    }
  },
  methods: {
    moment,

    async addEvents(val) {
      if (this.eventPosterFile) {
        try {
          const formData = new FormData()
          await formData.append('files', this.eventPosterFile)
          // upload to strapi here
          const [eventPosterFinal] = await this.$strapi.create(
            'upload',
            formData
          )
          this.eventPosterFinal = eventPosterFinal
          this.formValues.eventPoster = eventPosterFinal

          const event = await this.$strapi.create('events', {
            users_permissions_user: this.$strapi.user.id,
            ...this.formValues,
          })
          await this.events.push(event)
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
          this.eventForm = false
        } catch (error) {
          this.message = 'Sorry we could not create the event'
          console.log('uploading image ', error)
        }
      } else {
        try {
          const event = await this.$strapi.create('events', {
            users_permissions_user: this.$strapi.user.id,
            ...this.formValues,
          })
          await this.$strapi.update('tours', this.tour.id, {
            events: [...this.tour.events, event],
          })
          await this.events.push(event)
          this.eventForm = false
        } catch (error) {
          console.log('adding event ', error)
        }
      }
    },
    addEventForm: function () {
      this.eventForm = true
    },
    popupToggle() {
      this.popup = !this.popup
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
