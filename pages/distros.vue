<template>
  <div class="container mx-auto">
    <h1 class="text-center text-3xl main_red_text mt-10">Distros/Labels</h1>
    <section
      v-if="distros"
      class="mx-6 my-10 flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10"
    >
      <DistroCard
        v-for="(distro, index) in distros"
        :key="distro.name + index"
        :distro="distro"
      />
    </section>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      distros: [],
      errorMessage: '',
    }
  },
  async mounted() {
    try {
      const distros = await this.$strapi.find('record-labels')
      this.distros = distros
    } catch (error) {
      this.errorMessage = 'Sorry ... there was a problem'
    }
  },
}
</script>
