<template>
  <div>
    <h1>This is nothing</h1>
  </div>
</template>

<script>
export default {
  asyncData({ params, $http }) {
    console.log('hello')
    //     const band = await $http.$get(
    //       `https://punkrockcompound-backend-lb57o.ondigitalocean.app/bands/86`
    //     )
    //     console.log(band)
    //     return { band }
    //   },
  },
}
</script>
