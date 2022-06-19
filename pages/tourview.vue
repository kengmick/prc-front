<template>
  <div>
    <div v-if="tour" class="container mx-auto">
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
      <h1 class="text-5xl main_red_text my-6">Showz</h1>
      <div v-if="user">
        <div
          class="inline-flex items-center border-2 border-black px-4 py-2 cursor-pointer"
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
          <h3 class="text-3xl pl-2">Add Show To Tour</h3>
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
      <section v-if="events" class="container mx-auto">
        <div
          v-for="(event, index) in events"
          :key="event.title + index"
          class="shadow-md w-full h-64 my-12 mx-auto flex transition-all duration-200 hover:scale-105"
        >
          <div v-if="event.eventPoster" class="w-1/3 h-64">
            <img
              class="h-full w-full object-cover"
              :src="event.eventPoster.url"
              alt=""
            />
          </div>
          <div class="p-6">
            <p class="chedder text-xl text-center">
              {{ moment(String(event.date)).format('MMM') }}
            </p>
            <p class="chedder text-xl text-center">
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
              <p v-if="event.streetAddress && event.streetName" class="text-xl">
                The Vic, {{ event.streetAddress }} {{ event.streetName }} /
                {{ moment(String(event.date)).format('LT') }} -
                {{ moment(event.timeEnds, 'h').format('LT') }}
              </p>
              <p v-if="event.city && event.state" class="text-xl">
                {{ event.city }}, {{ event.state }}
              </p>
            </div>
            <div class="flex-grow flex items-center">
              <NuxtLink
                :to="{
                  path: 'eventview',
                  query: { event: event.id },
                }"
                class="border-2 border-black px-6 py-4"
                ><div class="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                    />
                  </svg>
                  <p class="pl-2">View Event</p>
                </div></NuxtLink
              >
              <NuxtLink
                v-if="user"
                :to="{
                  path: 'eventedit',
                  query: { event: event.id },
                }"
                class="border-2 border-black px-6 py-4 ml-2"
                ><div class="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                    />
                  </svg>
                  <p class="pl-2">Edit Event</p>
                </div></NuxtLink
              >
            </div>
          </div>
        </div>
      </section>
      <section v-else class="container mx-auto">
        <h3>No Showz Added</h3>
      </section>
    </div>
    <section class="container mx-auto">
      <h2>Posts</h2>
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
              </p>
            </div>
          </div>
        </div>
        <!-- add post bod  -->
        <div class="w-full mx-auto">
          <div class="w-full flex justify-center items-center">
            <textarea
              id="inputVal"
              name="inputVal"
              class="w-3/4 p-4 border-[1px] border-gray-400 mx-auto focus-visible:border-black post_input"
              placeholder="type something here to share ..."
              @change="postValue = $event.target.value"
            >
            </textarea>
          </div>
          <div class="border-[1px] border-gray-400 w-3/4 mx-auto flex">
            <div
              class="flex items-center justify-center p-6 border-r-2 border-black"
              @click="sendPost"
            >
              <h3><span class="pr-2">💬</span> Send</h3>
            </div>
            <div
              class="flex items-center justify-center p-6 border-r-2 border-black"
            >
              <img
                class="h-4 inline pr-2"
                src="~/static/imageIcon.svg"
                alt=""
              />
              <h3>Add Image {{ postValue }}</h3>
            </div>
          </div>
        </div>
      </section>
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
      posts: [],
      postValue: false,
      events: [],
      inputVal: '',
      user: {},

      eventForm: false,
      eventsToAdd: [],
      formValues: {},
      eventPosterFile: null,
      eventPosterFinal: '',
      message: '',
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
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour
      const posts = await this.$strapi.find('posts', {
        tour: tour.id,
      })
      this.user = this.$strapi.user.id
      const id = [...this.tour.events]
      const ids = await id.map((e) => {
        return ['id', e.id]
      })
      const events = await this.$strapi.find('events', ids)
      this.events = events
      console.log(events, 'events')
      this.posts = posts
    } catch (error) {
      console.log(error)
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
    async sendPost() {
      try {
        if (this.postValue) {
          await this.$strapi.create('posts', {
            tour: this.tour.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          const posts = await this.$strapi.find('posts', {
            tour: this.tour.id,
          })
          const ele = document.getElementById('inputVal')
          ele.value = ''
          this.postValue = false
          this.posts = posts
        }
      } catch (error) {
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
