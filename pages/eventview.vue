<template>
  <div class="container mx-auto my-6">
    <section v-if="event" class="container mx-auto mt-6">
      <div v-if="event.eventPoster">
        <div
          class="h-[500px] back"
          :style="`background-image: url(${image})`"
        ></div>
      </div>
      <!-- description -->
      <section>
        <h1 v-if="event">{{ event.title }}</h1>
        <h2 class="mt-4">Date</h2>
        <p class="text-xl">
          {{ moment(String(event.date)).format('MMMM Do YYYY') }} @{{
            moment(event.timeStarts, 'h').format('LT')
          }}
        </p>
        <h2 class="mt-4">Location</h2>
        <p class="text-xl">
          @{{ event.venueName }} - {{ event.streetName }}
          {{ event.streetNumber }} {{ event.city }}, {{ event.state }}
        </p>
        <a
          v-if="event.ticketLink"
          class="px-4 py-2 border-2 border-black inline-block mt-4"
          target="_blank"
          :href="event.ticketLink"
          >Tickets</a
        >
      </section>

      <h2 class="mt-4">Description</h2>
      <div v-if="event.eventDescription.split('\n')" class="mt-6">
        <p
          v-for="(description, index) in event.eventDescription.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">
        {{ event.eventDescription }}
      </p>
      <section v-if="event.headlinersOne">
        <h2 class="mt-4">Headliners</h2>
        <ul>
          <li v-if="event.headlinerOne" class="chedder text-xl">
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
      <h2 class="mt-4">All Bands</h2>
      <ul>
        <li
          v-for="(band, index) in event.bandsPlaying"
          :key="band + index"
          class="chedder text-xl"
        >
          {{ band.BandName }}
        </li>
      </ul>
    </section>
    <!-- comment box -->
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
      event: '',
      image: '',
      posts: [],
      postValue: false,
    }
  },
  async mounted() {
    try {
      const event = await this.$strapi.findOne(
        'events',
        this.$route.query.event
      )
      this.event = event
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
    setVal: function (val) {
      this.postValue = val
    },
    async sendPost(val) {
      try {
        if (this.postValue) {
          await this.$strapi.create('posts', {
            event: this.event.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          const posts = await this.$strapi.find('posts', {
            event: this.event.id,
          })
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
