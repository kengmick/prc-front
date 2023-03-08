<template>
  <div>
    {{ band }}
  </div>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const band = await $http.$get(
      `https://punkrockcompound-backend-lb57o.ondigitalocean.app/bands${params.id}`
    )
    return { band }
  },
}
</script>
