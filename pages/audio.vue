<template>
  <div>
    <Audio
      bandName="Discord"
      bandImage="https://punkrockcompund.s3.amazonaws.com/sam_moghadam_khamseh_Nhg_En6pf9l_A_unsplash_acd6f92184.jpg"
      :songs="songs"
      albumName="Cool Album"
    />
    <!-- bandName: String,
    songs: Array,
    bandImage: String,
    albumName: String, -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: ['songOne', 'songTwo'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
