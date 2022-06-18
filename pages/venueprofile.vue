<template>
  <!-- get gallery working  -->
  <div>
    <section v-if="venue" class="container mx-auto mt-6 px-2 sm:px-0">
      <div
        v-if="venue.logo"
        class="flex flex-col sm:flex-row items-center mb-4"
      >
        <img class="h-16 pr-6" :src="venue.logo.url" alt="" />
        <h1 class="main_red_text chedder">{{ venue.name }}</h1>
      </div>
      <div v-else>
        <h1 class="main_red_text chedder text-center">{{ venue.name }}</h1>
      </div>
      <div v-if="venue.venueImg" class="max-h-[500px]">
        <img
          class="max-h-[500px] w-full object-cover"
          :src="venue.venueImg.url"
          alt=""
        />
      </div>
      <!-- gallery  -->
      <!-- media Gallery -->
      <section v-if="venue.photos" class="container mx-auto">
        <h3 class="my-6 text-3xl">Pictures</h3>
        <section
          v-if="venue.photos.length > 0"
          class="mx-6 flex max-h-[350px] flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <div v-for="(img, index) in venue.photos" :key="img.pic.url + index">
            <img
              class="h-[350px] object-cover w-full"
              :src="img.pic.url"
              alt=""
            />
          </div>
        </section>
      </section>
      <!-- description -->
      <h2 class="mt-4 text-3xl">History/Bio/Message</h2>
      <div
        v-if="venue.description && venue.description.split('\n')"
        class="mt-6"
      >
        <p
          v-for="(description, index) in venue.description.split('\n')"
          :key="description + index"
          class="mt-4 ext-lg px-2 md:text-2xl"
        >
          {{ description }}
        </p>
      </div>
      <p v-else class="text-lg px-2 md:text-2xl">{{ venue.description }}</p>
    </section>
    <section class="container mx-auto px-2 sm:px-0">
      <!-- date started , genre(if applicable ) location streetNumber zip streetName contact -->
      <h3 class="text-3xl my-4">Location</h3>
      <p
        v-if="
          venue.streetNumber && venue.streetName && venue.city && venue.state
        "
        class="text-xl"
      >
        {{ venue.streetNumber }} {{ venue.streetName }}, {{ venue.city }},
        {{ venue.state }} {{ venue.zip }}
      </p>
      <!-- <div v-if="venue.genre" class="mt-4">
        <h3 class="text-3xl mb-4">Genre</h3>
        <p class="text-xl">
          {{ venue.genre }}
        </p>
      </div> -->
      <div v-if="venue.dateOpened" class="mt-4">
        <h3 class="text-3xl mb-4">Date Started</h3>
        <p class="text-xl">
          {{ venue.dateOpened }}
        </p>
      </div>
      <div v-if="venue.contact" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">
          {{ venue.contact }}
        </p>
      </div>
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
                <p
                  v-if="event.streetAddress && event.streetName"
                  class="text-xl"
                >
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
      <div v-if="venue.altContacts" class="mt-4">
        <h3 class="text-3xl mb-4">Contacts</h3>
        <div v-for="(l, index) in venue.altContacts" :key="l + index">
          <p class="text-xl">{{ l.contact }}</p>
        </div>
      </div>
      <div v-if="venue.contact && !venue.altContacts" class="mt-4">
        <h3 class="text-3xl mb-4">Contact</h3>
        <p class="text-xl">{{ venue.contact }}</p>
      </div>
      <div v-if="venue.links" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <div v-for="(l, index) in venue.links" :key="l + index">
          <a :href="l.link" class="text-xl">{{ l.link }}</a>
        </div>
      </div>
      <div v-if="venue.link && !venue.links" class="mt-4">
        <h3 class="text-3xl mb-4">Links</h3>
        <a :href="venue.link" class="text-xl">{{ venue.link }}</a>
      </div>
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
              <img
                class="max-w-[200px]"
                :src="post.users_permissions_user.profileImg.url"
                alt=""
              />
            </div>
            <div class="w-3/4 ml-10">
              <h3>
                {{ post.users_permissions_user.username }}
                <span>{{ post.created_at }}</span>
              </h3>
              <p class="speech-bubble text-white w-3/4 p-6">
                {{ post.data }}
              </p>
            </div>
          </div>
        </div>
        <!-- add post bod  -->
        <div class="w-full mx-auto">
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
              class="flex items-center justify-center p-6 border-[.5px] border-black"
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
      venue: {},
      image: '',
      venueImages: [],
      posts: [],
      postValue: false,
      events: [],
    }
  },

  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      const id = [...this.venue.events]
      const ids = await id.map((e) => {
        return ['id', e.id]
      })
      const events = await this.$strapi.find('events', ids)
      this.events = events
      // this.image = venue.venueImg.url
      // this.venueImages = venue.venueImages
    } catch (error) {
      console.log(error)
    }
    try {
      console.log(this.$route.query.venue)
      const posts = await this.$strapi.find('posts', {
        venue: this.$route.query.venue,
      })
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
            venue: this.venue.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          const posts = await this.$strapi.find('posts', {
            venue: this.venue.id,
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
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  object-fit: cover;
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
