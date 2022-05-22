<template>
  <div>
    <div v-for="(band, index) in bands" :key="band + index">
      <h1>{{ band.bandName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bands: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.back {
  background-position: center;
  background-size: cover;
  object-fit: fill;
  min-width: 300px;
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
@media (min-width: 1000px) {
  .back {
    min-width: 500px;
  }
} ;
</style>
