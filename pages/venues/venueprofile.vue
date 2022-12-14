<template>
  <div>
    <div v-if="venue" class="container mx-auto flex justify-center mt-6">
      <CardsFullVenueCard :venue="venue" />
    </div>
    <section class="container mx-auto px-4">
      <section class="my-2">
        <h2 id="showz" class="chedder text-2xl">Showz</h2>
        <div
          v-if="venue.events"
          class="mx-auto flex flex-col justify-center items-center gap-10 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 my-4"
        >
          <CardsShowCard
            v-for="event in venue.events"
            :key="event.title"
            :event="event"
          />
        </div>
      </section>
      <section class="my-2">
        <h2 id="videos" class="chedder text-2xl">Videos</h2>
      </section>
      <section class="my-2">
        <h2 id="bio" class="chedder text-2xl">Bio</h2>
      </section>
      <section class="my-2">
        <h2 id="Pictures" class="chedder text-2xl">Pictures</h2>
      </section>
      <section class="my-2">
        <h2 id="members" class="chedder text-2xl">Members</h2>
      </section>
      <section class="my-2">
        <h2 id="merch" class="chedder text-2xl">Merch</h2>
      </section>

      <section class="my-2">
        <h2 id="links" class="chedder text-2xl">Links</h2>
      </section>
      <section class="my-2">
        <h2 id="chatroom" class="chedder text-2xl">Chat Room</h2>
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
      user: null,
      eventForm: false,
      formValues: {},
      // posts data
      posts: [],
      popup: false,
      post: '',
      postValue: null,
      postError: '',
      message: 'type something here to share',
      postImage: '',
      finalPostImage: '',
      loading: false,
      permission: false,
    }
  },
  async mounted() {
    try {
      const venue = await this.$strapi.findOne(
        'venues',
        this.$route.query.venue
      )
      this.venue = venue
      if (this.$strapi.user.id === venue.users_permissions_user.id) {
        this.user = this.$strapi.user.id
        this.permission = true
      }
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
