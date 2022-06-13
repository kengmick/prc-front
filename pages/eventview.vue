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
    <section class="container mx-auto my-10">
      <h2 class="text-center text-2xl">Comments</h2>
      <div class="container shadow-2xl size p-10 my-10">
        <div v-if="posts">
          <div v-for="post in posts" :key="post.data">
            <p>
              <span class="main_red_text chedder"
                >{{ post.users_permissions_user.username }} ...
              </span>
              {{ post.data }}
            </p>
          </div>
          <!-- <pre>{{ classified.comments }}</pre> -->
        </div>
        <div v-else>
          <p>There are no comments on this classified add</p>
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
      event: '',
      image: '',
      posts: [],
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
  },
}
</script>

<style scoped>
.back {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
