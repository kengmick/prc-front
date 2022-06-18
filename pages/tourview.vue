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
    <div v-if="events" class="container mx-auto">
      <h1 class="text-5xl main_red_text my-6">Showz</h1>
      <section v-if="events.length > 0" class="container mx-auto">
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
                class="border-2 border-black px-4 py-2"
                >View Event</NuxtLink
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
              <h3>Add Image</h3>
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
    }
  },
  async mounted() {
    try {
      const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
      this.tour = tour
      const posts = await this.$strapi.find('posts', {
        tour: tour.id,
      })
      const id = [...this.tour.events]
      const ids = await id.map((e) => {
        return ['id', e.id]
      })
      console.log(ids.length)
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
    setVal: function (val) {
      this.postValue = val
    },
    async sendPost(val) {
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
