<template>
  <div>
    <section v-if="event">
      <section v-if="event && event.eventPoster" class="container mx-auto mt-6">
        <img :src="image" alt="" class="mx-auto h-[400px] object-cover" />
        <section>
          <h2 class="mt-4">Date</h2>
          <p class="text-xl">
            {{ moment(String(event.date)).format('MMMM Do YYYY') }} @
            {{ moment(event.timeStart).format('LT') }}
          </p>

          <a
            v-if="event.ticketLink"
            class="px-4 py-2 border-2 border-black inline-block mt-4"
            target="_blank"
            :href="event.ticketLink"
            >Tickets</a
          >
        </section>
        <h2 class="mt-4">Location</h2>
        <p class="mt-4 ext-lg px-2 md:text-2xl">{{ event.venueName }}</p>
        <h2 class="mt-4">Description</h2>
        <div v-if="event.eventDescription" class="mt-6">
          <div v-if="event.eventDescription.split('\n').length > 1">
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
        </div>

        <div v-if="event.bandsPlaying">
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
      event: null,
      image: '',
      post: '',
      postValue: false,
    }
  },
  async mounted() {
    const tour = await this.$strapi.findOne('tours', this.$route.query.tour)
    this.tour = tour
    const [event] = tour.events.filter((event) => {
      return event.id === parseInt(this.$route.query.event)
    })

    this.event = event
    this.image = event.eventPoster.url

    const posts = await this.$strapi.find('posts', {
      event: this.event.id,
    })
    this.posts = posts
  },
  methods: {
    moment,
    setVal: function (val) {
      console.log(val, 'val')
      this.postValue = val
    },
    async sendPost(val) {
      this.loading = true
      console.log(this.loading)
      try {
        if (this.postValue && !this.postImage) {
          if (!this.$strapi.user) {
            this.postError = 'you must be logged in to comment '
            return this.postError
          }
          // creats post if users is logged in and does not upload an image
          await this.$strapi.create('posts', {
            record_label: this.distro.id,
            data: this.postValue,
            users_permissions_user: this.$strapi.user.id,
          })
          // gets all the posts after creating new post above
          const posts = await this.$strapi.find('posts', {
            record_label: this.distro.id,
          })
          // clears the post value box
          this.postValue = ''
          this.posts = posts
          this.loading = false
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
            record_label: this.distro.id,
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
            record_label: this.distro.id,
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
