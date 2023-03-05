<template>
  <div>
    <h1>This is the test page get params</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Articles focused on the beautiful art of landscape painting. test again ',
        },

        {
          hid: 'og:title',
          property: 'og:title',
          content: 'this.band.bandName',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'this.band.bandProfileImg.url',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: encodeURIComponent(`http://punkrockcompound.com/bands/101`),
        },
      ],
    }
  },
}
</script>
