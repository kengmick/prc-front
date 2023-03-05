<template>
  <div>
    <h1>This is the test page {{ slug }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    try {
      const slug = await params.id // When calling /abc the slug will be "abc"
      return { slug }
    } catch (error) {
      error({ statusCode: 404, message: error.message })
    }
  },
}
</script>
