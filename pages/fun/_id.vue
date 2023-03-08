<template>
  <div>
    <h1>hello</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $strapi }) {
    const data = await $strapi.findOne('bands', params.id)
    return {
      data,
    }
  },

  head({ $seo }) {
    return $seo({
      openGraph: {
        image: {
          url: this.data.bandProfileImg.url,
          width: '200',
          height: '200',
        },
        description: this.data.bandName,
        title: `${this.data.bandName} `,
        url: `https://punkrockcompound.com/fun/${this.data.id}`,
      },
    })
  },
}
</script>
