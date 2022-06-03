<template>
  <section>
    <h2>{{ video.title }}</h2>
    <span class="text-2xl"> by {{ video.band.bandName }} uploaded </span>
    <p class="text-2xl">
      {{ moment(String(video.created_at)).format('MMM Do') }}
    </p>
    <video controls>
      <source :src="video.videoFile.url" />
      Your browser does not support the video tag.
    </video>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    video: {
      type: Object,
      default() {
        return {}
      },
    },
    userProfile: {
      type: Boolean,
      default() {
        return false
      },
    },
    isFeatured: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  methods: {
    moment,
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  height: 400px;
}
.featuredBackground {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  height: 700px;
}
.outline-button {
  padding: 0.5em 1em;
  border: 1px solid white;
  border-radius: 5px;
}
</style>
