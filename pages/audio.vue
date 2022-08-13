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
// to get the duration in mm:ss
const audio = document.querySelector('audio')
const durationContainer = document.getElementById('duration')

const calculateTime = (secs) => {
  // calculates the minutes
  const minutes = Math.floor(secs / 60)
  // this calculates the remaining seconds using the modulus operator
  const seconds = Math.floor(secs % 60)
  // add a 0 if seconds are less than 10 seconds example 3 = :03
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${minutes}:${returnedSeconds}`
}

const displayDuration = () => {
  durationContainer.textContent = calculateTime(audio.duration)
}

if (audio.readyState > 0) {
  displayDuration()
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration()
  })
}
</script>

<style lang="scss" scoped></style>
